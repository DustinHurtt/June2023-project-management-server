const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
    {
        title: String,
        description: String,
        project: { type: Schema.Types.ObjectId, ref: 'Project' }
    },
    {
        timeseries: true
    }      
)

module.exports = model('Task', taskSchema)