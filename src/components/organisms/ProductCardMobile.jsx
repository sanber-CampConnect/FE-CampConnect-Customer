import React from "react";
import { useNavigate } from "react-router-dom";
import { OutlineButton, PrimaryButton } from "../atoms/Buttons";
import { numberWithCommas } from "../../utils/Helper";

const ProductCardMobile = ({ product }) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/catalogue/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={product.image}
        alt={product.product_name}
        className="w-full h-auto rounded-[8px]"
      />
      <div className="justify-start w-full my-4">
        <h3 className="text-[#5D5A88] font-medium text-[17px] mb-2">
          {product.product_name}
        </h3>
        <div className="flex flex-row justify-between">
          <p className="text-[#FF432A] text-[17px] font-semibold">
            Rp. {numberWithCommas(product.price)}
          </p>
          <div className="flex flex-row gap-2">
            <p className="text-neutral">Stok:</p>
            <p>{numberWithCommas(product.stock)}</p>
          </div>
        </div>
      </div>
      <div className="items-center w-full">
        <PrimaryButton
          text="Detail Produk"
          className="w-full rounded-[24px] py-3"
          onClick={handleDetailClick}
        />
      </div>
      <hr className="w-full border-t-2 border-gray-100 opacity-20 my-8 rounded-full" />
    </div>
  );
};

export default ProductCardMobile;
