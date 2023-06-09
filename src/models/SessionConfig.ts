import HotspotPage from "./HotspotPage";
import Link from "./Link";
import Information from "./Information";
import Stage from "./Stage";
import StageAsset from "./StageAsset";
import StageBackground from "./StageBackground";

export default class SessionConfig {
  public title = "";
  public editorOn = false;
  public info = new Information();
  public overview = new Link();
  public stage = new Stage();
  public stageBackground = new StageBackground();
  public assets = new Array<StageAsset>();
  public hotspotPages = new Array<HotspotPage>();
}
