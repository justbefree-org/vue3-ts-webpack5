import axios from "axios";
import { getConfig } from "@/config";
import { AnyObject, Anything } from "../types";
class CancelApi {
  cancelTokenArr: Anything[];
  constructor() {
    this.cancelTokenArr = [];
  }
  clearToCancelApi() {
    this.cancelTokenArr.forEach((item: Anything) => {
      item("路由跳转取消请求");
    });
  }
  pushToCancelApi(cancelToken: Anything) {
    this.cancelTokenArr.push(cancelToken);
  }
}
export const cancelApi = new CancelApi();
export const interceptor = (instance: Anything) => {
  instance.interceptors.request.use(
    (config: Anything) => {
      const { url } = config;
      const interceptAddress = getConfig("interceptAddress") as AnyObject;
      if (interceptAddress.timeoutApi.includes(url)) {
        config.timeout = 60 * 1000;
      }
      if (
        interceptAddress.cancelApi.some((aUrl: string) => url.includes(aUrl))
      ) {
        config.cancelToken = new axios.CancelToken((cancel) => {
          cancelApi.pushToCancelApi(cancel);
        });
      }
      return config;
    },
    (error: Anything) => {
      return Promise.reject(error);
    }
  );
};
