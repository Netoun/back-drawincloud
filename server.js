const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = require('express.io')()

app.http().io()
const Snapshot = require('./app/model/snapshot')

const mongoDB = 'mongodb://127.0.0.1:27017/drawincloud'
mongoose.connect(mongoDB)

const schema = {
  properties: {
    dataUrl: {
      type: 'string'
    },
    date: {
      type: 'date'
    },
    users: {
      type: '[number]'
    },
    name: {
      type: 'String'
    }
  },
  required: ['dataUrl', 'date', 'users', 'name']
}

// Broadcast all draw clicks.
app.io.route('drawClick', (req) => {
  req.io.broadcast('draw', {
    x: req.data.x,
    y: req.data.y,
    type: req.data.type,
    color: req.data.color
  })
})

app.io.route('drawBase64', (req) => {
  const snapshot = new Snapshot(req.data)
  snapshot.save((err) => {
    if (err)
      req.io.broadcast('error', {
        error: err
      })
  })
})

app.listen(4444, () => {
  console.log('App start')
})