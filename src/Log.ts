export default class Log {
  static infoStyle = [
    "color: #00bb00",
    "background: transparent",
    "font-size: 12px",
    "padding: 10px"
  ].join(";");

  static warnStyle = [
    "color: #333",
    "background: #fff",
    "font-size: 12px",
    "border: 1px solid #000",
    "padding: 10px"
  ].join(";");

  static errorStyle = [
    "color: #fff",
    "font-weight: bold",
    "font-size: 12px",
    "padding: 20px"
  ].join(";");

  public static Info (msg: string, obj?: any) {
    console.info("%c%s", this.infoStyle, msg);
    if (obj) {
      console.dir(obj);
    }
  }

  public static Warn (msg: string) {
    console.log("%c%s", this.warnStyle, msg);
  }

  public static Error (msg: string, obj?: any) {
    if (obj) {
      console.error("%c%s%o", this.errorStyle, msg, obj);
    } else {
      console.error("%c%s", this.errorStyle, msg);
    }
  }
}
