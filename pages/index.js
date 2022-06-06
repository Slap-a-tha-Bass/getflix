import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import Videos from "../components/videos";
import Loader from "../components/loader";

export default function Home() {
  const { loading, error, data } = useQuery(GET_VIDEOS_AND_ACCOUNT_INFO);
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loader />;

  const randomVideo =
    data.videos[Math.floor(Math.random() * data.videos.length)];

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
          <div style={{ marginTop: "1rem", display:"flex", alignItems:"flex-start" }}>
            <Link href={`/account/${data.account.id}`}>
              <p className={styles.menuText}>Welcome, {data.account.username}</p>
            </Link>
            <Image
              src={data.account.avatar.url}
              height={50}
              width={50}
              alt={data.account.username}
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
        <Videos videos={data.videos} randomVideo={randomVideo} />
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
const GET_VIDEOS_AND_ACCOUNT_INFO = gql`
  query PageVideos {
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
    account(where: { id: "cl3w2vl8tpoaa0bkb5u8l52av" }) {
      id
      username
      avatar {
        url
      }
    }
  }
`;
