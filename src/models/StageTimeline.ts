import StageTween from "./StageTween";

export default class StageTimeline {
  public tweens = new Array<StageTween>();
  public repeat = 0; // 0 (run once), -1 (repeat forever), number of times.
  public repeatDelay = 0;
  public yoyo = false;
}
