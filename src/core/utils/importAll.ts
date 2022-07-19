/*
 * @Author: Just be free
 * @Date:   2020-07-28 17:50:39
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-07-18 18:33:51
 * @E-mail: justbefree@126.com
 */
import { AnyObject, Anything } from "../types";
const importAll = (
  context: __WebpackModuleApi.RequireContext,
  excludes: Array<string> = []
) => {
  const map: AnyObject = {};
  const arr: Array<Anything> = [];
  for (const key of context.keys()) {
    const keyArr = String(key).split("/");
    keyArr.shift(); // DELETE "."
    if (excludes.length >= 0 && excludes.indexOf(String(key)) < 0) {
      map[keyArr.join(".").replace(/\.js|.ts$/g, "")] = context(key)["default"];
      arr.push(context(key)["default"]);
    }
  }
  return {
    toArray(): Array<Anything> {
      return arr;
    },
    toMap(): AnyObject {
      return map;
    },
  };
};

export default importAll;
