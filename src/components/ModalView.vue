<template>
  <div class="modal">
    <div class="modal__wrapper">
      <div
        :class="['modal__container', modalSize]"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal__header" id="modalTitle">
          <slot name="header"> </slot>
         <button id="closeModal" class="hide" @click="close()" @keydown.shift.tab.capture.prevent.stop>
              <svg-icon class="icon close spin" icon="close" color1="#000" color2="#fff" color3="#000"></svg-icon>
            </button>
        </header>

        <div class="modal__body" id="modalDescription">
          <slot name="body"> </slot>
        </div>
        <div class="modal__footer">
          <slot name="footer">

          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from "./SvgIcon.vue";
export default {
  name: "ModalView",
  emits: ["close"],
  components: {
    SvgIcon
  },
  props: {
    modalSize: {
      type: String,
      default: "large"
    }
  },
  methods: {
    close () {
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
  // top: 2%;
}

.modal__container {
  width: 350px;
  max-width: 96%;
  margin: 0px auto;
  background: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  text-align: left;
  &.small {
    width: 25%;
    height: 90%;
  }

  &.medium {
    width: 50%;
    height: 90%;
  }

  &.large {
    width: 75%;
    height: 80%;
  }
}

.modal__header,
.modal__footer {
  padding: 15px;
  display: flex;
}

.modal__header {
  position: relative;
  border-bottom: 1px dotted #000;
  color: #fff;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #444;
  font-size: 1.5em;
  button {
    font-size: 1.2rem;
    // margin-top: -10px;
    color: #000;
    span {
      padding-bottom: 2px;
      display: block;
    }
  }
}

.modal__footer {
  // border-top: 1px dotted #000;
  flex-direction: column;
  button {
    height: 2.5em;
  }
}

.modal__body {
  position: relative;
  margin: 1em 1em;
  padding: 0;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.btn-close {
  // background-color: #ccc;
  font-size: 0.8em;
  padding: 0.4em;
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
</style>
