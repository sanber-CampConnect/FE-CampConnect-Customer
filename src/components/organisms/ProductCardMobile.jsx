import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../atoms/Buttons";
import { numberWithCommas } from "../../utils/Helper";
import { useEffect, useState } from "react";
import { PlaceholderProduct } from "../../assets/images";
import { getMediaProduct } from "../../services/api";

const ProductCardMobile = ({ product }) => {
  const [photoProduct, setPhotoProduct] = useState(null);

  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/catalogue/${product.id}`, { state: { product } });
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (product && product.image && product.image.trim() !== "") {
        try {
          const imageUrl = await getMediaProduct(product.image);
          if (imageUrl) {
            setPhotoProduct(imageUrl);
          } else {
            setPhotoProduct(PlaceholderProduct);
          }
        } catch (error) {
          console.error(error);
          setPhotoProduct(PlaceholderProduct);
        }
      }
    };

    fetchImage();
  }, [product]);

  return (
    <div className="flex flex-col items-center">
      <img
        src={photoProduct || PlaceholderProduct}
        alt={product.name}
        className="w-full h-auto rounded-[8px]"
      />
      <div className="justify-start w-full my-4">
        <h3 className="text-[#5D5A88] font-medium text-[17px] mb-2">
          {product.name}
        </h3>
        <div className="flex flex-row justify-between">
          <p className="text-[#FF432A] text-[17px] font-semibold">
            Rp. {numberWithCommas(parseInt(product.price))}
          </p>
        </div>
      </div>
      <div className="items-center w-full">
        <PrimaryButton
          text="Detail Produk"
          className="w-full rounded-[24px] py-3"
          onClick={handleDetailClick}
        />
      </div>
      <hr className="w-full border-t-2 border-gray-100 opacity-20 my-8 rounded-full -z-50" />
    </div>
  );
};

export default ProductCardMobile;
