/*
 * @Author: Just be free
 * @Date:   2020-07-22 10:02:44
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-07-18 18:24:04
 * @E-mail: justbefree@126.com
 */
import { createApp } from "vue";
import { Component, Anything } from "../types";
import { PlatformConstructorParams, StartUpCallback } from "./types";
import { ApplicationObject } from "../Application/types";
import { default as Application } from "../Application";
const app = new Application();
class Platform {
  private _appStack: Array<Promise<Anything>>;
  private _App: Component;
  private _id: string;
  constructor(args: PlatformConstructorParams) {
    this._appStack = [];
    this._App = args.App;
    this._id = args.id;
  }
  private getAppStack() {
    return this._appStack;
  }
  private registerApplication(app: Promise<Anything>): Platform {
    this._appStack.push(app);
    return this;
  }
  public install(appName: string | Array<string> | ApplicationObject): void {
    if (appName && Array.isArray(appName)) {
      (appName as Array<string>).forEach((name: string) => {
        this.registerApplication(app.register(name));
      });
    } else {
      if (typeof appName === "string") {
        this.registerApplication(app.register(appName));
      } else {
        this.registerApplication(app.registerApp(appName as ApplicationObject));
      }
    }
  }
  public startUp(callback?: StartUpCallback): void {
    const apps = this.getAppStack();
    Promise.all(apps).then((res) => {
      console.log(`Platform has started`, res);
      const router = app.getRouter();
      const store = app.getStore();
      const i18n = app.getI18n();
      const { created } = this._App;
      const instance = createApp({
        ...this._App,
        created() {
          typeof callback === "function" && callback(this);
          app.registerDynamicRoutes();
          created();
        },
      })
        .use(store)
        .use(router)
        .use(i18n);
      instance.mount(this._id);
    });
  }
}
export default Platform;
