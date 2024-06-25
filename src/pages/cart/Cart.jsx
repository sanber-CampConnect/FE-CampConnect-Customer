import { useState, useEffect } from "react";
import { Button, InputNumber, message, Select, notification } from "antd";
import { MinusOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { BsTrash } from "react-icons/bs";
import { numberWithCommas } from "../../utils/Helper";
import { PrimaryButton } from "../../components/atoms/Buttons";
import Product from "../../assets/images/Product_6.png";
import { getCartItems } from "../../services/api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { data } from "autoprefixer";
import {
  getMediaProduct,
  deleteCartItems,
  postCheckout,
} from "../../services/api";
import { PlaceholderProduct } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
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

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      durasiSewa: 3,
      jumlahBarang: 1,
      gambar: Product,
    },
    {
      id: 2,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      durasiSewa: 3,
      jumlahBarang: 1,
      gambar: Product,
    },
    {
      id: 3,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      durasiSewa: 3,
      jumlahBarang: 1,
      gambar: Product,
    },
  ]);

  // const incrementDurasiSewa = (index) => {
  //   const updatedItems = [...cartItems];
  //   if (updatedItems[index].durasiSewa < 7) {
  //     updatedItems[index].durasiSewa += 1;
  //     setCartItems(updatedItems);
  //   }
  // };

  // const decrementDurasiSewa = (index) => {
  //   const updatedItems = [...dataCart];
  //   if (updatedItems[index].durasiSewa > 1) {
  //     updatedItems[index].durasiSewa -= 1;
  //     setDataCart(updatedItems);
  //   }
  // };

  // const incrementJumlahBarang = (index) => {
  //   const updatedItems = [...cartItems];
  //   updatedItems[index].jumlahBarang += 1;
  //   setCartItems(updatedItems);
  // };

  // const decrementJumlahBarang = (index) => {
  //   const updatedItems = [...dataCart];
  //   if (updatedItems[index].jumlahBarang > 1) {
  //     updatedItems[index].jumlahBarang -= 1;
  //     setDataCart(updatedItems);
  //   }
  // };

  const hapusItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
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

  // const totalBarang = cartItems.reduce(
  //   (sum, item) => sum + item.jumlahBarang,
  //   0
  // );

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.harga * item.jumlahBarang,
  //   0
  // );

  // const biayaPengiriman = 0; // Asumsikan gratis pengiriman

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
    if (!cartItems) {
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

    console.log(params);
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
          description:
            err?.response?.data?.info || "Terjadi kesalahan saat checkout",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(dataCart);

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center xl:min-h-screen bg-white xl:hidden">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-md font-medium mb-6">Shopping Cart</h1>
          {/* <h1 className="text-md font-bold mb-6">Kade Outdoor Malang</h1> */}
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
                    style={{ height: "18px", width: "18px" }}
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
        <h1 className="text-2xl font-bold mb-6">Keranjang</h1>
        <div className="flex flex-col xl:flex-row xl:justify-between">
          <div className="w-full xl:w-3/4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 pl-96">Varian</th>
                    <th className="py-2 px-4">QTY</th>
                    <th className="py-2 px-4">Days</th>
                    <th className="py-2 px-4">Total Price</th>
                    <th className="py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {dataCart.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-28 text-neutral"
                      >
                        Belum ada produk ditambahkan
                      </td>
                    </tr>
                  ) : (
                    dataCart.map((item, index) => (
                      <tr key={item.id} className="text-center">
                        <td className="py-2 px-4 flex items-center mt-2">
                          <img
                            src={photoProduct}
                            alt={item.product_name}
                            className="w-20 h-20 rounded mr-4"
                          />
                          <span>{item.product_name}</span>
                        </td>
                        {/* <td className="py-2 px-4">
                          <div className="flex justify-center items-center">
                            <Button
                              style={{
                                padding: "0 4px",
                                height: "24px",
                                lineHeight: "24px",
                                borderRadius: "0",
                              }}
                              onClick={() => decrementJumlahBarang(index)}
                            >
                              <MinusOutlined />
                            </Button>
                            <InputNumber
                              readOnly
                              min={1}
                              value={item.jumlahBarang}
                              size="small"
                              style={{
                                width: "30px",
                                border: "none",
                                textAlign: "center",
                                backgroundColor: "transparent",
                              }}
                            />
                            <Button
                              style={{
                                padding: "0 4px",
                                height: "24px",
                                lineHeight: "24px",
                                borderRadius: "0",
                              }}
                              onClick={() => incrementJumlahBarang(index)}
                            >
                              <PlusOutlined />
                            </Button>
                          </div>
                        </td> */}
                        {/* <td className="py-2 px-4">
                          <div className="flex justify-center items-center">
                            <Button
                              style={{
                                padding: "0 4px",
                                height: "24px",
                                lineHeight: "24px",
                                borderRadius: "0",
                              }}
                              onClick={() => decrementDurasiSewa(index)}
                            >
                              <MinusOutlined />
                            </Button>
                            <InputNumber
                              readOnly
                              min={1}
                              max={7}
                              value={item.durasiSewa}
                              size="small"
                              style={{
                                width: "30px",
                                border: "none",
                                textAlign: "center",
                                backgroundColor: "transparent",
                              }}
                            />
                            <Button
                              style={{
                                padding: "0 4px",
                                height: "24px",
                                lineHeight: "24px",
                                borderRadius: "0",
                              }}
                              onClick={() => incrementDurasiSewa(index)}
                            >
                              <PlusOutlined />
                            </Button>
                          </div>
                        </td> */}
                        <td className="py-2 px-4">
                          Rp
                          {numberWithCommas(
                            parseInt(item.harga) * parseInt(item.jumlahBarang)
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <Button
                            onClick={() => hapusItem(index)}
                            style={{
                              padding: "0",
                              height: "24px",
                              lineHeight: "24px",
                              borderRadius: "0",
                              color: "#FF432A",
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {dataCart.length === 0 ? null : (
            <>
              <div className="w-full xl:w-1/4 mt-4 xl:mt-0 ml-10">
                <div className="bg-white shadow-md rounded-lg p-4">
                  <h2 className="text-lg font-bold mb-4">Ringkasan Belanja</h2>
                  <div className="flex justify-between">
                    <p>Total Barang:</p>
                    <p className="font-bold">ini total barang</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Subtotal:</p>
                    <p className="font-bold">ini subtotal</p>
                  </div>
                  <hr className="my-4 border-t-2 border-black" />
                  <div className="flex justify-between font-bold">
                    <p>Total Harga:</p>
                    <p>ini total harga</p>
                  </div>
                  <a href="/checkout">
                    <PrimaryButton text="Checkout" className="w-full mt-10" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
