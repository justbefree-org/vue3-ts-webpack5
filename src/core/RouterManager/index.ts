/*
 * @Author: Just be free
 * @Date:   2020-07-22 15:40:12
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-07-18 18:37:20
 * @E-mail: justbefree@126.com
 */
import { loadComponent } from "../utils/load";
import { RouteRecordRaw } from "vue-router";
import { Anything } from "../types";
class RouterManager {
  private baseDir: string;
  private routes: Array<RouteRecordRaw>;
  private constRoutes: Array<RouteRecordRaw>;
  private dynamicRoutes: Array<RouteRecordRaw>;
  private nameSpace: string;
  constructor(baseDir: string, nameSpace?: string) {
    this.baseDir = baseDir;
    this.routes = [];
    this.constRoutes = [];
    this.dynamicRoutes = [];
    this.nameSpace = nameSpace ? nameSpace : "";
  }
  private getBaseDir(): string {
    return this.baseDir;
  }
  private pushRoutes(route: RouteRecordRaw, isDynamic: boolean) {
    if (isDynamic) {
      this.dynamicRoutes.push(route);
    } else {
      this.constRoutes.push(route);
    }
    this.routes.push(route);
  }
  public merge(routerManager: RouterManager): RouterManager {
    this.routes = [...this.routes, ...routerManager.getRoutes()];
    this.constRoutes = [...this.constRoutes, ...routerManager.getConstRoutes()];
    this.dynamicRoutes = [
      ...this.dynamicRoutes,
      ...routerManager.getDynamicRoutes(),
    ];
    return this;
  }
  public getRoutes(): Array<RouteRecordRaw> {
    return this.routes;
  }
  public getConstRoutes(): Array<RouteRecordRaw> {
    return this.constRoutes;
  }
  public getDynamicRoutes(): Array<RouteRecordRaw> {
    return this.dynamicRoutes;
  }
  register(routes: Array<Anything> = []) {
    routes.forEach((route) => {
      if (route.path.startsWith("/") && this.nameSpace !== "") {
        route.path = `/${this.nameSpace}${route.path}`;
      }
      if (
        route.redirect &&
        route.redirect.startsWith("/") &&
        this.nameSpace !== ""
      ) {
        route.redirect = `/${this.nameSpace}${route.redirect}`;
      }
      if (route.pathName) {
        const path = `${this.getBaseDir()}/${route.pathName}`;
        route.component = loadComponent(path);
        delete route.pathName;
        if (route.children && route.children.length > 0) {
          this.register(route.children);
        }
      }
      // 注册一级路由，以及404页面
      if (route.path.startsWith("/") || route.path === "*") {
        const isDynamic = route.dynamic;
        delete route.dynamic;
        this.pushRoutes(route, isDynamic);
      }
    });
  }
}
export default RouterManager;
