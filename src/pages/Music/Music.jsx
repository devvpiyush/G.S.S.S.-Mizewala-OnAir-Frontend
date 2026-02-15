// External Modules
import { useEffect, useRef, useState } from "react";

// Local Modules
import api from "@utils/api.js";
import Categories from "./Categories";

// Assets
import PlayIcon from "@icons/Play.svg";
import PauseIcon from "@icons/Pause.svg";

function Music() {
  const audioRef = useRef(null);

  const [currentUrl, setCurrentUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const [ORIGINAL_MUSIC_LIST, SET_ORIGINAL_MUSIC_LIST] = useState([]);
  const [MUSIC_LIST, SET_MUSIC_LIST] = useState([]);
  const [CATEGORIES_LIST, UPDATE_CATEGORIES_LIST] = useState([]);
  const [SELECTED_CATEGORY, SET_SELECTED_CATEGORY] = useState("All");

  function handlePlay(url) {
    const audio = audioRef.current;
    if (!audio) return;

    // SAME TRACK → toggle play/pause (resume from same time)
    if (currentUrl === url) {
      if (audio.paused) audio.play();
      else audio.pause();
      return;
    }

    // NEW TRACK → load from start
    audio.pause();
    audio.src = url;
    setCurrentUrl(url);

    const playPromise = audio.play();
    if (playPromise) playPromise.catch(() => {});
  }

  function changeCategory(category) {
    SET_SELECTED_CATEGORY(category);
    if (category === "All") {
      SET_MUSIC_LIST(ORIGINAL_MUSIC_LIST);
    } else {
      SET_MUSIC_LIST(
        ORIGINAL_MUSIC_LIST.filter((music) => music.category === category),
      );
    }
  }

  // Listen to real playback state from browser
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await api("GET", "t/music/get/all");
        SET_ORIGINAL_MUSIC_LIST(response.data || []);
        SET_MUSIC_LIST(response.data || []);
        UPDATE_CATEGORIES_LIST([
          ...new Set(
            response.data
              .filter((item) => !CATEGORIES_LIST.includes(item.category))
              .map((item) => item.category),
          ),
        ]);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMusic();
  }, []);

  return (
    <>
      <Categories
        list={CATEGORIES_LIST}
        selected={SELECTED_CATEGORY}
        changeCategory={changeCategory}
      />
      <div className="flex flex-col gap-4">
        {error && <p className="text-red-500">{error}</p>}

        {MUSIC_LIST.map((music) => {
          const isCurrent = currentUrl === music.audioUrl;
          const showPause = isCurrent && isPlaying;

          return (
            <div
              key={music._id}
              className="w-full px-4 pr-8 py-2 flex items-center gap-4 rounded-sm bg-white"
            >
              {/* <img src={MusicIcon} alt="Music" /> */}

              <div className="w-full">
                <p
                  className="font-semibold tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {music.title}
                </p>
                <p
                  className="font-medium text-[#c0c0c0] tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  by {music.author}
                </p>
              </div>
              <img
                src={showPause ? PauseIcon : PlayIcon}
                alt="control"
                className="cursor-pointer"
                width={35}
                onClick={() => handlePlay(music.audioUrl)}
              />
            </div>
          );
        })}
        <audio ref={audioRef} hidden />
      </div>
    </>
  );
}

export default Music;
