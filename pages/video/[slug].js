import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useState } from "react";

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PRIVATE_API_ENDPOINT}`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN}`,
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
    uri: `${process.env.NEXT_PRIVATE_API_ENDPOINT}`,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${process.env.NEXT_PRIVATE_GRAPH_CMS_TOKEN}`,
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
  const [watching, setWatching] = useState(false);
  return (
    <div className={styles.videoPageLayout}>
      {!watching && (
        <div className={styles.grid}>
          <div style={{width:"80vw", height:"40vh", position: "relative"}}>
            <div style={{zIndex:"1", position: "absolute", top:"50%"}}>

            <h1>{video.title}</h1>
            <p>{video.description}</p>
            </div>
            <Image
              style={{ borderRadius: "10px" }}
              layout="fill"
              src={video.thumbnail.url}
              alt={video.title}
              priority
            />
          </div>
        </div>
      )}
      <div>
        {!watching && (
          <div style={{fontSize:"2rem", color: "#002a36"}}>
            <Link href="/">&larr;</Link>
            <button
              className={styles.playButton}
              onClick={() => setWatching(!watching)}
            >
              Play
            </button>
          </div>
        )}
        {watching && (
          <button onClick={() => setWatching(!watching)}>&larr;</button>
        )}
        {watching && (
          <video width="100%" controls>
            <source src={video.mp4.url} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
