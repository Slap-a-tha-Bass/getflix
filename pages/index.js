import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Card from "../components/card";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PRIVATE_API_ENDPOINT}`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN}`,
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
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  return {
    props: {
      videos,
      randomVideo,
    },
  };
}

export default function Home({ videos, randomVideo }) {
  const filteredVideos = (videos, genre) =>
    videos.filter((video) => video.tags.includes(genre));
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
        <div className={styles.logoDiv}>
          <h1 className={styles.logoTitle}>Getflix</h1>
        </div>
        <div className={styles.banner}>
          <h2 className={styles.bannerTitle}>{randomVideo?.title}</h2>
          <Image
            src={randomVideo?.thumbnail.url}
            layout="fill"
            alt=""
            priority
          />
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Family</h2>
          </div>
          {filteredVideos(videos, "family").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Comedy</h2>
          </div>
          {filteredVideos(videos, "comedy").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                key={video.id}
              />
            );
          })}
        </div>

        {/* <div className={styles.grid}>
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
        </div> */}
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
