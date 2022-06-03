import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "./card";

export default function Videos({ videos, randomVideo }) {
  const filteredVideos = (videos, genre) =>
    videos?.filter((video) => video.tags.includes(genre));
  const recommendedVideos = (videos) => {
    return videos?.filter(
      (video) => video.seen === false || video.seen === null
    );
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <a href={`/video/${randomVideo?.slug}`} className={styles.banner}>
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
          {filteredVideos(videos, "family")?.map((video) => {
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
          {filteredVideos(videos, "comedy")?.map((video) => {
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
          {filteredVideos(videos, "thriller")?.map((video) => {
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
          {filteredVideos(videos, "adventure")?.map((video) => {
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
          {filteredVideos(videos, "suspense")?.map((video) => {
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
          {filteredVideos(videos, "classic")?.map((video) => {
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
          {filteredVideos(videos, "drama")?.map((video) => {
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
          {filteredVideos(videos, "superhero")?.map((video) => {
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
    </div>
  );
}
