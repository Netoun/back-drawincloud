const mongoose = require('mongoose')
const Snapchot = require('./app/model/snapshot')

const mongoDB = 'mongodb://127.0.0.1:27017/drawincloud'
mongoose.connect(mongoDB, {
  useMongoClient: true
})

const schema = {
  properties: {
    dataUrl: {
      type: 'string'
    },
    date: {
      type: 'date'
    },
    user_id: {
      type: 'number'
    }
  },
  required: ['dataUrl', 'date', 'user_id']
}


app.route('api/snapshot')
  .post(validate(schema), (req, res) => {
    var snapshot = new Snapchot(req.body)
    snapshot.save((err) => {
      if (err)
        res.send(err)
      res.json({
        snapshot: 'Snapchot created!'
      })
    })
  })
  .get((req, res) => {
    Snapchot.find((err, snapshot) => {
      if (err)
        res.send(err)
      res.json(snapshot)
    })
  })

  (function () {
    const io = require('socket.io').listen(4444)
    io.sockets.on('connection', function (socket) {
      socket.on('drawClick', function (data) {
        socket.broadcast.emit('draw', {
          x: data.x,
          y: data.y,
          type: data.type
        })
      })
      socket.on('drawBase64', function (data) {
        console.log(data.dataURL)
      })
    })
  }).call(this)
