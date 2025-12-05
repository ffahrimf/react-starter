import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { addLang, useDecrypt } from "./use-helper";

interface PostData {
  path: string;
  body: Record<string, any>;
}

class useApi {
  private instance: AxiosInstance;
  private lang: string;

  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_APP_ENV}/api`,
      headers: {
        Accept: "text/plain",
      },
    });
    this.lang = Cookies.get("lang") ?? "id-ID";

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const encryptedToken = Cookies.get("hAS-aTH");
        const token = encryptedToken ? useDecrypt(encryptedToken) : null;
        if (token) {
          config.headers = config.headers ?? {};
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
  }

  async get(rawPath: string): Promise<any> {
    const path = addLang(rawPath, this.lang);
    const res = await this.instance.get(path);
    return res.data;
  }

  async post(data: PostData): Promise<any> {
    const path = addLang(data.path, this.lang);
    const res = await this.instance.post(path, data.body);
    return res.data;
  }
}

export default useApi;
