import { useState } from "react";
import { BackButton } from "../../components/atoms/Buttons";
import { QRIS, Cash } from "../../assets/images";
import { Radio } from "antd";
import { PrimaryButton } from "../../components/atoms/Buttons";

const Payment = () => {
  const [selectedValue, setSelectedValue] = useState(1);

  const handleRadioChange = (e) => {
    setSelectedValue(e.target.value);
    console.log("Selected payment method:", e.target.value);
  };

  return (
    <>
      <div className="flex flex-col xl:items-center">
        <div className="flex items-center justify-between w-10/12 xl:w-3/5 pr-4 xl:pr-72">
          <BackButton />
          <h3 className="font-medium text-lg">Metode Pembayaran</h3>
        </div>
        <div className="flex flex-col gap-2 my-8 xl:w-2/5">
          <div className="bg-[#F6F6F6] w-full rounded-lg flex flex-row p-4 items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <img src={QRIS} alt="QRIS" className="rounded-md" />
              <p className="font-medium">QRIS</p>
            </div>
            <Radio
              value={1}
              checked={selectedValue === 1}
              onChange={handleRadioChange}
              className="custom-radio"
            />
          </div>
          <div className="bg-[#F6F6F6] w-full rounded-lg flex flex-row p-4 items-center justify-between">
            <div className="flex flex-row gap-2 items-center">
              <img src={Cash} alt="Tunai" className="rounded-md" />
              <p className="font-medium">Tunai</p>
            </div>
            <Radio
              value={2}
              checked={selectedValue === 2}
              onChange={handleRadioChange}
              className="custom-radio"
            />
          </div>
        </div>
        <PrimaryButton text="Terapkan" className="w-full xl:w-2/5" />
      </div>
    </>
  );
};

export default Payment;
