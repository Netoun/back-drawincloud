const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snapshotSchema = new Schema({
    dataURL: { type: String, required: true }
})

module.exports = mongoose.model('Snapshot', snapshotSchema)

/*const snapshotSchema = new Schema({
    dataUrl: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    users: { type: [String], required: true },
    name: { type: String, required: true }
})*/