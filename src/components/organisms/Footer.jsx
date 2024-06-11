import { InstagramFilled, WhatsAppOutlined } from "@ant-design/icons";

const Footer = () => {
  const hoverStyle = {
    color: "#064F3B",
  };
  return (
    <footer className="flex flex-col xl:flex-row xl:justify-between text-center xl:text-left py-5 xl:py-16 xl:w-full xl:p-[24px]">
      <div className="text-md mb-4 text-[#9795B5] leading-8">
        <span className="xl:hidden">
          © 2024 Camp Connect <br />
          Hak cipta dilindungi.
        </span>
        <span className="hidden xl:flex">
          © 2024 Camp Connect | Hak cipta dilindungi.
        </span>
      </div>
      <div className="flex justify-center gap-4">
        <div className="flex items-center justify-center bg-[#F2F1FA] rounded-xl w-10 h-10">
          <a
            href="https://www.instagram.com/kade_outdoormalang/"
            style={{
              color: "#8D8BA7",
              backgroundColor: "#F2F1FA",
              borderRadius: "8px",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.color = hoverStyle.color)
            }
            onMouseOut={(e) => (e.currentTarget.style.color = "#8D8BA7")}
          >
            <InstagramFilled style={{ fontSize: "24px" }} />
          </a>
        </div>
        <div className="flex items-center justify-center bg-[#F2F1FA] rounded-xl w-10 h-10">
          <a href="https://wa.me/6282228034763" style={{ color: "#8D8BA7" }}>
            <WhatsAppOutlined
              style={{
                fontSize: "24px",
                backgroundColor: "#F2F1FA",
                borderRadius: "8px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.color = hoverStyle.color)
              }
              onMouseOut={(e) => (e.currentTarget.style.color = "#8D8BA7")}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
