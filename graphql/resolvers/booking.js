import Booking from '../../models/booking'
import { singleEvent, user } from './merge'

export default {
  bookings: async () => {
    try {
      let bookings = await Booking.find().lean() // add limit if U want..
      return bookings.map((booking) => {
        return {
          ...booking,
          event: singleEvent.bind(this, booking.event),
          user: user.bind(this, booking.user)
        }
      })
    } catch (error) {
      throw error
    }
  },

  bookEvent: async ({ eventId }) => {
    try {
      const userAlreadyHasBooking = await Booking.findOne({
        user: '5eff7bef39b1874d91ccb10d',
        event: eventId
      }).lean()

      if (userAlreadyHasBooking) throw new Error('User already has this booking!')

      const booking = await new Booking({
        user: '5eff7bef39b1874d91ccb10d',
        event: eventId
      }).save()

      return {
        ...booking._doc,
        event: singleEvent.bind(this, booking.event),
        user: user.bind(this, booking.user)
      }
    } catch (error) {
      throw error
    }
  },
  cancelBooking: async ({ bookingId }) => {
    const booking = await Booking.findById(bookingId).populate('event').lean()
    if (booking) {
      await Booking.deleteOne({ _id: bookingId })
      const event = { ...booking.event, _id: booking.event.id }
      return event
    } else throw new Error('No booking found!')
  }
}
