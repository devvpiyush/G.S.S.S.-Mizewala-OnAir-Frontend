import { useEffect, useRef, useState } from "react";
import api from "@utils/api.js";

import PlayIcon from "@icons/Play.svg";
import MusicIcon from "@icons/Headphones.svg";

function Music() {
  const audioRef = useRef(null);
  const [Music_List, SET_Music_List] = useState([]);
  const [CurrentMusicUrl, SetCurrentMusicUrl] = useState(null);
  const [error, setError] = useState(null);

  function handlePlay(url) {
    const audio = audioRef.current;
    if (!audio) return;

    // toggle play/pause if same track
    if (audio.src === url && !audio.paused) {
      audio.pause();
      return;
    }

    audio.pause();
    audio.src = url;
    audio.load();

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => console.log("Play failed:", err));
    }
  }

  // play automatically when url changes
  useEffect(() => {
    if (audioRef.current && CurrentMusicUrl) {
      audioRef.current.src = CurrentMusicUrl; // set the source
      audioRef.current.load(); // refresh source
      audioRef.current.play();
    }
  }, [CurrentMusicUrl]);

  useEffect(() => {
    const handleApi = async () => {
      try {
        const response = await api("GET", "t/music/get/all");
        SET_Music_List(response.data || []);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch music:", err);
      }
    };
    handleApi();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {Music_List.map((Music) => (
        <div
          className="w-full px-4 pr-8 py-2 flex flex-row items-center gap-4 rounded-sm bg-white"
          key={Music?._id}
        >
          <img src={MusicIcon} alt="Music_Icon" />

          <div className="w-full flex flex-col">
            <p className="font-semibold">{Music?.title}</p>
            <p className="font-medium">by {Music?.author}</p>
          </div>

          <img
            src={PlayIcon}
            alt="Play_Icon"
            className="cursor-pointer"
            width={35}
            height={35}
            onClick={() => handlePlay(Music?.audioUrl)}
          />
        </div>
      ))}

      {/* ONE audio player */}
      <audio ref={audioRef} hidden />
    </div>
  );
}

export default Music;
