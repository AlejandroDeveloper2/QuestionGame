import { useEffect, useState } from "react";

const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audio, playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  const replayAudio = () => {
    audio.currentTime = 0;
  };

  const stopAudio = () => {
    setPlaying(false);
  };
  return { playing, toggle, stopAudio, replayAudio };
};

export default useAudio;
