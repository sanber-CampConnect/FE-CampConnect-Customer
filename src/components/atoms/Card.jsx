import { truncateDescription } from "../../utils/Helper";
import { Link } from "react-router-dom";

const PopularProduct = ({ product }) => {
  return (
    <div className="rounded-3xl border border-primary text-center m-4 xl:w-48 w-44 h-52 overflow-hidden relative flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.product_name}
          className="object-cover w-full h-[10rem]"
        />
      </div>
      <div className="p-3 font-normal text-md h-20 flex items-center justify-center">
        {product.product_name}
      </div>
    </div>
  );
};
const ReviewUser = ({ review }) => {
  return (
    <div className="border border-secondary text-black rounded-3xl p-6 text-justify justify-center m-4 w-44 h-44 overflow-hidden relative flex flex-col ">
      <div className="rounded-full w-12 h-12 mb-4 flex xl:w-24">
        <img
          src={review.image}
          alt={review.name}
          className="rounded-full w-full h-full object-cover -ml-2 "
        />
        <div className="flex-col ml-2 w-full">
          <div className="text-base font-bold text-[#5D5A88] w-96">
            {review.name}
          </div>
          <div className="text-sm text-neutral ">{review.title}</div>
        </div>
      </div>
      <div className="mt- text-sm text-[#5D5A88]">{review.subtext}</div>
      <div className="mt-2 text-s text-neutral">{review.text}</div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="rounded-lg border border-[#F2EDED] shadow-md p-6 m-4 w-94 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.product_name}
        className="w-full h-[277px] object-cover rounded-lg"
      />
      <div className="mt-4 flex-grow">
        <h3 className="font-medium text-lg text-[#5D5A88]">
          {product.product_name}
        </h3>
        <p className="text-[#9795B5] text-base mt-2 leading-6 text-justify">
          {truncateDescription(product.description)}
        </p>
      </div>
      <div className="mt-4">
        <Link
          to={{
            pathname: `/catalogue/${product.id}`,
            state: { product },
          }}
          className="text-[#9795B5] text-base font-semibold"
        >
          Learn more →
        </Link>
      </div>
    </div>
  );
};

export { PopularProduct, ReviewUser, ProductCard };
