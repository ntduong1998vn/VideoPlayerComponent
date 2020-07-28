import React from "react";
import VideoPlayer from "./components/VideoJS";

const sources = [
  {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm",
    label: "360P",
  },
  {
    src: "http://media.w3.org/2010/05/video/movie_300.webm",
    type: "video/webm",
    label: "720P",
  },
  {
    src: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
    type: "video/youtube",
    label: "480P",
    selected: true,
  },
];

function WatchMovie() {
  return (
    <div>
      <VideoPlayer src={sources} />
    </div>
  );
}

export default WatchMovie;
