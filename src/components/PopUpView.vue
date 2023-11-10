<template>
  <div class="modal" id="popUpViewModal">
    <div class="modal__wrapper"
    @keydown.esc="close()"
    @keydown.tab.exact="(event) => overviewTab(event)">
      <div class="modal__container" role="dialog">
      <header class="modal__header">
            <div>
              <h2 class="text">{{ link.text }}</h2>
              <p v-if="link.text !== 'Overview'" class="instructional-text">Select an item below for further guidance</p>
            </div>
            <button id="closeModal" class="hide" @click="close()" @keydown.shift.tab.capture.prevent.stop>
              <svg-icon class="icon close spin" icon="close" color1="#000" color2="#fff" color3="#000"></svg-icon>
            </button>
      </header>
      <div class="modal__body">
        <div  v-if="link.links.length == 1 && link.links[0].isOverviewLink"
              class="is-overview" v-html="overviewText"
              :style="{ backgroundColor: backgroundColor }">

        </div>
        <ul v-else>
          <li v-for="(l, index) in link.links" :key="index"
              class="nonAccordionLi gsap-slide" :class="{'has-accordion': isAccordion(l), 'open': isAccordionOpen(l.id), 'last-link': index == (link.links.length - 1)}"
              @mouseenter="enterLI"
              @mouseleave="leaveLI"
              @keydown.tab.exact="(event) => checkIfLastLink(event, index == (link.links.length - 1), l)">

            <span class="linkText" v-if="!isAccordion(l)" v-html="l.text" :style="{ backgroundColor: backgroundColor }"></span>

            <div v-if="isAccordion(l)">
              <label class="linkText"
                      tabindex="0"
                      @keyup.enter="toggleAccordion(l.id)"
                      @keyup.space="toggleAccordion(l.id)"
                      :style="{ backgroundColor: backgroundColor }">
                <span v-html="l.text"></span>
                <input type="checkbox" :value="l.id" v-model="openAccordions" class="hide" >
              </label>

              <transition-group tag="ul"
                                :css="false"
                                @enter="slideIn"
                                @leave="slideOut"
                                style="background-color: transparent;"
                                class="accordion"
                                :class="{'open': isAccordionOpen(l.id)}">

                    <li v-show="isAccordionOpen(l.id)"
                        class="accordionLi"
                        :class="{'last-link': index == (link.links.length - 1) && accIndex == (l.links.length - 1)}"
                        v-for="(accLink, accIndex) in l.links"
                        :key="accIndex"
                        :data-index="accIndex"
                        @mouseenter="enterAccordionLI"
                        @mouseleave="leaveLI"
                        @keydown.tab.exact="(event) => checkIfLastLink(event, index == (link.links.length - 1) && accIndex == (l.links.length - 1), accLink)"
                >
                      <span class="linkText" :style="{ backgroundColor: lighten() }" v-html="accLink.text"></span>
                    </li>

              </transition-group>
            </div>
          </li>
        </ul>
      </div>
      </div>
    </div>
    <transition name="fade">
      <div
        class="screen-mask"
        @click="close()"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore, mapState } from "vuex";
import { key } from "@/store/store";
import Link from "@/models/Link";
import { gsap } from "gsap";
import SvgIcon from "./SvgIcon.vue";

