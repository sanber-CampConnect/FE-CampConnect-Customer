import { useState, useEffect } from "react";
import { Select, notification } from "antd";
import { PrimaryButton, OutlineButton } from "../../components/atoms/Buttons";
import Product from "../../assets/images/Product_6.png"; // Placeholder for product image
import { numberWithCommas } from "../../utils/Helper";
import iconPayment from "../../assets/icons/Vector.png";
import { postCheckout } from "../../services/api";
import { useNavigate } from "react-router-dom";

// Import custom payment method icons

const { Option } = Select;

const Checkout = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

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
      cartItems: [16], //masih contoh
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

  const [cartItems] = useState([
    {
      id: 1,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      jumlahBarang: 1,
      gambar: Product,
    },
    {
      id: 2,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      jumlahBarang: 1,
      gambar: Product,
    },
    {
      id: 3,
      nama: "Tenda Ekl Choandoeg Kap. 12 P",
      kategori: "Tenda",
      harga: 100000,
      jumlahBarang: 1,
      gambar: Product,
    },
  ]);

  const totalBarang = cartItems.reduce(
    (sum, item) => sum + item.jumlahBarang,
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.harga * item.jumlahBarang,
    0
  );
  // const biayaPengiriman = 0; // Assume free shipping

  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col items-center justify-center xl:min-h-screen bg-white xl:hidden">
        <div className="w-full max-w-xl mx-auto p-4">
          <h1 className="text-md font-medium mb-6">Order Summary</h1>
          <h1 className="text-md font-bold mb-6">Kade Outdoor Malang</h1>
          <div className="outline outline-2 outline-[#E9EAEB] ">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-row mb-4 ">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-20 h-20 rounded mr-4 ml-1 mt-1 mb-1"
                />
                <div className="flex flex-col -mx-1">
                  <div className="gap-4">
                    <h2 className="font-bold text-md ">{item.nama}</h2>
                    <p className="text-[#FF432A] font-bold">
                      Rp{numberWithCommas(item.harga)}
                    </p>
                  </div>
                  <p>Kategori: {item.kategori}</p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="mt-8">
            <div className="flex justify-between">
              <p>Subtotal:</p>
              <p className="font-bold">Rp{numberWithCommas(subtotal)}</p>
            </div>
            {/* <div className="flex justify-between">
              <p>Biaya Pengiriman:</p>
              <p className="font-bold">
                {biayaPengiriman === 0
                  ? "Gratis"
                  : `Rp${numberWithCommas(biayaPengiriman)}`}
              </p>
            </div> */}
            <hr className="my-4 border-t-2 border-black" />
            <div className="flex justify-between font-bold">
              <p>Total:</p>
              <p>Rp{numberWithCommas(subtotal)}</p>
            </div>
          </div>
          <div className="flex justify-between mt-10 mb-10">
            <OutlineButton
              text="Batalkan"
              className="w-1/2 mr-2 border border-primary"
            />
            <PrimaryButton
              text="Bayar"
              className="w-1/2 ml-2"
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden xl:flex xl:flex-col xl:container xl:mx-auto xl:p-4">
        <div className="w-full max-w-7xl mx-auto p-4">
          <h2 className="text-xl font-semibold mb-4">Keranjang Anda</h2>
          <h1 className="text-3xl font-bold mb-6"></h1>
          <div className="flex space-x-8">
            <div className="w-2/3">
              <div className=" p-4 mb-4">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 pl-96 text-left">Varian</th>
                      <th className="py-2 px-4 text-center">QTY</th>
                      <th className="py-2 px-4 text-center">Days</th>
                      <th className="py-2 px-4 text-right">Total Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 flex items-center">
                          <img
                            src={item.gambar}
                            alt={item.nama}
                            className="w-16 h-16 rounded mr-4"
                          />
                          <span>{item.nama}</span>
                        </td>
                        <td className="py-2 px-4 text-center">
                          {item.jumlahBarang}
                        </td>
                        <td className="py-2 px-4 text-center">1</td>
                        <td className="py-2 px-4 text-right">
                          Rp{numberWithCommas(item.harga * item.jumlahBarang)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-1/3">
              <div className="p-4 mb-4">
                <h2 className="text-xl font-semibold mb-4">
                  Ringkasan Pesanan
                </h2>
                <div className="border-gray-300 mb-4">
                  <h2 className="text-md  mb-4">Metode Pembayaran</h2>
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
                  <p className="mt-2">
                    Pembayaran yang dipilih: {paymentMethod}
                  </p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Subtotal:</p>
                  <p className="font-bold">Rp{numberWithCommas(subtotal)}</p>
                </div>
                {/* <div className="flex justify-between mb-2">
                  <p>Biaya Pengiriman:</p>
                  <p className="font-bold">
                    {biayaPengiriman === 0
                      ? "Gratis"
                      : `Rp${numberWithCommas(biayaPengiriman)}`}
                  </p>
                </div> */}
                <hr className="my-2 border-t-2 border-black" />
                <div className="flex justify-between font-bold">
                  <p>Total Harga:</p>
                  <p>Rp{numberWithCommas(subtotal)}</p>
                </div>
              </div>
              <div className="flex gap-6  mt-10">
                <a href="/cart">
                  <OutlineButton
                    text="Batalkan"
                    className="w-full border-primary"
                  />
                </a>
                <PrimaryButton
                  text="Checkout"
                  className="w-full"
                  onClick={handleCheckout}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
