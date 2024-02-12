import { useState, useEffect } from "react";

import { ScreenType } from "@models/DataModels";
import { breakpoints } from "@styles/Breakpoints";

const getScreenSize = (): ScreenType => {
  if (window.screen.width < breakpoints.tablet) return "mobile";
  if (
    window.screen.width > breakpoints.tablet &&
    window.screen.width < breakpoints.desktop
  )
    return "tablet";
  return "desktop";
};

const useScreenSize = (): ScreenType => {
  const [screenType, setScreenType] = useState<ScreenType>(() =>
    getScreenSize()
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      const screenSize = getScreenSize();
      setScreenType(screenSize);
    });
    return () =>
      window.removeEventListener("resize", () => {
        const screenSize = getScreenSize();
        setScreenType(screenSize);
      });
  }, []);

  return screenType;
};

export default useScreenSize;
