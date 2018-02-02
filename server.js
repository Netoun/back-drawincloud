const mongoose = require('mongoose')
const app = require('express.io')()

app.http().io()
const Snapshot = require('./app/model/snapshot')

const mongoDB = 'mongodb://127.0.0.1:27017/drawincloud'
mongoose.connect(mongoDB)

const schema = {
  properties: {
    dataURL: {
      type: 'string'
    },
    date: {
      type: 'date'
    },
    user: {
      type: 'String'
    },
    title: {
      type: 'String'
    }
  },
  required: ['dataURL', 'user', 'title']
}

// Broadcast drawing
app.io.route('drawClick', (req) => {
  req.io.broadcast('draw', {
    x: req.data.x,
    y: req.data.y,
    type: req.data.type,
    color: req.data.color
  })
})

// Save snapshot
app.io.route('drawBase64', (req) => {
  const snapshot = new Snapshot(req.data)
  snapshot.save((err) => {
    if (err)
      req.io.broadcast('error', {
        error: err
      })
  })
})

// Get all snapshot
const sortUniqueTitle = (snapshot) => {
  Object.keys(snapshot).map((key, index) => {
    console.log(key)
  })
}
app.get('/snapshot', (req, res) => {
  Snapshot.find({}).sort({ date: 'desc' }).exec((err, snapshot) => {
    const data = sortUniqueTitle(snapshot)
    if (err)
      res.send(err)
    res.json(snapshot)
  })
})

// Get ID snapshot
app.get('/snapshot/:id', (req, res) => {
  const id = req.params.id
  Snapshot.findById(id, (err, snapshot) => {
    if (err)
      res.send(err)
    res.json(snapshot)
  })
})
/*app.get('/snapshot/:id', (req, res) => {
  const id = req.params.id
  Snapshot.findById(id, (err, snapshot) => {
    if (err)
      res.send(err)
    res.json(snapshot)
  })
})*/

// Get all snapshot from User
app.get('/:userId/snapshot', (req, res) => {
  const userId = req.params.userId
  Snapshot.findOne({ user: userId }, (err, snapshot) => {
    if (err)
      res.send(err)
    res.json(snapshot)
  })
})

app.listen(4444, () => {
  console.log('App start')
})