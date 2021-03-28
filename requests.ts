// import axios, { AxiosRequestConfig } from 'axios'
// import Dialog from './src/utils/dialog'

// const axiosBaseConfig: AxiosRequestConfig = {
//     baseURL: '',
//     timeout: 70000, // request timeout
//     withCredentials: true,
//     headers: { 'X-Requested-With': 'XMLHttpRequest' }
// }

// if (process.env.NODE_ENV === 'development') {
//     // axiosBaseConfig.baseURL = 'http://127.0.0.1:3000'
//     // axiosBaseConfig.baseURL = 'http://10.101.46.70:8080'
// } else {
//     // 'http://dev.ops.vivo.xyz', // process.env.BASE_API, // api 的 base_url
//     // axiosBaseConfig.baseURL = process.server ? 'http://127.0.0.1:3000' : 'http://cloud-test.vmic.xyz/'
// }

// // create an axios instance
// const service = axios.create(axiosBaseConfig);

// // request interceptor
// service.interceptors.request.use(
//     (config) => {
//         return config
//     },
//     (error) => {
//         // Do something with request error
//         console.log(error) // for debug
//         Promise.reject(error)
//     }
// )

// // response interceptor
// service.interceptors.response.use(
//     (response) => {
//         const { url } = response.config
//         const ret = response.data
//         // TODO: test
//         if (typeof ret.code === 'undefined') {
//             return ret
//         }
//         if (ret.code !== 0) {
//             const error = ret.msg || '网络异常，请稍后再试'
//             Dialog.showError(error)
//             return Promise.reject(new Error(`${url}: ${error}`))
//         } else {
//             if (ret.data === null || ret.data === undefined) {
//                 return {}
//             } else {
//                 return ret.data
//             }
//         }
//     },
//     (error) => {
//         if (process.env.NODE_ENV === 'development') {
//             console.log('err: ' + error)
//         }

//         const data = (error.response && error.response.data) || {}
//         const { code, message = '' } = data
//         let ret = message || error.message

//         if ((code !== 1000 && code !== 1001) || !code) {
//             Dialog.showError(ret)
//         } else if (code === 1000) {
//             try {
//                 ret = { code: 200, data: JSON.parse(message) }
//             } catch (e) {
//                 if (process.env.NODE_ENV === 'development') {
//                     console.log('axios parse err', e)

//                 }
//             }
//         } else if (code === 1001) {
//             ret = data

//             ret.code = 200
//         }

//         return Promise.reject(ret)
//     }
// )

// export default service

// export function ajaxMethod(method, url, params, options?: object): Promise<unknown> {
//     const newPromies = new Promise(function (resolve, reject) {
//         service[method](url, params, options)
//             .then((ret) => {
//                 if (ret) {
//                     resolve(ret)
//                 } else {
//                     reject(new Error(`${url} request error`))
//                 }
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })

//     return newPromies
// }

// export function ajaxGet(url, params?: object | null, options?: object): Promise<any> {
//     const args = Object.assign({}, options, { params })
//     return ajaxMethod('get', url, args)
// }

// export function ajaxPost(url, params?: object | null, options?: object): Promise<any> {
//     return ajaxMethod('post', url, params, options)
// }

// export function ajaxPut(url, params?: object | null, options?: object): Promise<any> {
//     return ajaxMethod('put', url, params, options)
// }

// export function ajaxDelete(url, params?: object | null, options?: object): Promise<any> {
//     return ajaxMethod('delete', url, params, options)
// }

// export function ajaxJsonp(url, params?: object | null, options?: object): Promise<any> {
//     return ajaxMethod('delete', url, params, options)
// }