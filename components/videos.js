import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "./card";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function Videos({ videos, randomVideo }) {
  const [recommendedWidth, setRecommendedWidth] = useState(0);
  const [familyWidth, setFamilyWidth] = useState(0);
  const [comedyWidth, setComedyWidth] = useState(0);
  const [thrillerWidth, setThrillerWidth] = useState(0);
  const [adventureWidth, setAdventureWidth] = useState(0);
  const [suspenseWidth, setSuspenseWidth] = useState(0);
  const [classicWidth, setClassicWidth] = useState(0);
  const [dramaWidth, setDramaWidth] = useState(0);
  const [superheroWidth, setSuperheroWidth] = useState(0);

  const recommendedCarousel = useRef();
  const familyCarousel = useRef();
  const comedyCarousel = useRef();
  const thrillerCarousel = useRef();
  const adventureCarousel = useRef();
  const suspenseCarousel = useRef();
  const classicCarousel = useRef();
  const dramaCarousel = useRef();
  const superheroCarousel = useRef();

  useEffect(() => {
    setRecommendedWidth(
      recommendedCarousel.current.scrollWidth -
        recommendedCarousel.current.offsetWidth
    );
    setFamilyWidth(
      familyCarousel.current.scrollWidth - familyCarousel.current.offsetWidth
    );
    setComedyWidth(
      comedyCarousel.current.scrollWidth - comedyCarousel.current.offsetWidth
    );
      setThrillerWidth(
        thrillerCarousel.current.scrollWidth - thrillerCarousel.current.offsetWidth
      );
      setAdventureWidth(
        adventureCarousel.current.scrollWidth - adventureCarousel.current.offsetWidth
      );
      setSuspenseWidth(
        suspenseCarousel.current.scrollWidth - suspenseCarousel.current.offsetWidth
      );
        setClassicWidth(
          classicCarousel.current.scrollWidth - classicCarousel.current.offsetWidth
        );
        setDramaWidth(  
          dramaCarousel.current.scrollWidth - dramaCarousel.current.offsetWidth
        );
        setSuperheroWidth(
          superheroCarousel.current.scrollWidth - superheroCarousel.current.offsetWidth
        );
  }, []);

  const recommendedVideos = (videos) => {
    return videos.filter(
      (video) => video.seen === false || video.seen === null
    );
  };
  return (
    <div className={styles.container}>
      <div></div>
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

        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Recommended</h2>
          </div>
          <motion.div ref={recommendedCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -recommendedWidth }}
              className={styles.innerCarousel}
            >
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Family</h2>
          </div>
          <motion.div ref={familyCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -familyWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("family"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Comedy</h2>
          </div>
          <motion.div ref={comedyCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -comedyWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("comedy"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Thriller</h2>
          </div>
          <motion.div ref={thrillerCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -thrillerWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("thriller"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Adventure</h2>
          </div>
          <motion.div ref={adventureCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -adventureWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("adventure"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Suspense</h2>
          </div>
          <motion.div ref={suspenseCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -suspenseWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("suspense"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Classic</h2>
          </div>
          <motion.div ref={classicCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -classicWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("classic"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Drama</h2>
          </div>
          <motion.div ref={dramaCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -dramaWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("drama"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
        <div>
          <div style={{ width: "10%" }}>
            <h2 className={styles.genreTitle}>Superhero</h2>
          </div>
          <motion.div ref={superheroCarousel} className={styles.carousel}>
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -superheroWidth }}
              className={styles.innerCarousel}
            >
              {videos
                .filter((video) => video.tags?.includes("superhero"))
                .map((video) => {
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
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
