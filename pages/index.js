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
  const recommendedVideos = (videos) => {
    return videos.filter(video => video.seen === false || video.seen === null);
  }
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
            <p className={styles.menuText}>Account</p>
            <p className={styles.menuText}>Log Out</p>
            <p className={styles.menuText}>Contact</p>
          </div>
        </div>
        <a href={`/video/${randomVideo.slug}`} className={styles.banner}>
          <h2 className={styles.bannerTitle}>{randomVideo?.title}</h2>
          <Image
            src={randomVideo?.thumbnail.url}
            layout="fill"
            alt=""
            priority
          />
        </a>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Recommended</h2>
          </div>
          {recommendedVideos(videos)?.map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
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
                slug={video.slug}
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
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Thriller</h2>
          </div>
          {filteredVideos(videos, "thriller").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Adventure</h2>
          </div>
          {filteredVideos(videos, "adventure").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Suspense</h2>
          </div>
          {filteredVideos(videos, "suspense").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Classic</h2>
          </div>
          {filteredVideos(videos, "classic").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Drama</h2>
          </div>
          {filteredVideos(videos, "drama").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
            );
          })}
        </div>
        <div className={styles.grid}>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Superhero</h2>
          </div>
          {filteredVideos(videos, "superhero").map((video) => {
            return (
              <Card
                title={video.title}
                description={video.description}
                thumbnail={video.thumbnail.url}
                slug={video.slug}
                key={video.id}
              />
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
