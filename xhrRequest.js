const baseURL = 'http://localhost:3000'

const xhr = new XMLHttpRequest()

// 初始化取消函数，防止调用报错
let cancelFn = function() {}

function request(reqArgs) {
  return new Promise((resolve, reject) => {
    xhr.onload = function () {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        // 接口返回的数据格式是为了兼容 axios 的示例代码
        resolve({ data: xhr.responseText })
      } else {
        // 出错了
        reject(xhr.status)
      }
    }
    xhr.open(reqArgs.method || 'get', baseURL + reqArgs.url, true)
    xhr.send(reqArgs.data || null)

    // 向外暴露取消函数
    cancelFn = function (msg) {
      reject({ message: msg })
    }
  })
}

/**
 * 原生方案
 */

// 向外暴露取消函数
// function cancelFn() {
//   // xhr 原生提供了 abort 方法
//   xhr.abort()
// }