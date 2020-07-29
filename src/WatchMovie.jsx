import React, { useState } from "react";
import VideoPlayer from "./components/VideoJS";

const initSources = [
  {
    src: "http://techslides.com/demos/sample-videos/small.webm",
    type: "video/webm",
    label: "360P",
  },
  {
    src: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
    type: "video/youtube",
    label: "480P",
    selected: true,
  },
  {
    src: "http://media.w3.org/2010/05/video/movie_300.webm",
    type: "video/webm",
    label: "720P",
  },
];

function WatchMovie() {
  const [sources, setSources] = useState(initSources);

  const handleOceans = () => {
    setSources([
      {
        src: "http://media.w3.org/2010/05/video/movie_300.webm",
        type: "video/webm",
        label: "720P",
      },
      {
        src: "http://media.w3.org/2010/05/video/movie_300.webm",
        type: "video/webm",
        label: "360P",
      },
    ]);
  };

  const handleYoutube = () => {
    setSources([
      {
        src: "https://www.youtube.com/watch?v=L0MK7qz13bU",
        type: "video/youtube",
      },
    ]);
  };

  return (
    <div>
      <VideoPlayer src={sources} />
      <button className="oceans" onClick={handleOceans}>
        Oceans
      </button>
      <button className="youtube" onClick={handleYoutube}>
        YouTube
      </button>
    </div>
  );
}

export default WatchMovie;
