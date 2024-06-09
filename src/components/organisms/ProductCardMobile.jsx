import { OutlineButton } from "../atoms/Buttons";
import tendaXL from "../../assets/images/tenda-exl-chanodug.png";
import { numberWithCommas } from "../../utils/Helper";

const ProductCardMobile = ({ image, product_name, price, stock }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src={image} alt={product_name} className="w-full h-auto" />
        <div className="justify-start w-full my-4">
          <h3 className="text-[#5D5A88] font-medium text-[17px] mb-2">
            {product_name}
          </h3>
          <div className="flex flex-row justify-between">
            <p className="text-[#FF432A] text-[17px] font-semibold">
              Rp. {numberWithCommas(price)}
            </p>
            <div className="flex flex-row gap-2">
              <p className="text-neutral">Stok:</p>
              <p>{numberWithCommas(stock)}</p>
            </div>
          </div>
        </div>
        <OutlineButton text="Detail Produk" className="border-primary w-full" />
        <hr className="w-full border-t-2 border-gray-100 opacity-20 my-8 rounded-full" />
      </div>
    </>
  );
};

export default ProductCardMobile;
