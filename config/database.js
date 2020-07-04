import mongoose from 'mongoose'
mongoose.set('useUnifiedTopology', true)

export default mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.sje3y.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
)
