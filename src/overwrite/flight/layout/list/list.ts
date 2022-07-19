/*
 * @Author: Just be free
 * @Date:   2021-03-04 13:59:00
 * @Last Modified by:   Just be free
 * @Last Modified time: 2021-05-12 15:50:30
 * @E-mail: justbefree@126.com
 */
import { Options, BaseLayout } from "@/base";
import { h, VNode } from "vue";
import { mapActions, mapState } from "vuex";
@Options({
  name: "List",
  methods: {
    ...mapActions("flight", ["getFlightList"]),
  },
  computed: {
    ...mapState("flight", ["title", "flightList"]),
  },
})
export default class List extends BaseLayout {
  public appName = "flight";
  getFlightList!: () => void;
  title!: string;
  flightList!: Array<number>;
  change(): void {
    this.getFlightList();
  }
  render(): VNode {
    return h("div", {}, [
      h("h2", {}, "flight list page"),
      h("p", {}, this.title),
      h("button", { onClick: this.change }, "click to get flight list"),
      h("div", {}, [`i18n - ${this.getProperLanguage("flight")}`]),
      h(
        "div",
        {},
        {
          default: () => [
            Array.apply(null, [...this.flightList]).map((list: any) => {
              return h("div", {}, list);
            }),
          ],
        }
      ),
    ]);
  }
}
