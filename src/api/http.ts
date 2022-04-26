import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

type TAxiosOption = {
    timeout: number;
    baseURL: string;
}
 
const config = {
    timeout: 5000,
    baseURL: "http://localhost:8080"
}
 
class Http {

    service;
    constructor(config: TAxiosOption) {
        this.service = axios.create(config)
        /* 请求拦截 */
        this.service.interceptors.request.use((config: AxiosRequestConfig) => {
            if (localStorage.getItem('token') && localStorage.getItem("tokenKey")) {
                (config.headers as AxiosRequestHeaders).authorization = localStorage.getItem('token') as string
                (config.headers as AxiosRequestHeaders).authorizationKey = localStorage.getItem('tokenKey') as string
            }
            return config
        }, error => {
            console.log("error");
            return Promise.reject(error);
        })

        /* 响应拦截 */
        this.service.interceptors.response.use((response: AxiosResponse<any>) => {
            const data = response.data
            // 错误处理 to do
            return response.data
        }, error => {
            return Promise.reject(error)
        })
    }

    /* GET 方法 */
    get<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.get(url, { params, ..._object })
    }
    /* POST 方法 */
    post<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.post(url, params, _object)
    }
    /* PUT 方法 */
    put<T>(url: string, params?: object, _object = {}): Promise<any> {
        return this.service.put(url, params, _object)
    }
    /* DELETE 方法 */
    delete<T>(url: string, params?: any, _object = {}): Promise<any> {
        return this.service.delete(url, { params, ..._object })
    }
}

export default new Http(config)