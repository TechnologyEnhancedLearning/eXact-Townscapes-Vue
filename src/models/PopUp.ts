import PopUpItem from "./Link";

export default class PopUp {
  public label = "";
  public imageSrc = "";
  public backgroundColor = "#000";
  public items = new Array<PopUpItem>(); // 11 max on pop up page
}
