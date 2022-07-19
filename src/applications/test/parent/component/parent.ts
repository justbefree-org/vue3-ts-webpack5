/*
 * @Author: Just be free
 * @Date:   2021-03-03 17:39:15
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:48:47
 * @E-mail: justbefree@126.com
 */
import { BaseComponent, mixins, Options, prop } from "@/base";
import { h, VNode } from "vue";
class Props {
  msg = prop<string>({ default: "default msg" });
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
