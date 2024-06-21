import { Product1 } from "../../assets/images";
import { numberWithCommas } from "../../utils/Helper";

const OrderProduct = ({ productItems }) => {
  //   console.log(productItems);
  return (
    <>
      <div className="bg-white shadow-lg flex flex-col mt-4 p-4 rounded-lg w-full gap-6">
        {productItems.map((item, index) => (
          <div key={index} className="w-full flex flex-row items-center gap-4">
            <img
              src={Product1}
              alt={item.product_name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col">
                <div className=" flex flex-row justify-between">
                  <h2 className="text-md font-medium">{item.product_name}</h2>
                  <p className="text-base w-fit">
                    qty: {item.orderItem_rent_duration}
                  </p>
                </div>
                <p className="text-base">Jenis: {item.variant_name}</p>
              </div>
              <div className="flex flex-row items-center justify-between text-base text-neutral">
                <p className="text-md text-[#FF6347] font-medium">
                  Rp. {numberWithCommas(item.orderItem_subtotal)}
                </p>
                <p className="">/{item.orderItem_rent_duration} hari</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export { OrderProduct };
