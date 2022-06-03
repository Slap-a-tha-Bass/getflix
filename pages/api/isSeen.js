import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default async (req, res) => {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PRIVATE_API_ENDPOINT}`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN}`,
    },
  });

  const data = await client.mutate({
    mutation: gql`
      mutation ChangeSeen($slug: String, $seen: Boolean) {
        updateVideo(data: { seen: $seen }, where: { slug: $slug }) {
          id
          seen
          title
        }
      }
    `,
    variables: {
      slug: req.body.slug,
      seen: req.body.seen,
    },
  });
  res.statusCode = 200;
  res.json({
    slug: req.body.slug,
    seen: req.body.seen,
  });
};
