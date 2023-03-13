import AssetInterface from "@/interfaces/AssetInterface";

export default class BaseAsset implements AssetInterface {
  public id = "";
  public name= "";
  public src = "";
  public altText = "";
  public left = "";
  public right = "";
  public top = "0";
  public z = 0;
  public width = "150px";
  public backgroundColor = "transparent";
  public disabled = false;
}
