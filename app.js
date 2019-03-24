const express = require('express')
const app = express()
const path = require('path')
// const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cid = require('crypto-alphanumeric-id')
const compression = require('compression')
const helmet = require('helmet')

app.listen(process.env.PORT || 1791)
const dev = process.env.NODE_ENV === 'development'
const prod = process.env.NODE_ENV === 'production'
if (prod) app.use(compression({ threshold: 0 }))
if (prod) app.use(helmet())
if (prod) app.set('trust proxy', 1)
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/dist'), { maxAge: prod ? 2628002880 : 0 })) // 1 week : 0 ms
// app.use(favicon(path.join(__dirname, 'client/dist/images/logo.ico')))

app.get('/api/user', (req, res, next) => {
  console.log('/api/user')

  const { username } = req.query || req.session

  setTimeout(() => {
    res.json({
      username: username || 'connorwiebe',
      created: Date.now()
    })
  }, 500)
})

app.get('/*', (req, res, next) => {
  console.log('sendFile')
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

app.use((req, res, next) => {
  next({ code: 404 })
})

app.use(async (err, req, res, next) => {
  console.log(err)
  if (err.statusCode) err.code = err.statusCode
  if (!err.code || typeof err.code !== 'number') err.code = 500
  if (err.code === 500 && prod) process.exitCode = 1
  res.status(err.code)
  console.log('sending error status:', err.code)
  res.send({ err: err.message })
})
