import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import Videos from "../components/videos";
import Loader from "../components/loader";

const GET_VIDEOS_AND_GET_ACCOUNT = gql`
  query getAccount($accountId: ID!) {
    account(where: { id: $accountId }) {
      id
      username
      avatar {
        url
      }
    }
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
  }
`;
export default function Home({ accountId }) {
  const { loading, error, data } = useQuery(GET_VIDEOS_AND_GET_ACCOUNT, {
    variables: { accountId: "cl3w2vl8tpoaa0bkb5u8l52av" },
  });

  const randomVideo =
    data?.videos[Math.floor(Math.random() * data.videos.length)];
  setTimeout(() => {
    return loading;
  }, 1000);
  if (loading) return <Loader />;
  if (error) return `Error, ${error.message}`;
  console.log(data?.account);
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
            <p className={styles.menuText}>{data?.account.username}</p>
            <Image
              src={data?.account.avatar.url}
              height={50}
              width={50}
              alt={data?.account.username}
              style={{ borderRadius: "50%" }}
            />
            <p className={styles.menuText}>Log Out</p>
            <p className={styles.menuText}>Contact</p>
          </div>
        </div>
        <Videos videos={data?.videos} randomVideo={randomVideo} />
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
