import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "video.js/dist/video-js.min.css";
import videojs from "video.js";
require("@silvermine/videojs-quality-selector")(videojs);

const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    // fill: true,
    fluid: true,
    preload: "auto",
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
      ...options,
      controls,
      autoplay,
      sources: src,
    });

    /**
     * Add handle event
     **/

    vjsPlayer.on("seeking", function () {
      console.log("seeking");
    });

    setPlayer(vjsPlayer);

    return () => vjsPlayer.dispose();
    // return () => {
    //   if (player !== null) {
    //     player.dispose();
    //   }
    // };
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.src(src);
    }
  }, [src]);

  return videoRef;
};

const VideoPlayer = ({ src, controls, autoplay }) => {
  const playerRef = usePlayer({ src, controls, autoplay });

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js" />
    </div>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.array,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  controls: true,
  autoplay: false,
};

export default VideoPlayer;
