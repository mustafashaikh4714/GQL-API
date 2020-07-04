import mongoose, { Schema } from 'mongoose'
const EventSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  date: Date,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
})
const Event = mongoose.model('Event', EventSchema)
export default Event
