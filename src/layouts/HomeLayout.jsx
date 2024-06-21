import { useState, useEffect } from "react";
import Navbar from "../components/organisms/Navbar";

const HomeLayout = ({ children }) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          zIndex: 3,
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
