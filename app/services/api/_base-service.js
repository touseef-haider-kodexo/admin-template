/* eslint-disable */
import axios from "@/utils/axios";
import NotificationStatus from "@/components/Notification";

export default class BaseService {
  constructor(instance = axios) {
    this.instance = instance;
  }

  get(...args) {
    return this.execute("get", ...args);
  }

  post(...args) {
    return this.execute("post", ...args);
  }

  put(...args) {
    return this.execute("put", ...args);
  }

  delete(...args) {
    return this.execute("delete", ...args);
  }

  async execute(method, ...args) {
    try {
      const response = await this.instance[method](...args);
      return Promise.resolve(response?.data);
    } catch (error) {
      let { message, status } = error?.response?.data;
      if (!message) {
        message = "Something went wrong";
      }
      if (!status) {
        status = 500;
      }
      // if (message.includes("jwt expired")) {
      //   return;
      // }

      console.log(error);

      // if (message.includes("refresh token expired")) {
      //   localStorage.clear();
      // }

      NotificationStatus(status === 201 ? "warning" : "error", message);
      return Promise.reject(error?.response?.data);
    }
  }
}
