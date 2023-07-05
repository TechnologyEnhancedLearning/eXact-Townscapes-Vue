
import Link from "./Link";

export default class HotspotPage {
  public id = "";
  public name = "";
  public pageTitle = "";
  // RGBA - default black with no opacity
  public backgroundColor = "#fff";
  public iconColor1 = "#000";
  public iconColor2 = "#fff";
  public iconColor3 = "rgba(255, 255, 255, 0.5)";
  public backgroundImgSrc = "";
  public links = new Array<Link>();
}
