import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: process.env.NEXT_PRIVATE_API_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      authorization: process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN,
    },
  });
  const data = await client.query({
    query: gql`
      query OneVideo($slug: String) {
        video(where: { slug: $slug }) {
          id
          title
          description
          seen
          slug
          thumbnail {
            url
          }
          mp4 {
            url
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const video = data.data.video;

  return {
    props: {
      video,
    },
  };
}
export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PRIVATE_API_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      authorization: process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN,
    },
  });
  const data = await client.query({
    query: gql`
      query PageVideos {
        videos {
          id
          title
          description
          seen
          slug
          thumbnail {
            url
          }
          mp4 {
            url
          }
        }
      }
    `,
  });
  const paths = data.data.videos.map((video) => {
    return {
      params: {
        slug: video.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export default function Video({ video }) {
  return (
    <div className={styles.main}>
      <div>
        <h1>{video.title}</h1>
        <p>{video.description}</p>
        <Image src={video.thumbnail.url} height={300} width={400}/>
      </div>
    </div>
  );
}
