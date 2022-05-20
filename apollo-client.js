// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_STEPZEN_URI,
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_APIKEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
