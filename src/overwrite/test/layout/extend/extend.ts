/*
 * @Author: Just be free
 * @Date:   2021-03-04 10:17:52
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:59:58
 * @E-mail: justbefree@126.com
 */
// import "./style/index.scss";
import { h, VNode } from "vue";
import { Options } from "@/base";
import SuperExtend from "@/applications/test/layout/extend";
import Parent from "@/applications/test/parent";
@Options({
  name: "Extend",
})
export default class Extend extends SuperExtend {
  test(): void {
    console.log("this is extend test, child class rewrite the method");
  }
  render(): VNode {
    return h("div", {}, [
      h("h2", {}, "this is child class , extend examples"),
      h("button", { onClick: this.test }, "click me!"),
      h(
        "div",
        {},
        `这个是重写后的i18n词条 - ${this.getProperLanguage("extend")}`
      ),
      h(
        Parent,
        { msg: "this is message from child class", hel: 250 },
        {
          default: () => [],
        }
      ),
    ]);
  }
}
