const { Schema, model } = require('mongoose')

const projectSchema = new Schema(

        {
        title: String,
        description: String,
        tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ]
      },
      {
        timeseries: true
      }   
)

module.exports = model('Project', projectSchema)

  