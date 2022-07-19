/*
 * @Author: Just be free
 * @Date:   2020-07-30 13:43:52
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-07-18 18:36:07
 * @E-mail: justbefree@126.com
 */

import { Vue, Options } from "vue-class-component";
import { AnyObject, Anything } from "../types";
// import { createBem, BemConstructorContext } from "../utils/bem";
// import { BemConstructorContext } from "awesome-bem-scss/types";
// import { createBem } from "awesome-bem-scss";

// Define a super class component
class Props {}
@Options({
  name: "Super",
})
export default class Super extends Vue.with(Props) {
  [propName: string]: Anything;
  public appName = "";
  getProperLanguage(key: string, inject: AnyObject = {}) {
    // console.log(this.$options.name, this.appName);
    const keyPath = `${this.appName}.${this.$options.name}.${key}`;
    return this.$t(keyPath, inject);
  }
  changeLanguage(lang: string): void {
    this.$i18n.locale = lang;
  }
  getCurrentLanguage(): string {
    return this.$i18n.locale || "zh-CN";
  }
  // bem(b: BemConstructorContext, e?: BemConstructorContext): string {
  //   return createBem(b, e);
  // }
}
