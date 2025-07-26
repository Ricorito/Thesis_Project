import { useEffect } from "react";
import AOS from "aos";

const AOSWrapper = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
      delay: 100,
    });

    const observer = new MutationObserver(() => {
      AOS.refreshHard();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
};

export default AOSWrapper;
