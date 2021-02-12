const app = require('express')()

const cors = require('cors')
app.use(cors())

app.get('/tab1', (req, res) => {
  res.json('Tab 1 的结果')
})

app.get('/tab2', (req, res) => {
  // 这里通过延时代码来模拟处理大数据量的场景
  setTimeout(() => {
    res.json('Tab 2 的结果')
  }, 3000)
})

app.get('/tab3', (req, res) => {
  res.json('Tab 3 的结果')
})

app.listen(3000, () => {
  console.info('app start at 3000 port')
})