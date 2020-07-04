import Event from '../../models/event'
import { user } from './merge'

export default {
  events: async () => {
    let events = await Event.find().lean() // do not use populate becoz everytime it will populate user
    return events.map((event) => ({
      ...event,
      creator: user.bind(this, event.creator)
    }))
  },

  createEvent: async ({ eventInput }, req) => {
    if (!req.isAuth) {
      throw new Error('UnAuthenticated!')
    }
    const eventAlreadyExist = await Event.findOne({
      title: eventInput.title
    }).lean()
    if (eventAlreadyExist) throw new Error('Event already exists!')

    const event = new Event({
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: eventInput.date,
      creator: req.userId
    })
    return event.save()
  }
}
