/*
 * @Author: Just be free
 * @Date:   2021-03-08 11:20:37
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:47:04
 * @E-mail: justbefree@126.com
 */
import { BaseComponent, mixins, Options, prop } from "@/base";
import { h, VNode } from "vue";
class Props {
  msg = prop<string>({ default: "this is default msg" });
}
@Options({
  name: "Parent",
})
export default class Parent extends mixins(BaseComponent).with(Props) {
  public appName = "test";
  render(): VNode {
    return h("div", {}, "这个是父类");
  }
}
