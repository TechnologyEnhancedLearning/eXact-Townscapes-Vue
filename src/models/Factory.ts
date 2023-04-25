import Link from "./Link";
import StageAsset from "./StageAsset";
import StageBackground from "./StageBackground";
import StageTimeline from "./StageTimeline";
import StageTween from "./StageTween";

export default class Factory {
  public static createTween (type: string, duration: number, delay: number, repeat: number, ease: string, easeType: string, yoyo: string): StageTween {
    const t = new StageTween();
    t.type = type;
    t.duration = duration;
    t.delay = delay;
    t.ease = ease;

    if (ease !== "none") {
      t.easeType = easeType;
    }
    t.repeat = repeat;

    return t;
  }

  /*
  public static createAccordion () {

  }
  */

  // loop through a config link, creating all its sublinks
  public static createLink (configLink: any): Link {
    const l = new Link();
    configLink.components.forEach((x: any) => {
      if (x["@name"] === "linkText" && x.contents && x.contents.length > 0) {
        l.id = x["@label"];
        l.text = x.contents;
      } else if (x["@name"] === "sublinks" && x.components) {
        x.components.forEach((sublinksComponent: any) => {
          if (sublinksComponent["@name"] === "sublink" && sublinksComponent.components) {
            const subLink = new Link();
            // does this contain accordion items?
            sublinksComponent.components.forEach((b: any) => {
              if (b["@name"] === "subLinkText" && b.contents && b.contents.length > 0) {
                subLink.id = b["@label"];
                subLink.text = b.contents;
              } else if (b["@name"] === "accordionItems" && b.components.length > 0) {
                subLink.isAccordion = true;
                b.components.forEach((accordionItem: any) => {
                  const accLink = new Link();
                  accLink.id = accordionItem["@label"];
                  accLink.text = accordionItem.contents;
                  subLink.links.push(accLink);
                });
              }
            });
            l.links.push(subLink);
          }
        });
      }
      // l.links.push(Factory.createLink(x));
    });

    return l;
  }

  /*
  public static createBaseAsset (id: string, name: string, width: string, left: string, top: string, zIndex: number, disabled: boolean): AssetInterface {
    const a = new BaseAsset();
    a.id = id;
    a.name = name === "" ? "Not specified" : name;
    // a.height = height;
    a.width = width;
    a.left = left;
    a.top = top;
    a.z = zIndex;
    a.disabled = disabled;

    return a;
  }
*/
  public static createBackground (fileAsset: any): StageBackground {
    const stageBackground = new StageBackground();

    stageBackground.id = fileAsset["@label"];
    stageBackground.name = fileAsset["@description"] === "" ? "Not specified" : fileAsset["@description"];
    stageBackground.left = fileAsset["@left"];
    stageBackground.top = fileAsset["@top"];
    stageBackground.width = fileAsset["@width"];
    stageBackground.height = fileAsset["@height"];
    stageBackground.z = fileAsset["@zindex"];

    if (fileAsset["@imagealt"]) {
      stageBackground.altText = fileAsset["@imagealt"];
    }

    fileAsset.components.forEach((fa: any) => {
      // image inside stage asset
      if (fa["@name"] === "image" && fa.components) {
        // get href for image
        fa.components.forEach((secondC: any) => {
          if (secondC["@href"]) {
            // stageAsset.src = "/session/1/TWNSCPS_Session/1/" + secondC["@href"];
            stageBackground.src = process.env.VUE_APP_SESSION_PATH + secondC["@href"];
          }
        });
      }
    });

    return stageBackground;
  }

  public static createStageAsset (fileAsset: any): StageAsset {
    const stageAsset = new StageAsset();
    console.log(fileAsset);
    const geometry = fileAsset["@geometry"];

    if (geometry && geometry !== "") {
      const geometryArr = geometry.split(",");
      if (geometryArr.length === 4) {
        // (left, top, scale (width), z-index)
        stageAsset.id = fileAsset["@label"];
        stageAsset.name = fileAsset["@description"] === "" ? "Not specified" : fileAsset["@description"];
        stageAsset.left = geometryArr[0];
        stageAsset.top = geometryArr[1];
        stageAsset.width = geometryArr[2];
        stageAsset.z = parseInt(geometryArr[3], 10);
        stageAsset.disabled = fileAsset["@isdisabled"] === "yes";
      }
    }

    if (fileAsset["@hotspotpagename"]) {
      stageAsset.linkIdentifier = encodeURI(fileAsset["@hotspotpagename"].toLowerCase().replaceAll(" ", "-"));
    }

    if (fileAsset["@imagealt"]) {
      stageAsset.altText = fileAsset["@imagealt"];
    }

    stageAsset.timeline = new StageTimeline();

    fileAsset.components.forEach((fa: any) => {
      // image inside stage asset
      if (fa["@name"] === "image" && fa.components) {
        // get href for image
        fa.components.forEach((secondC: any) => {
          if (secondC["@href"]) {
            // stageAsset.src = "/session/1/TWNSCPS_Session/1/" + secondC["@href"];
            stageAsset.src = process.env.VUE_APP_SESSION_PATH + secondC["@href"];
          }
        });
      }
      if (fa["@name"] === "tweens" && fa.components) {
        stageAsset.timeline.repeat = parseInt(fa["@repeat"], 10);
        stageAsset.timeline.repeatDelay = parseFloat(fa["@repeatDelay"]);
        stageAsset.timeline.yoyo = fa["@yoyo"].toLowerCase() === "yes";

        // for each tween
        fa.components.forEach((configTween: any) => {
          // create tween
          const tween = Factory.createTween(
            configTween["@type"],
            parseFloat(configTween["@duration"]),
            parseFloat(configTween["@delay"]),
            parseInt(configTween["@repeat"], 10),
            configTween["@ease"],
            configTween["@easeType"],
            configTween["@yoyo"]
          );

          // animation properties
          // change key value of animatedProperties if any of the key values are:
          // flip horizontally - scaleX -1
          // flip vertically - scaleY -1
          // scale width - scaleX
          // scale height - scaleY
          // scale height and width - change to scaleX and scaleY
          configTween.components.forEach((configProp: any) => {
            // create animation property
            // tween["@ease"];
            if (configProp["@property"]) {
              let propValue = "";
              if (configProp["@value"]) {
                propValue = configProp["@value"];
              }
              let propType = configProp["@property"];

              if (propType.toLowerCase() === "scale height and width") {
                tween.animatedProperties.set("scaleX", propValue);
                tween.animatedProperties.set("scaleY", propValue);
              } else {
                switch (propType.toLowerCase()) {
                  case "flip horizontally":
                    propType = "scaleX";
                    propValue = "-1";
                    break;
                  case "flip vertically":
                    propType = "scaleY";
                    propValue = "-1";
                    break;
                  case "scale width":
                    propType = "scaleX";
                    break;
                  case "scale height":
                    propType = "scaleY";
                    break;
                }
                tween.animatedProperties.set(propType, propValue);
              }
            }
          });

          stageAsset.timeline.tweens.push(tween);
        });
      }
    });

    return stageAsset;
  }
}
