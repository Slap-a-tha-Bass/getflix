import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql } from "@apollo/client";
import Videos from "../components/videos";
import Loader from "../components/loader";
import { client } from "../lib/apollo-client";


export default function Home({ videos, randomVideo, account }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (videos) {
      setLoading(false);
    }
  }, [videos]);
  if (loading) return <Loader />;
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
            <p className={styles.menuText}>{account.username}</p>
            <Image
              src={account.avatar.url}
              height={50}
              width={50}
              alt={account.username}
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

export async function getStaticProps() {
  const data = await client.query({
    query: gql`
      query AllVideos {
        videos {
          id
          title
          description
          seen
          slug
          tags
          thumbnail {
            url
          }
          mp4 {
            url
          }
        }
        account(where: { id: "cl3w2vl8tpoaa0bkb5u8l52av"}) {
          id
          username
          avatar {
            url
          }
        }
      }
    `,
  });

  const videos = data.data.videos;
  const account = data.data.account;
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];

  return {
    props: {
      videos,
      randomVideo,
      account,
    },
  };
}
