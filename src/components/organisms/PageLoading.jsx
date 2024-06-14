import { Spin } from "antd";

export default function PageLoading() {
  return (
    <div className="w-full h-full flex justify-center items-center top-40">
      <Spin size="large" />
    </div>
  );
}
