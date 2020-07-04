import User from '../../models/user'
import Event from '../../models/event'

export const user = (userId) => {
  return User.findById(userId)
    .lean()
    .then((user) => {
      return { ...user, _id: user._id.toString() }
    })
    .catch((err) => {
      throw err
    })
}

export const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId).lean()
    return {
      ...event,
      _id: event.id,
      creator: user.bind(this, event.creator),
      date: new Date(event.date).toISOString()
    }
  } catch (error) {
    throw error
  }
}
