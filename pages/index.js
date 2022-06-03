import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Videos from "../components/videos";

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
  const accountData = await client.query({
    query: gql`
      query MyQuery($id: ID) {
        account(where: { id: $id }) {
          username
          avatar {
            url
          }
        }
      }
    `,
    variables: {
      id: "cl3w2vl8tpoaa0bkb5u8l52av",
    },
  });
  const account = accountData.data.account;

  const videos = data.data.videos;
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  return {
    props: {
      videos,
      randomVideo,
      account,
    },
  };
}

export default function Home({ videos, randomVideo, account }) {
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
        <div className={styles.logoDivLeft}>
          <h1 className={styles.logoTitle}>Getflix</h1>
        </div>
        <div className={styles.logoDivRight}>
          <div style={{ marginTop: "1rem" }}>
            <p className={styles.menuText}>{account?.username}</p>
            <Image
              src={account?.avatar.url}
              height={50}
              width={50}
              alt={account?.username}
              style={{ borderRadius: "50%" }}
            />
            <p className={styles.menuText}>Log Out</p>
            <p className={styles.menuText}>Contact</p>
          </div>
        </div>
        <Videos videos={videos} randomVideo={randomVideo} />
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
