import Navbar from "../components/organisms/Navbar";

const HomeLayout = ({ children }) => {
  return (
    <>
      <div
        className="top-navbar"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <Navbar />
      </div>
      <div
        className="content"
        style={{
          marginLeft: "20px",
          marginRight: "20px",
          marginTop: "90px",
          // marginBottom: "110px",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default HomeLayout;
