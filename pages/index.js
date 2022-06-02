import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PRIVATE_API_ENDPOINT,
    cache: new InMemoryCache(),
    headers: {
      "authorization": process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN,
    },
  });
  const data = await client.query({
    query: gql`
      query AllVideos {
        videos {
          id
          title
          description
          seen
          tags
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

  const videos = data.data.videos;

  return {
    props: {
      videos,
    },
  };
}

export default function Home( { videos } ) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Getflix Trailers</title>
        <meta
          name="description"
          content="Video trailer content for movies that families love to watch."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          {videos.map((video) => {
            return (
              <div className={styles.card} key={video.id}>
                <h1>{video.title}</h1>
                <p>{video.description}</p>
                <p>{video.tags}</p>
                <p>{video.seen}</p>
                <Image
                  src={video.thumbnail.url}
                  width={300}
                  height={200}
                  alt={video.title}
                />
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
