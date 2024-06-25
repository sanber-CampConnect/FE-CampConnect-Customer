import { useState, useEffect } from "react";
import { Button, InputNumber, message, Select, notification } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsTrash } from "react-icons/bs";
import { numberWithCommas } from "../../utils/Helper";
import { PrimaryButton } from "../../components/atoms/Buttons";
import Product from "../../assets/images/Product_6.png";
import { getCartItems, getMediaProduct, deleteCartItems, postCheckout } from "../../services/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { PlaceholderProduct } from "../../assets/images";
import { useNavigate } from "react-router-dom";
import iconPayment from "../../assets/icons/Vector.png";

const { Option } = Select;

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [dataCart, setDataCart] = useState([]);
  const [photoProduct, setPhotoProduct] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

  useEffect(() => {
    getDataCart();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (dataCart && dataCart.length > 0) {
        try {
          const imagePromises = dataCart.map((item) =>
            getMediaProduct(item.product_image)
          );

          const imageUrls = await Promise.all(imagePromises);
          setPhotoProduct(imageUrls);
        } catch (error) {
          console.error("Error fetching images:", error);
          setPhotoProduct(PlaceholderProduct);
        }
      }
    };

    fetchImages();
  }, [dataCart]);

  const getDataCart = () => {
    setLoading(true);
    getCartItems(user.cart_id)
      .then((res) => {
        setDataCart(res.data.data.items);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const hapusItem = (index) => {
    const updatedItems = dataCart.filter((_, i) => i !== index);
    setDataCart(updatedItems);
  };

  const handleDeleteProduct = async (cartItemId) => {
    try {
      await deleteCartItems(cartItemId);
      getDataCart();
      message.success("Produk berhasil dihapus dari keranjang");
    } catch (error) {
      console.error(`Error menghapus item dengan ID ${cartItemId}:`, error);
    }
  };

  const handleChecklistClick = (productId) => {
    if (checkedItems.includes(productId)) {
      setCheckedItems(checkedItems.filter((item) => item !== productId));
    } else {
      setCheckedItems([...checkedItems, productId]);
    }
  };

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const handleCheckout = async () => {
    if (!dataCart) {
      notification.warning({
        message: "Gagal Checkout!",
        description: "Pilih produk untuk checkout",
      });
      return;
    }

    const params = {
      method: paymentMethod.toLowerCase(),
      cartItems: checkedItems,
    };

    setLoading(true);
    postCheckout(params)
      .then((res) => {
        if (res.status === 201) {
          notification.success({
            message: "Berhasil Checkout Produk",
            description: "Produk Anda telah diproses",
          });
          if (params.method === "transfer") {
            notification.warning({
              message: "Silahkan Kirim Bukti Transfer",
              description: "Klik Bayar pada order dan kirim bukti transfer",
            });
            navigate(`/orders`);
          } else {
            navigate("/orders");
          }
        }
      })
      .catch((err) => {
        notification.error({
          message: "Gagal Melakukan Checkout",
          description: err?.response?.data?.info || "Terjadi kesalahan saat checkout",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const totalBarang = dataCart.reduce((sum, item) => sum + parseInt(item.count), 0);
  const subtotal = dataCart.reduce((sum, item) => sum + parseInt(item.product_price) * parseInt(item.count), 0);

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center xl:min-h-screen bg-white xl:hidden">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-md font-medium mb-6">Shopping Cart</h1>
          {dataCart.length === 0 ? (
            <p className="text-neutral py-44 text-center">
              Belum ada produk ditambahkan
            </p>
          ) : (
            dataCart.map((item, index) => (
              <div key={item.id} className="flex flex-row items-center my-6">
                <img
                  src={photoProduct[index]}
                  alt={item.product_name}
                  className="w-28 h-28 rounded mr-4"
                />
                <div className="flex flex-col -mx-1 gap-3 pr-8 w-full">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-row justify-between">
                      <h2 className="font-bold text-md w-28">
                        {item.product_name}
                      </h2>
                      <p className="text-base">
                        qty:{numberWithCommas(parseInt(item.count))}
                      </p>
                    </div>
                    <p className="text-base text-neutral">
                      Jenis: {item.variant_name}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-row items-center">
                      <p className="text-failed text-md font-semibold">
                        Rp {numberWithCommas(item.product_price)}
                      </p>
                      <p className="text-neutral text-base">/hari</p>
                    </div>
                    <p className="text-base">x {item.rent_duration} hari</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 items-center">
                  <Button
                    style={{
                      marginLeft: "auto",
                      marginTop: "auto",
                      padding: "0 2px 0 2px",
                      height: "24px",
                      lineHeight: "24px",
                      borderRadius: "3px",
                      color: "#FF432A",
                      borderColor: "#636363",
                    }}
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    <BsTrash />
                  </Button>
                  <input
                    style={{ height: "18px", width: "18px", marginTop: "10px" }}  // Added margin-top
                    type="checkbox"
                    onChange={() => handleChecklistClick(item.id)}
                  />
                </div>
              </div>
            ))
          )}
          <div className="bg-gray-100 p-4 rounded-lg mb-6 outline outline-2 outline-[#E9EAEB]">
            <div className="flex items-center mb-2">
              <p className="font-bold">Metode Pembayaran</p>
            </div>
            <Select
              defaultValue={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="w-full"
            >
              <Option value="Tunai">
                <div className="flex items-center">
                  <img src={iconPayment} alt="Tunai" className="w-4 h-4 mr-2" />
                  Tunai
                </div>
              </Option>
              <Option value="Transfer">
                <div className="flex items-center">
                  <img
                    src={iconPayment}
                    alt="Transfer"
                    className="w-4 h-4 mr-2"
                  />
                  Transfer
                </div>
              </Option>
            </Select>
            <p className="mt-2">Pembayaran yang dipilih: {paymentMethod}</p>
          </div>
          {checkedItems.length > 0 && (
            <PrimaryButton
              text="Checkout"
              className="w-full my-4"
              onClick={handleCheckout}
            />
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden xl:flex xl:flex-col xl:container xl:mx-auto xl:p-4">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex flex-col xl:flex-row xl:justify-between">
          <div className="w-full xl:w-3/4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white ml-4">
                <thead>
                  <tr>
                    <th className="py-2">Product</th>
                    <th className="py-2 ">Varian</th>
                    <th className="py-2 ">QTY</th>
                    <th className="py-2 ">Days</th>
                    <th className="py-2 ">Total Price</th>
                    <th className="py-2 "></th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart.map((item, index) => (
                    <tr key={item.id} className="border-t ">
                      <td className="py-2 px-4 flex items-center ">
                        <img
                          src={photoProduct[index]}
                          alt={item.product_name}
                          className="w-16 h-16 rounded mr-2"
                        />
                        <span className="font-semibold " style={{ marginLeft: "10px" }}>
                          {item.product_name}
                        </span>
                      </td>
                      <td className="py-2  ">{item.variant_name}</td>
                      <td className="py-2 px-4 ">
                        <InputNumber
                          min={1}
                          value={parseInt(item.count)}
                          onChange={(value) => updateQuantity(index, value)}
                        />
                      </td>
                      <td className="py-2 px-4 ">{item.rent_duration} days</td>
                      <td className="py-2 px-4">
                        Rp {numberWithCommas(item.product_price)}
                      </td>
                      <td className="py-2 px-4 text-center ">
                        <Button
                          style={{
                            marginLeft: "auto",
                            marginTop: "auto",
                            padding: "0 2px 0 2px",
                            height: "24px",
                            lineHeight: "24px",
                            borderRadius: "3px",
                            color: "#FF432A",
                            borderColor: "#636363",
                            
                          }}
                          onClick={() => handleDeleteProduct(item.id)}
                        >
                          <BsTrash />
                        </Button>
                        <input
                          style={{ height: "18px", width: "18px", marginLeft: "16px", marginTop: "10px" }} 
                          type="checkbox"
                          onChange={() => handleChecklistClick(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full xl:w-1/4 mt-6 xl:mt-0 xl:ml-4">
            <div className="bg-gray-100 p-4 rounded-lg mb-6 outline outline-2 outline-[#E9EAEB]">
              <div className="flex items-center mb-2">
                <p className="font-bold">Metode Pembayaran</p>
              </div>
              <Select
                defaultValue={paymentMethod}
                onChange={handlePaymentMethodChange}
                className="w-full"
              >
                <Option value="Tunai">
                  <div className="flex items-center">
                    <img
                      src={iconPayment}
                      alt="Tunai"
                      className="w-4 h-4 mr-2"
                    />
                    Tunai
                  </div>
                </Option>
                <Option value="Transfer">
                  <div className="flex items-center">
                    <img
                      src={iconPayment}
                      alt="Transfer"
                      className="w-4 h-4 mr-2"
                    />
                    Transfer
                  </div>
                </Option>
              </Select>
              <p className="mt-2">Pembayaran yang dipilih: {paymentMethod}</p>
            </div>
            {checkedItems.length > 0 && (
              <PrimaryButton
                text="Checkout"
                className="w-full my-4"
                onClick={handleCheckout}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
