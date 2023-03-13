
export default class StageTween {
  public type = "to"; // to, from, fromTo
  public animatedProperties = new Map(); // e.g. left, rotate, flip horizontally (scaleX) etc.
  public ease = "none"; // none, power1, power2, power3, power4, back, elastic, bounce, rough, slowmo, stepped, circ, expo, sine
  public easeType = ""; // "", easeIn, easeOut, easeInOut
  public duration = 5; // in seconds
  public delay = 0; // in seconds
  public repeat = 0;
}
