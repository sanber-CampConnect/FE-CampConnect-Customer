import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Page404() {
  const navigate = useNavigate();
  const buttonStyle = {
    backgroundColor: "#064F3B",
    borderColor: "#064F3B",
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/")}
            style={buttonStyle}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
}
