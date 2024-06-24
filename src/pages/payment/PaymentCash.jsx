import { PrimaryButton } from "../../components/atoms/Buttons";
import { CiPhone } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductOrder } from "../../services/api";
import { Spin } from "antd";
import { formatDate, formatTime, numberWithCommas } from "../../utils/Helper";

const PaymentCash = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = () => {
    setLoading(true);
    getProductOrder(id)
      .then((res) => {
        setDataOrder(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col xl:items-center ">
        <div className="flex items-center text-center justify-center">
          <h3 className="font-medium text-lg">Pembayaran</h3>
        </div>

        <div className="flex items-center justify-between w-10/12 xl:w-3/5 pr-4 xl:pr-72">
          <h3 className="font-medium text-lg pt-10">Total Nominal</h3>
        </div>
        <div className="w-full h-20 bg-[#F6F6F6] mt-10 mb-10 flex items-center justify-between px-4 rounded-md xl:w-3/5">
          <h1 className="text-[36px] font-bold text-[#909090]">
            Rp. {numberWithCommas(parseInt(dataOrder.transaction_total_price))}
          </h1>
        </div>
        <div className="flex items-center justify-between w-10/12 xl:w-3/5 pr-4 xl:pr-72">
          <h3 className="font-medium text-lg">Tenggat Pembayaran</h3>
        </div>
        <div className="w-full h-20 bg-[#F6F6F6] mt-4 mb-10 flex items-center justify-between px-4 rounded-md xl:w-3/5">
          <h1 className="text-lg font-semibold">
            {formatDate(dataOrder.payment_due)} ,{" "}
            {formatTime(dataOrder.payment_due)}
          </h1>
        </div>
        <div className="flex items-center justify-between w-10/12 xl:w-3/5 pr-4 xl:pr-72">
          <h3 className="font-medium text-lg">Alamat Outlet</h3>
        </div>
        <div className="w-full h-28 bg-[#F6F6F6] mt-4 mb-10 flex-col items-center px-4 rounded-md xl:w-3/5">
          <div className="flex items-center mt-4">
            <CiPhone className="text-primary" />
            <p className="text-md ml-10 font-medium">(+62) 822 - 2803 - 4763</p>
          </div>
          <div className="flex items-center mt-2 xl:mt-4">
            <FaMapMarkerAlt className="text-primary mt-5 w-40 -ml-5 xl:-ml-[70px] " />
            <p className="text-md ml-4 font-medium text-justify xl:-ml-9 xl:mt-4">
              Jl. Joyo Suko III No.5, Merjosari, Kec. Lowokwaru, Kota Malang,
              Jawa Timur 65144, Malang 65144
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 my-8 xl:w-3/5">
          <PrimaryButton
            text="Hubungi Admin"
            className="w-full"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=6282228034763&text&type=phone_number&app_absent=0",
                "_blank"
              )
            }
          />
        </div>
      </div>
    </>
  );
};

export default PaymentCash;
