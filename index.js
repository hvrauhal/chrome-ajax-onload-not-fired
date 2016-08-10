const express = require('express')
const app = express()
const path = require('path')

const serveFile = absPath => (req, res) => res.sendFile(absPath)
app.use((req, res, next) => {
  console.log('Before:', req.url)
  next()
})
app.get('/jquery.js', serveFile(require.resolve('jquery')))
app.get('/', serveFile(path.join(__dirname, 'index.html')))
var fooBar = {foo: 'bar'}
app.get('/staticjson', (req, res) => res.json(fooBar))
let i = 1
app.get('/dynamicjson', (req, res) => {
  var newObj = {foo: 'bar', index: i++}
  console.log('dynamic ' + newObj.index)
  return res.json(newObj);
})
let j = 1
app.get('/dynamicjsonwith-delayed', (req, res) => res.json(Object.assign({}, fooBar, {index: j++})))
let k = 1
app.get('/dynamicjsonwith-parallel-requests', (req, res) => res.json(Object.assign({}, fooBar, {index: k++})))
const listeningApp = app.listen(0, function (err) {
  const indexHtml = 'http://localhost:' + listeningApp.address().port
  console.log(`open at ${indexHtml}`)
})
