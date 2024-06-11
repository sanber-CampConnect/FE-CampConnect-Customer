import { useState, useEffect } from "react";
import Navbar from "../components/organisms/Navbar";

const HomeLayout = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWindowSize({
        width: window.innerWidth,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  // Style object for content div
  const contentStyle = {
    marginLeft: windowSize.width >= 1024 ? "100px" : "20px",
    marginRight: windowSize.width >= 1024 ? "100px" : "20px",
    marginTop: "90px",
    minHeight: "100vh",
  };

  return (
    <>
      <div
        className="top-navbar"
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Navbar />
      </div>
      <div className="content" style={contentStyle}>
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
