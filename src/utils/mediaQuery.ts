import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (width: number): boolean => {
  const [targetReached, setTargetReached] = useState<boolean>(false);

  const updateTarget = useCallback((e: MediaQueryListEvent) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(`(max-width: ${width}px)`);
    if (mediaQueryList.matches) {
      setTargetReached(true);
    }
    mediaQueryList.addListener(updateTarget);
    return () => {
      mediaQueryList.removeListener(updateTarget);
    };
  }, [width, updateTarget]);

  return targetReached;
};
