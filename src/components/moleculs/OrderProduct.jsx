import { Product1 } from "../../assets/images";
import { numberWithCommas } from "../../utils/Helper";
import { getDetailProduct, getMediaProduct } from "../../services/api";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { PlaceholderProduct } from "../../assets/images";

const OrderProduct = ({ productItems }) => {
  // console.log(productItems);
  const [photoUrl, setPhotoUrl] = useState(PlaceholderProduct);
  const [loading, setLoading] = useState(false);
  const [dataProductImages, setDataProductImages] = useState([]);

  useEffect(() => {
    if (productItems.length > 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const productIds = productItems.map((item) => item.product_id);
          const productPromises = productIds.map((id) => getDetailProduct(id));
          const products = await Promise.all(productPromises);
          setDataProductImages(products.map((res) => res.data.data.image));
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [productItems]);

  useEffect(() => {
    const fetchImage = async () => {
      if (
        dataProductImages &&
        dataProductImages.length > 0 &&
        dataProductImages[0]
      ) {
        try {
          const imageUrl = await getMediaProduct(dataProductImages[0]);
          setPhotoUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  });

  if (!productItems || productItems.length === 0) {
    return <div>Produk Tidak Ditemukan</div>;
  }

  if (!productItems || productItems.length === 0) {
    return <div>Produk Tidak Ditemukan</div>;
  }

  if (loading || !dataProductImages.length) {
    return (
      <div className="flex justify-center items-center h-60">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow-lg flex flex-col mt-4 p-4 rounded-lg w-full gap-6">
        {productItems.map((item, index) => (
          <div key={index} className="w-full flex flex-row items-center gap-4">
            <img
              src={photoUrl}
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
