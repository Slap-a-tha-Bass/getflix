import { gql, useQuery } from "@apollo/client";

const GET_VIDEOS = gql`
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
`;
export default function Test() {
  const { loading, error, data } = useQuery(GET_VIDEOS);
  if (error) return `Error! ${error.message}`;
  console.log(data);
  return (
    <div>
      {data?.videos.map((video) => {
        return <div key={video.id}>{video.title}</div>;
      })}
    </div>
  );
}
