const mongoose = require('mongoose')
const Schema = mongoose.Schema

const snapshotSchema = new Schema({
    dataUrl: { type: String, required: true },
    date: { type: Date, required: true },
    user_id: { type: Number, required: true }
})

module.exports = mongoose.model('Snapshot', snapshotSchema)