export default defineComponent({
  name: "PopUpView",
  emits: ["close"],
  components: {
    SvgIcon
  },
  props: {
    link: {
      type: Link,
      default: new Link()
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    }
  },
  data () {
    return {
      store: useStore(key),
      animsHaveRun: false,
      openAccordions: new Array<string>(),
      backToClose: false,
      overviewText: ""
    };
  },
  computed: {
    ...mapState([
      "sessionConfig"
    ])

  },
  async mounted () {
    this.playOpeningAnims();

    const closeBtn = document.getElementById("closeModal");
    closeBtn?.focus();

    if (this.link.links.length === 1 && this.link.links[0].isOverviewLink) {
      const content = this.link.links[0].text;

      const div = document.createElement("div");
      div.innerHTML = content;

      const anchors = div.getElementsByTagName("a");
      if (anchors && anchors.length > 0) {
        const lastAnchor = anchors[(anchors.length - 1)];
        lastAnchor.classList.add("last-link");
      }

      this.overviewText = div.innerHTML;
    }
  },
  // GSAP animation won't run on load in the mounted event so have had to put it in updated but add a flag to stop it repeating
  async updated () {
    this.playOpeningAnims();
  },
  methods: {
    slideIn (el: any, done: any) {
      gsap.set(el, {
        opacity: 0,
        height: 0
      });
      gsap.to(el, {
        opacity: 1,
        height: "auto",
        duration: 0.8,
        delay: el.dataset.index * 0.25,
        onComplete: done
      });
    },
    slideOut (el: any, done: any) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        duration: 0.8,
        delay: el.dataset.index * 0.25,
        onComplete: done
      });
    },
    isAccordionOpen (accordionId: string) {
      const found = this.openAccordions.find((x:string) => x === accordionId);
      if (found) {
        return true;
      }

      return false;
    },
    overviewTab (event: KeyboardEvent) {
      if (event.type.toLowerCase() === "keydown" && event.key.toLowerCase() === "tab" && !event.altKey && !event.shiftKey && !event.ctrlKey) {
        if (event.target) {
          const target = event.target as HTMLAnchorElement;
          if (target.classList.contains("last-link") || this.link.links.length <= 1) {
            event.preventDefault(); // you must stop the event, otherwise the focus will move beyond the close button
            event.stopPropagation();
            const closeBtn = document.getElementById("closeModal");
            closeBtn?.focus();
          }
        }
      }
    },
    checkIfLastLink (event: Event, isLastLinkInList: boolean, link: Link) {
      // if this is the last link in the list of links in a parent list, or the list of links in a child accordion
      if (isLastLinkInList) {
        // if the link id is in the open accordion collection, don't skip to closeModal, let
        // the tab action go through the list of child accordion items
        const index = this.openAccordions.indexOf(link.id, 0);
        if (index === -1 && link.isOverviewLink === false) { // if this link is not an open accordion, skip to closeModal
          event.preventDefault(); // you must stop the event, otherwise the focus will move beyond the close button
          event.stopPropagation();
          const closeBtn = document.getElementById("closeModal");
          closeBtn?.focus();
        }
      }
    },
    isAccordion (l: Link) {
      return l.links.length > 0;
    },
    lighten () {
      return this.newShade(this.backgroundColor, 30);
    },
    toggleAccordion (accordionId: string) {
      const index = this.openAccordions.indexOf(accordionId, 0);
      if (index > -1) {
        this.openAccordions.splice(index, 1);
      } else {
        this.openAccordions.push(accordionId);
      }
    },
    close () {
      this.$emit("close");
    },
    enterLI (e: Event) {
      // gsap.to("li:not(.accordion>li)", { opacity: 0.6, duration: 0.5 });
      gsap.to(".nonAccordionLi", { opacity: 0.7, duration: 0.2 });
      gsap.to(e.target, { opacity: 1, duration: 0.2 });
    },
    enterAccordionLI (e: Event) {
      gsap.to(".accordionLi", { opacity: 0.7, duration: 0.2 });
      gsap.to(e.target, { opacity: 1, duration: 0.2 });
    },
    leaveLI (e: Event) {
      // gsap.to(".gsapSlide", { opacity: 1, duration: 0.5 });
      gsap.to("li", { opacity: 1, duration: 0.2 });
    },
    playOpeningAnims () {
      if (this.animsHaveRun === false) {
        const tl = gsap.timeline({ paused: true });

        const modalHeaderTL = gsap.timeline();
        modalHeaderTL.set(".modal__header", { opacity: 0 });
        modalHeaderTL.to(".modal__header", { opacity: 1, ease: "power2.out", duration: 0.5 });
        tl.add(modalHeaderTL);

        const arr = document.querySelectorAll(".gsap-slide");

        tl.from(arr, {
          opacity: "0",
          padding: "0",
          duration: 0.8,
          stagger: 0.1
        });
        tl.play();
        this.animsHaveRun = true;
      }
    },
    newShade (hexColor: string, magnitude: number) {
      hexColor = hexColor.replace("#", "");
      if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
      } else {
        return hexColor;
      }
    }

  }
});
</script>
<style lang="scss">

.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
}

.modal__wrapper {
  // display: table-cell;
  // vertical-align: middle;
  // position: fixed;
  z-index: 9999;
  top: 5em;
  overflow: hidden;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center; /*centers items on the line (the x-axis by default)*/
  align-items: center; /*centers items on the cross-axis (y by default)*/

  height:100%;
}

.modal__container {
  width: 70%;
  max-width: 96%;
  margin: 0px auto;
  background: transparent;
  overflow-x: auto;


  //&.small {
    //width: 25%;
    //height: 90%;
  //}

  //&.large {
    //width: 96vw;
    //height: 96vh;
  //}
  height:100%;
}

.modal__header {
  position: relative;
  padding: 15px;
  margin-bottom: 0.3em;
  display: flex;
  color: #fff;
  background-color:#000;
  font-weight: 600;

  justify-content: space-between;
  display: flex;
  flex-wrap: row nowrap;
  justify-content: space-between;
  align-items: center;

  div {
    display: block;
  }

  p, h2 {
    text-align: left;
    margin: 0;
    padding: 0;
  }

  h2 {
    font-size: 1.2em;
    margin-bottom: 8px;
  }

   p {
    font-size: 1em;
   }

}

.modal__body {
  position: relative;
  padding: 0;
  background-color: transparent;
  list-style: none;
  margin-top: 0.3em;
  text-align: left;
  max-height: 60%;
  overflow-y: auto;

  ul {
    padding: 16px;
    margin: 0;
  }

  li {
    margin-bottom: 0.2em;
    text-align: left;
    font-size: 1em;
    position: relative;
    span {
      opacity: 1;
    }
  }
}

.screen-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
  opacity: 0.5;
}

.linkText {
  display: block;
  padding: 0.8em;
  text-decoration:underline;
}

li.has-accordion {

  ul {
    padding: 0;
    margin: 0;
    margin-top: 0.2em;
    margin-left: 2.5em;
    overflow: hidden;

    &.open {
    }
    li {
      margin-bottom: 0.2em;
    }
  }
  &>div>label {
    cursor: pointer;
  }
  &>div>label::after {
      content: '\276F';
      transform: rotate(90deg);
      font-size: 1.5vw;
      margin-top: -0.4vw;
      display: block;
      float: right;
      transition: transform 0.5s;
  }
  &.open {
    &>div>label::after {
      transform: rotate(270deg);
    }
  }
}

label>input {
  display: none;
}

.v-enter-active,
.v-leave-active {
  transition: max-height opacity 0.5s ease-in;
}

.v-enter-from,
.v-leave-to {
  max-height: 500px;
  opacity: 0;
}

#closeModal {
  outline:none;
  &:focus-visible {

    svg {
      outline: $keyboard-focus-width $keyboard-focus-style $keyboard-focus-color-inverted;
    }
  }

  svg {
    width: 2.5vw;

  }
}

.is-overview {
  font-size: 1em;
  color: $txt-color;
  padding: 1em;
  line-height: 1.4em;

  a {
    text-decoration: underline;
  }
}
</style>
