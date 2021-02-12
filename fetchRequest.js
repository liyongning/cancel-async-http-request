/**
 * 原生方案，可以中断请求，但是却解决不了案例的问题
 */
// 通过 AbortController/AbortSignal 中断请求
// const abortController = new AbortController()

// // 向外暴露取消函数
// function cancelFn() {
//   // 中断所有网络传输，特别适合希望停止传输大型负载的情况
//   abortController.abort()
// }

// const baseURL = 'http://localhost:3000'

// function request(reqArgs) {
//   // 接口返回的数据格式是为了兼容 axios 的示例代码
//   return fetch(baseURL + reqArgs.url, { signal: abortController.signal }).then(async response => ({ data: await response.json() }))
// }

/**
 * 通用方案
 */
// 初始化为一个函数，防止报错
let cancelFn = function () {}

const baseURL = 'http://localhost:3000'

function request(reqArgs) {
  return new Promise((resolve, reject) => {
    // 接口返回的数据格式是为了兼容 axios 的示例代码
    fetch(baseURL + reqArgs.url).then(async response => resolve({ data: await response.json() }))

    // 向外暴露取消函数
    cancelFn = function(msg) {
      reject({ message: msg })
    }
  })
}
