import { useLocation } from "react-router-dom";
import { numberWithCommas } from "../../utils/Helper";
import { useState, useEffect } from "react";
import { Button, InputNumber, Spin } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { PrimaryButton } from "../../components/atoms/Buttons";
import { Footer } from "../../components/organisms/Footer";
import { getDetailProduct, getMediaProduct } from "../../services/api";
import { PlaceholderProduct } from "../../assets/images";
import { VariantSelector } from "../../components/atoms/Variant";

const DetailCatalogue = () => {
  const location = useLocation();
  const { product } = location.state;
  const [rentalDuration, setRentalDuration] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(PlaceholderProduct);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [variantStock, setVariantStock] = useState(null);

  // reset scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getDataDetailProduct();
  }, [product.id]);

  useEffect(() => {
    const fetchImage = async () => {
      if (data && data.image && data.image.trim() !== "") {
        try {
          const imageUrl = await getMediaProduct(data.image);
          setPhotoUrl(imageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();
  }, [data]);

  const getDataDetailProduct = () => {
    setLoading(true);
    getDetailProduct(product.id)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        if (res.data.data.variants && res.data.data.variants.length > 0) {
          const defaultVariant = res.data.data.variants[0];
          setSelectedVariant(defaultVariant);
          setVariantStock(defaultVariant.stock);
        }
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const incrementRentalDuration = () => {
    if (rentalDuration !== 7) {
      setRentalDuration(rentalDuration + 1);
    }
  };
  const incrementTotalQuantity = () => {
    if (totalQuantity < product.stock) {
      setTotalQuantity(totalQuantity + 1);
    }
  };
  const decrementRentalDuration = () => {
    if (rentalDuration !== 1) {
      setRentalDuration(rentalDuration - 1);
    }
  };
  const decrementTotalQuantity = () => {
    if (totalQuantity !== 1) {
      setTotalQuantity(totalQuantity - 1);
    }
  };

  const handleVariantSelect = (variant) => {
    setSelectedVariant(variant);
    setVariantStock(variant.stock);
  };

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center mx-4">
        <div className="flex flex-row text-md text-neutral justify-end gap-2 mb-4 xl:hidden">
          <p>Kategori:</p>
          <p>{data.category_name}</p>
        </div>
        <div className="xl:flex xl:flex-row xl:justify-start xl:gap-12">
          <div className="flex justify-center xl:justify-start xl:w-fit">
            <img
              className="rounded-xl xl:w-96 xl:h-fit"
              src={photoUrl}
              alt={data.name}
            />
          </div>
          <div className="flex flex-row xl:flex-col justify-between xl:justify-between gap-6 items-center xl:items-start my-6 xl:max-h-96">
            <div className="xl:flex xl:flex-col xl:gap-1">
              <h4 className="text-lg font-medium text-justify xl:text-2xl">
                {data.name}
              </h4>
              <p className="text-[#FF432A] font-semibold text-lg">
                Rp{numberWithCommas(parseInt(data.price))}
              </p>
              {/* <p className="hidden xl:flex xl:text-[#808080]">
                Stok: {product.stock}
              </p> */}
            </div>

            <div className="flex flex-col gap-2">
              <VariantSelector
                variants={data.variants}
                onVariantSelect={handleVariantSelect}
              />
              <p className="">Stok: {variantStock}</p>
            </div>

            {/* Button Durasi Sewa dan Jumlah Barang */}
            <div className="hidden xl:flex xl:flex-col xl:gap-4 xl:w-full">
              <div className="hidden xl:flex xl:flex-row xl:gap-8">
                <div className="rental-duration flex flex-col w-fit">
                  <p className="text-neutral text-md">Durasi Sewa</p>
                  <div className="flex flex-row my-3">
                    <Button
                      style={{
                        backgroundColor: "#064F3B",
                        borderColor: "#064F3B",
                        width: "25px",
                        borderRadius: "4px 0 0 4px",
                      }}
                      onClick={decrementRentalDuration}
                    >
                      <MinusOutlined
                        style={{ fontSize: "12px", color: "#fff" }}
                      />
                    </Button>
                    <InputNumber
                      readOnly
                      min={1}
                      max={7}
                      value={rentalDuration}
                      style={{
                        width: "40px",
                        borderRadius: "0px",
                      }}
                    />
                    <Button
                      style={{
                        backgroundColor: "#064F3B",
                        borderColor: "#064F3B",
                        width: "25px",
                        borderRadius: "0 4px 4px 0",
                      }}
                      onClick={incrementRentalDuration}
                    >
                      <PlusOutlined
                        style={{ color: "#fff", fontSize: "15px" }}
                      />
                    </Button>
                  </div>
                </div>
                <div className="total-quantity flex flex-col w-fit">
                  <p className="text-neutral text-md">Jumlah Barang</p>
                  <div className="flex flex-row my-3">
                    <Button
                      style={{
                        backgroundColor: "#064F3B",
                        borderColor: "#064F3B",
                        width: "25px",
                        borderRadius: "4px 0 0 4px",
                      }}
                      onClick={decrementTotalQuantity}
                    >
                      <MinusOutlined
                        style={{ fontSize: "12px", color: "#fff" }}
                      />
                    </Button>
                    <InputNumber
                      readOnly
                      min={1}
                      max={product.stock}
                      value={totalQuantity}
                      style={{
                        width: "40px",
                        borderRadius: "0px",
                      }}
                    />
                    <Button
                      style={{
                        backgroundColor: "#064F3B",
                        borderColor: "#064F3B",
                        width: "25px",
                        borderRadius: "0 4px 4px 0",
                      }}
                      onClick={incrementTotalQuantity}
                    >
                      <PlusOutlined
                        style={{ color: "#fff", fontSize: "15px" }}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <PrimaryButton
                text="Masukkan Keranjang"
                className="hidden xl:flex xl:w-full xl:p-4 xl:text-center"
              />
            </div>
          </div>
        </div>
        <div className="w-full text-primary text-md mb-4 xl:my-12">
          <div className="flex flex-row gap-1">
            <p className="mb-1 font-semibold">Deskripsi:</p>
            <i
              className="bi bi-chevron-down"
              style={{ fontWeight: "bold" }}
            ></i>
          </div>
          <hr></hr>
          <p className="text-justify leading-7 my-2 text-black">
            {data.description}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center mb-6 xl:hidden">
          <div className="rental-duration flex flex-col w-fit">
            <p className="text-neutral text-md">Durasi Sewa</p>
            <div className="flex flex-row my-3">
              <Button
                style={{
                  backgroundColor: "#064F3B",
                  borderColor: "#064F3B",
                  width: "25px",
                  borderRadius: "4px 0 0 4px",
                }}
                onClick={decrementRentalDuration}
              >
                <MinusOutlined style={{ fontSize: "12px", color: "#fff" }} />
              </Button>
              <InputNumber
                readOnly
                min={1}
                max={7}
                value={rentalDuration}
                style={{
                  width: "40px",
                  borderRadius: "0px",
                }}
              />
              <Button
                style={{
                  backgroundColor: "#064F3B",
                  borderColor: "#064F3B",
                  width: "25px",
                  borderRadius: "0 4px 4px 0",
                }}
                onClick={incrementRentalDuration}
              >
                <PlusOutlined style={{ color: "#fff", fontSize: "15px" }} />
              </Button>
            </div>
          </div>
          <div className="total-quantity flex flex-col w-fit">
            <p className="text-neutral text-md">Jumlah Barang</p>
            <div className="flex flex-row my-3">
              <Button
                style={{
                  backgroundColor: "#064F3B",
                  borderColor: "#064F3B",
                  width: "25px",
                  borderRadius: "4px 0 0 4px",
                }}
                onClick={decrementTotalQuantity}
              >
                <MinusOutlined style={{ fontSize: "12px", color: "#fff" }} />
              </Button>
              <InputNumber
                readOnly
                min={1}
                max={data.stock}
                value={totalQuantity}
                style={{
                  width: "40px",
                  borderRadius: "0px",
                }}
              />
              <Button
                style={{
                  backgroundColor: "#064F3B",
                  borderColor: "#064F3B",
                  width: "25px",
                  borderRadius: "0 4px 4px 0",
                }}
                onClick={incrementTotalQuantity}
              >
                <PlusOutlined style={{ color: "#fff", fontSize: "15px" }} />
              </Button>
            </div>
          </div>
          <div className="stock flex flex-col w-fit text-[#808080] gap-2 items-center xl:hidden">
            <p className="">Stok: {data.stock}</p>
            <div className="flex my-2">
              {/* <InputNumber
                readOnly
                value={product.stock}
                style={{
                  width: "40px",
                  borderRadius: "0px",
                }}
              /> */}
            </div>
          </div>
        </div>
        <PrimaryButton
          text="Masukkan Keranjang"
          className="w-full py-3 xl:hidden"
        />
        <Footer />
      </div>
    </>
  );
};

export default DetailCatalogue;
