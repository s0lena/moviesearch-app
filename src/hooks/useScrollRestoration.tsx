import { useEffect } from "react";

// Custom hook to handle scroll restoration
export const useScrollRestoration = () => {
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");

    // Restore scroll position after full render
    const restoreScrollPosition = () => {
      if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }
    };

    // Use requestAnimationFrame to ensure it's run after render
    requestAnimationFrame(restoreScrollPosition);

    return () => {
      // Save scroll position before unmounting
      sessionStorage.setItem("scrollPosition", window.scrollY.toString());
    };
  }, []);
};
