const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snapshotSchema = new Schema({
    dataURL: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    user: { type: String, required: true },
    title: { type: String, required: true }
})

module.exports = mongoose.model('Snapshot', snapshotSchema)