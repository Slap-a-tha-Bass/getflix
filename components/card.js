import Image from "next/image";
import styles from "../styles/Home.module.css";
export default function Card({ thumbnail, title, slug }) {
  return (
    <a href={`/video/${slug}`} className={styles.card}>
      <Image
        src={thumbnail}
        width={300}
        height={185}
        alt={title}
        style={{ borderRadius: "10px" }}
      />
      <h2>{title}</h2>
    </a>
  );
}
