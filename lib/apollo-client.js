import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: process.env.NEXT_PRIVATE_API_ENDPOINT
    ? `${process.env.NEXT_PRIVATE_API_ENDPOINT}`
    : "https://api-us-east-1.graphcms.com/v2/cl3vq9x99fsia01z181q96kqc/master",
});
const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
  headers: {
    authorization: `Bearer ${process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN}`,
  },
});
