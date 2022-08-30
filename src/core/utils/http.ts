/*
 * @Author: Just be free
 * @Date:   2020-07-28 15:22:10
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-08-30 17:05:16
 * @E-mail: justbefree@126.com
 */
import axios from "axios";
import { AnyObject, Anything } from "../types";
import * as qs from "qs";
const formData = (config: AnyObject) => {
  const { interceptor } = config;
  delete config.interceptor;
  config["headers"] = {
    ...config["headers"],
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  const instance = axios.create(config);
  if (interceptor && typeof interceptor === "function") {
    return interceptor(instance);
  }
  return instance;
};

const json = (config: AnyObject) => {
  const { interceptor } = config;
  delete config.interceptor;
  config["headers"] = {
    ...config["headers"],
    "Content-Type": "application/json;charset=utf-8",
  };
  const instance = axios.create(config);
  if (interceptor && typeof interceptor === "function") {
    return interceptor(instance);
  }
  return instance;
};

const post = (url: string, params: AnyObject, config = {}): Promise<any> => {
  return formData(config)
    .post(url, qs.stringify(params))
    .then((res: Anything) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e: Anything) => {
      console.log(e);
    });
};
const upload = (
  url: string,
  params: AnyObject,
  config: AnyObject = {}
): Promise<any> => {
  config["headers"] = {
    "Content-Type": "multipart/form-data;charset=utf-8",
  };
  return formData(config)
    .post(url, params)
    .then((res: Anything) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e: Anything) => {
      console.log(e);
    });
};
const get = (url: string, params: AnyObject, config = {}): Promise<any> => {
  return formData(config)
    .get(url + "?" + qs.stringify(params))
    .then((res: Anything) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e: Anything) => {
      console.log(e);
    });
};
const postJSON = (
  url: string,
  params: AnyObject,
  config = {}
): Promise<any> => {
  return json(config)
    .post(url, params)
    .then((res: Anything) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((e: Anything) => {
      console.log(e);
    });
};
const methods = { post, get, postJSON, upload };
export type HttpMethodTypes = "get" | "post" | "postJSON" | "upload";
const Http = (args: keyof typeof methods) => {
  return methods[args];
};
export default Http;
