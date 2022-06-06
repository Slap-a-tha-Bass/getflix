import { ApolloClient, gql, useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import { useState, useEffect } from "react";
import { client } from "../../lib/apollo-client";
import Loader from "../../components/loader";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function Video({ video }) {
  const [watching, setWatching] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (video) {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className={styles.videoPageLayout}>
      {!watching && (
        <div
        className={styles.playButton}
        style={{ fontSize: "2rem" }}
        >
          <Link href="/">&larr;</Link>
        </div>
      )}
      {!watching && (
        <div className={styles.grid}>
          <div style={{ width: "50vw", height: "40vh", position: "relative" }}>
            <div style={{ zIndex: "1", position: "absolute", top: "50%" }}>
              <h1 className={styles.videoText}>{video.title}</h1>
              <p className={styles.videoText}>{video.description}</p>
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
          <div style={{ fontSize: "2rem", color: "#002a36" }}>
            <button
              className={styles.playButton}
              onClick={() => setWatching(!watching)}
            >
              <BsFillPlayCircleFill />
            </button>
          </div>
        )}
        {watching && (
          <video width="100%" height="100%" controls>
            <source src={video.mp4.url} type="video/mp4" />
          </video>
        )}
      </div>
      {/* <button onClick={handleWatch}>
        Change Seen Status
      </button> */}
    </div>
  );
}
const CHANGE_SEEN = gql`
  mutation MyMutation($slug: String, $seen: Boolean) {
    updateVideo(data: { seen: $seen }, where: { slug: $slug }) {
      id
      seen
      title
    }
  }
`;
export async function getStaticProps({ params }) {
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
