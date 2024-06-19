import { truncateDescription } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { PlaceholderProduct } from "../../assets/images/index";
import { getMediaProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { TextButton } from "./Buttons";

const PopularProduct = ({ product }) => {
  const [photoProduct, setPhotoProduct] = useState(null);

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
    <div className="rounded-3xl border border-primary text-center m-4 xl:w-48 w-44 h-52 overflow-hidden relative flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={photoProduct || PlaceholderProduct}
          alt={product.name}
          className="object-cover w-full h-[10rem]"
        />
      </div>
      <div className="p-3 font-normal text-md h-20 flex items-center justify-center">
        {product.name}
      </div>
    </div>
  );
};

const ReviewUser = ({ review }) => {
  return (
    <div className="border border-[#D4D2E3] shadow text-black rounded-3xl p-4 xl:p-6 text-justify h-[150px] w-44 xl:w-72 xl:h-44 justify-center m-4 overflow-hidden">
      <div className="flex items-center mb-4">
        <img
          src={review.image}
          alt={review.name}
          className="rounded-full w-8 h-8 xl:w-12 xl:h-12 object-cover"
        />
        <div className="ml-4">
          <div className="font-bold text-sm xl:text-md text-[#5D5A88]">
            {review.name}
          </div>
          <div className="text-sm text-neutral">{review.title}</div>
        </div>
      </div>
      <div className="text-sm text-neutral line-clamp-4">{review.text}</div>
    </div>
  );
};

const ProductCard = ({ product }) => {
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
    <div className="rounded-lg border border-[#F2EDED] shadow-md p-6 w-11/12 h-[520px] max-h-[520px] flex flex-col">
      <div className="w-full flex-grow">
        <img
          src={photoProduct || PlaceholderProduct}
          alt={product.name}
          className="object-cover rounded-lg w-full h-72"
        />
        <div className="mt-4">
          <h3 className="font-medium text-lg text-[#5D5A88]">{product.name}</h3>
          <p className="text-[#9795B5] text-base mt-2 leading-6 text-justify">
            {truncateDescription(product.description)}
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <TextButton
          text="Detail Produk"
          className="w-full rounded-[24px] py-3"
          onClick={handleDetailClick}
        />
      </div>
    </div>
  );
};

export { PopularProduct, ReviewUser, ProductCard };
