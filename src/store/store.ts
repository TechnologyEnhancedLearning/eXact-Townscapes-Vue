import Factory from "@/models/Factory";
import Log from "@/Log";
import SessionConfig from "@/models/SessionConfig";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import HotspotPage from "@/models/HotspotPage";
import Link from "@/models/Link";
import Information from "@/models/Information";
export interface State {
  loadingStatus: string;
  sessionConfig: SessionConfig;
  visibleModal: string;
  animationsEnabled: boolean;
  hotspotIndicatorsEnabled: boolean,
  stageLeftPosition: string,
  viewMode: string;
}

export const key: InjectionKey<Store<State>> = Symbol("mainStore");

export const store = createStore<State>({
  modules: {
  },
  state: {
    loadingStatus: "loading",
    sessionConfig: new SessionConfig(),
    visibleModal: "",
    animationsEnabled: true,
    hotspotIndicatorsEnabled: false,
    stageLeftPosition: "0%",
    viewMode: "normal"
  },
  getters: {},
  mutations: {
    SET_STATUS (state, value) {
      state.loadingStatus = value;
    },
    SET_SESSION_CONFIG (state, value) {
      state.sessionConfig = value;
    },
    SET_CURRENT_MODAL (state, value) {
      state.visibleModal = value;
    },
    SET_STAGE_LEFT_POSITION (state, value) {
      state.stageLeftPosition = value;
    },
    ENABLE_ANIMATIONS (state, value) {
      state.animationsEnabled = value;
    },
    TOGGLE_ANIMATIONS (state, value) {
      state.animationsEnabled = value;
    },
    ENABLE_HOTSPOTINDICATORS (state, value) {
      state.hotspotIndicatorsEnabled = value;
    },
    TOGGLE_HOTSPOTINDICATORS (state, value) {
      state.hotspotIndicatorsEnabled = value;
    },
    SET_VIEW_MODE (state, value) {
      state.viewMode = value;
      const d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      const expires = "expires=" + d.toUTCString();
      document.cookie = "ViewMode=" + state.viewMode + ";" + expires + ";path=/";
    }
  },
  actions: {
    setLoadingStatus ({ commit }, value) {
      commit("SET_STATUS", value);
    },
    setVisibleModal ({ commit }, value) {
      commit("SET_CURRENT_MODAL", value);
    },
    setStageLeftPosition ({ commit }, value) {
      commit("SET_STAGE_LEFT_POSITION", value);
    },
    enableAnimations ({ commit }, value) {
      commit("ENABLE_ANIMATIONS", value);
    },
    async toggleAnimations ({ commit }) {
      commit("TOGGLE_ANIMATIONS", !this.state.animationsEnabled);
    },
    enableHotspotIndicators ({ commit }, value) {
      commit("ENABLE_HOTSPOTINDICATORS", value);
    },
    async toggleHotspotIndicators ({ commit }) {
      commit("TOGGLE_HOTSPOTINDICATORS", !this.state.hotspotIndicatorsEnabled);
    },
    setViewMode ({ commit }, value) {
      commit("SET_VIEW_MODE", value);
    },
    async toggleViewMode ({ commit }) {
      if (this.state.viewMode === "normal") {
        commit("SET_VIEW_MODE", "smallOnly");
      } else {
        commit("SET_VIEW_MODE", "normal");
      }
    },
    async configureSession ({ commit }, value) {
      const fileConfig: any = value;
      const config = new SessionConfig();

      Log.Info("*******************************");
      Log.Info("** Loading configuration for **");
      Log.Info("** elfh townscapes session   **");
      Log.Info("*******************************");
      Log.Info(`Template type: ${fileConfig.root["@name"]} `);
      Log.Info(`Template version: ${fileConfig.root["@templateversion"]} `);

      config.title = fileConfig.root["@description"];

      config.editorOn = fileConfig.root["@editoron"] !== "no";
      // config.editorOn = true;

      this.dispatch("enableHotspotIndicators", fileConfig.root["@hotspotindicatorshowonstart"] === "yes");
      this.dispatch("enableAnimations", true);

      config.stage.hotSpotIndicatorColour = fileConfig.root["@hotspotindicatorcolour"];
      config.stage.scrollButtonsEnabled = fileConfig.root["@scrollbuttonsenabled"] === "yes";
      if (config.stage.scrollButtonsEnabled) {
        config.stage.scrollButtonColour = fileConfig.root["@scrollbuttoncolour"];
        config.stage.scrollButtonStrokeColour = fileConfig.root["@scrollbuttonstrokecolour"];
      }
      config.stage.height = fileConfig.root["@height"];
      config.stage.width = fileConfig.root["@width"];
      config.stage.backgroundColor = fileConfig.root["@stagebackgroundcolor"];

      config.stage.controlButtonBackgroundColor = String(fileConfig.root["@controlbuttonbackgroundcolor"]).length > 0 ? fileConfig.root["@controlbuttonbackgroundcolor"] : "#fff";
      config.stage.controlButtonTextColor = String(fileConfig.root["@controlbuttontextcolor"]).length > 0 ? fileConfig.root["@controlbuttontextcolor"] : "#000";
      config.stage.controlButtonRolloverBackgroundColor = String(fileConfig.root["@controlbuttonrolloverbackgroundcolor"]).length > 0 ? fileConfig.root["@controlbuttonrolloverbackgroundcolor"] : "#fff";
      config.stage.controlButtonRolloverTextColor = String(fileConfig.root["@controlbuttonrollovertextcolor"]).length > 0 ? fileConfig.root["@controlbuttonrollovertextcolor"] : "#000";
      config.stage.controlButtonBorderColor = String(fileConfig.root["@controlbuttonbordercolor"]).length > 0 ? fileConfig.root["@controlbuttonbordercolor"] : "#fff";
      config.stage.controlButtonBorderWidth = String(fileConfig.root["@controlbuttonborderwidth"]).length > 0 ? fileConfig.root["@controlbuttonborderwidth"] : "0";

      // config.stage.leftStartPosition = fileConfig.root["@stagestartposition"];
      // config.stage.leftStartPosition = "-133%";
      this.dispatch("setStageLeftPosition", fileConfig.root["@stagestartposition"]);
      //this.dispatch("setStageLeftPosition", "-20%");
      config.stage.footerColor = fileConfig.root["@footerbackgroundcolor"];
      config.stage.footerHeight = fileConfig.root["@footerheight"];

      const info = new Information();
      info.title = fileConfig.root["@informationbuttontext"];
      if (fileConfig.root.information) {
        info.text = fileConfig.root.information.contents;
      }
      config.info = info;

      const l = new Link();
      l.text = "Overview";
      const subLink = new Link();
      subLink.isOverviewLink = true;
      if (fileConfig.root.overview) {
        subLink.text = fileConfig.root.overview.contents;
      }
      l.links.push(subLink);
      config.overview = l;

      const backgroundImage = fileConfig.root.backgroundImage;
      const stageBackground = Factory.createBackground(backgroundImage);
      config.stageBackground = stageBackground;

      const configStageAssets = fileConfig.root.stageAssets;

      configStageAssets.forEach((configAsset: any) => {
        config.assets.push(Factory.createStageAsset(configAsset));
      });

      const configPages = fileConfig.root.pages;

      configPages.forEach((configPage: any) => {
        const p = new HotspotPage();
        p.name = configPage["@description"].toLowerCase().replaceAll(" ", "-");
        if (p.name !== "") {
          p.iconColor1 = configPage["@iconcolour"];
          p.iconColor2 = "#fff";
          p.iconColor3 = configPage["@iconcolour"];
          p.pageTitle = configPage["@description"];

          configPage.components.forEach((c: any) => {
            // image inside stage asset
            if (c["@name"] === "background" && c.components) {
              p.backgroundColor = c["@backgroundcolor"];
              c.components.forEach((b: any) => {
                if (b["@name"] === "image" && b.components) {
                  // get href for image
                  b.components.forEach((a: any) => {
                    if (a["@href"]) {
                      // stageAsset.src = "/session/1/TWNSCPS_Session/1/" + secondC["@href"];
                      p.backgroundImgSrc = process.env.VUE_APP_SESSION_PATH + a["@href"];
                    }
                  });
                }
              });
            }
            if (c["@name"] === "links" && c.components) {
              c.components.forEach((x: any) => {
                const l = Factory.createLink(x);
                // only add links that have text added by the author
                if (l.text !== "") {
                  p.links.push(l);
                }
              });
            }
          });

          config.hotspotPages.push(p);
        }
      });

      commit("SET_SESSION_CONFIG", config);

      Log.Info("************************************");
      Log.Info("** Session configuration complete **");
      Log.Info("************************************");

      this.dispatch("setLoadingStatus", "loaded");
    }
  }
});
