export default class Link {
  public id = "";
  public isOverviewLink = false;
  public text = "";
  public isAccordion = false;
  public links = new Array<Link>(); // if this is populated, display it as an accordion
}
