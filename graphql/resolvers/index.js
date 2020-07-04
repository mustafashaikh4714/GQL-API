import userResolvers from './user'
import eventResolvers from './event'
import bookingResolvers from './booking'

const rootResolver = {
  ...userResolvers,
  ...eventResolvers,
  ...bookingResolvers
}

export default rootResolver
