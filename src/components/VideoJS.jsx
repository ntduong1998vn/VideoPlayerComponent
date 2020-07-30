import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "video.js/dist/video-js.min.css";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";
import "videojs-contrib-ads/dist/videojs.ads.css";
import "./custom.css";
import videojs from "video.js";
require("videojs-youtube/dist/Youtube");
require("videojs-contrib-ads/dist/videojs.ads.min.js");
require("@silvermine/videojs-quality-selector")(videojs);

const options = {
  // fill: true,
  // fluid: true,
  preload: "auto",
  html5: {
    hls: {
      enableLowInitialPlaylist: true,
      smoothQualityChange: true,
      overrideNative: true,
    },
  },
  width: 640,
  height: 480,
  techOrder: ["youtube", "html5"],
  controlBar: {
    children: [
      "playToggle",
      "volumePanel",
      "currentTimeDisplay",
      "progressControl",
      "DurationDisplay",
      "playbackRateMenuButton",
      "qualitySelector",
      "fullscreenToggle",
    ],
  },
  playbackRates: [0.5, 1, 1.5, 2],
};

const usePlayer = ({ src, controls, autoplay }) => {
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
    // vjsPlayer.on("seeking", function () {
    //   console.log("seeking");
    // });
    handleAds(vjsPlayer);
    vjsPlayer.on("adtimeupdate", function () {
      var player = this;
      console.log(player.ads.skipLinearAdMode());
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

  function handleAds(player) {
    player.ads({
      timeout: 3000,
    }); // initialize videojs-contrib-ads
    // request ads whenever there's new video content
    player.on("contentchanged", function () {
      // in a real plugin, you might fetch new ad inventory here
      player.trigger("adsready");
    });

    player.on("readyforpreroll", function () {
      player.ads.startLinearAdMode();
      // play your linear ad content
      player.src({
        src: "http://techslides.com/demos/sample-videos/small.webm",
        type: "video/webm",
      });

      // send event when ad is playing to remove loading spinner
      player.one("adplaying", function () {
        player.trigger("ads-ad-started");
      });

      // resume content when all your linear ads have finished
      player.one("adended", function () {
        player.ads.endLinearAdMode();
      });
    });

    // in a real plugin, you might fetch ad inventory here
    player.trigger("adsready");
  }

  return videoRef;
};

const VideoPlayer = ({ src, controls, autoplay }) => {
  const playerRef = usePlayer({ src, controls, autoplay });

  return (
    <div data-vjs-player>
      <video ref={playerRef} className="video-js vjs-big-play-centered" />
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
