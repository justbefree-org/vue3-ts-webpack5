/*
 * @Author: Just be free
 * @Date:   2021-03-03 16:06:37
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:47:59
 * @E-mail: justbefree@126.com
 */
import { Options, mixins, prop } from "@/base";
import SuperParent from "@/applications/test/parent/component";
class Props {
  hell = prop<string>({ default: "| i am a new props from current component" });
}
import { h, VNode } from "vue";
@Options({
  name: "Parent",
})
export default class Parent extends mixins(SuperParent).with(Props) {
  public appName = "test";
  render(): VNode {
    return h("div", {}, `这个是子类继承的父类 - ${this.msg} - ${this.hell}`);
  }
}
