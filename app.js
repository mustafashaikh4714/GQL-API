import express from 'express'
import bodyParser from 'body-parser'
import graphqlHttp from 'express-graphql'
import connectDb from './config/database'

import graphQlSchemas from './graphql/schema/index'
import graphQlResolvers from './graphql/resolvers/index'
import auth from './middleware/auth'
const app = express()

app.use(bodyParser.json())
app.use(auth) // Authentication.
app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchemas,
    rootValue: graphQlResolvers,
    graphiql: true
  })
)

connectDb
  .then(() => {
    console.info('✅ Connected to Database')
    app.listen(4000, () => {
      console.info('🚀 Server is up on port 4000!')
    })
  })
  .catch((error) => {
    console.error(error)
  })
