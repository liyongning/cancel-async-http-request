const baseURL = 'http://localhost:3000'
const CancelToken = axios.CancelToken

const ins = axios.create({
  baseURL,
  timeout: 10000
})

ins.interceptors.request.use(config => {
  // 拦截请求，可以在这里自定义一些配置，比如 token
  return config
})

ins.interceptors.response.use(response => {
  // 拦截响应，可以根据服务端返回的状态码做一些自定义的响应和信息提示
  return response
})

/**
 * 原生解决方案，Axios 官网：http://www.axios-js.com/zh-cn/docs/#%E5%8F%96%E6%B6%88
 */
// 初始化为一个函数，防止报错
// let cancelFn = function () {}

// function request(reqArgs) {
//   // 在传递的参数中设置一个 cancelToken 实例
//   reqArgs.cancelToken = new CancelToken(function (cancel) {
//     // 向外暴露取消函数
//     cancelFn = cancel
//   })
//   return ins.request(reqArgs)
// }


/**
 * 通用解决方案 
 */
// 初始化为一个函数，防止报错
let cancelFn = function () {}

function request(reqArgs) {
  return new Promise((resolve, reject) => {
    // 请求接口
    ins.request(reqArgs).then(res => resolve(res))

    // 向外暴露取消函数
    cancelFn = function (msg) {
      reject({ message: msg })
    }
  })
}
