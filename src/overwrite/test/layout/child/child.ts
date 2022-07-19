/*
 * @Author: Just be free
 * @Date:   2021-03-04 11:18:50
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:59:36
 * @E-mail: justbefree@126.com
 */
// import "./style/index.scss";
import { Options, BaseLayout } from "@/base";
import { h, VNode } from "vue";
import { mapActions, mapState } from "vuex";
// import Parent from "@/applications/test/parent";
@Options({
  name: "Child",
  methods: {
    ...mapActions("test", ["changeText"]),
  },
  computed: {
    ...mapState("test", ["extendStore"]),
  },
})
export default class Child extends BaseLayout {
  public appName = "test";
  changeText!: () => void;
  extendStore!: string;
  change(): void {
    this.changeText();
  }
  render(): VNode {
    return h("div", {}, [
      h("h2", {}, "extend router page"),
      h(
        "p",
        {},
        `I will change if you click the button below - ${this.extendStore}`
      ),
      h("button", { onClick: this.change }, "click to change"),
      h(
        "div",
        {},
        {
          default: () => [`i18n - ${this.getProperLanguage("extendRoute")}`],
        }
      ),
    ]);
  }
}
