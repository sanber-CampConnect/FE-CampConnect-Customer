import { useState } from "react";
import { Button, InputNumber } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsTrash } from "react-icons/bs";
import { numberWithCommas } from "../../utils/Helper";
import { PrimaryButton } from "../../components/atoms/Buttons";
import Product from "../../assets/images/Product_6.png";
import { FaArrowLeftLong } from "react-icons/fa6";

const Cart = () => {
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

    const incrementDurasiSewa = (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].durasiSewa < 7) {
            updatedItems[index].durasiSewa += 1;
            setCartItems(updatedItems);
        }
    };

    const decrementDurasiSewa = (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].durasiSewa > 1) {
            updatedItems[index].durasiSewa -= 1;
            setCartItems(updatedItems);
        }
    };

    const incrementJumlahBarang = (index) => {
        const updatedItems = [...cartItems];
        updatedItems[index].jumlahBarang += 1;
        setCartItems(updatedItems);
    };

    const decrementJumlahBarang = (index) => {
        const updatedItems = [...cartItems];
        if (updatedItems[index].jumlahBarang > 1) {
            updatedItems[index].jumlahBarang -= 1;
            setCartItems(updatedItems);
        }
    };

    const hapusItem = (index) => {
        const updatedItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedItems);
    };

    const totalBarang = cartItems.reduce(
        (sum, item) => sum + item.jumlahBarang,
        0
    );
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.harga * item.jumlahBarang,
        0
    );
    const biayaPengiriman = 0; // Asumsikan gratis pengiriman

    return (
        <>
            {/* Mobile */}
            <div className="flex flex-col items-center justify-center min-h-screen bg-white xl:hidden">
                <div className="w-full max-w-xl mx-auto">
                    <h1 className="text-md font-medium mb-6">Shopping Cart</h1>
                    <h1 className="text-md font-bold mb-6">Kade Outdoor Malang</h1>
                    {cartItems.map((item, index) => (
                        <div key={item.id} className="flex flex-row mb-4">
                            <img
                                src={item.gambar}
                                alt={item.nama}
                                className="w-32 h-32 rounded mr-4"
                            />
                            <div className="flex flex-col -mx-1">
                                <div className="flex gap-4">
                                    <h2 className="font-bold text-md w-28">{item.nama}</h2>
                                    <p className="text-[#FF432A] font-bold">
                                        Rp{numberWithCommas(item.harga)}
                                    </p>
                                </div>
                                <p>Kategori: {item.kategori}</p>
                                <div className="flex">
                                    <div className="flex flex-col items-left mt-4">
                                        <p className="text-sm text-center pb-1">Durasi sewa</p>
                                        <div className="flex">
                                            <Button
                                                style={{
                                                    padding: "0 2px 0 2px",
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
                                                    padding: "0 2px 0 2px",
                                                    height: "24px",
                                                    lineHeight: "24px",
                                                    borderRadius: "0",
                                                }}
                                                onClick={() => incrementDurasiSewa(index)}
                                            >
                                                <PlusOutlined />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center mt-4 ml-14 rounded">
                                        <p className="text-sm pb-1 ">Jumlah barang</p>
                                        <div className="flex">
                                            <Button
                                                style={{
                                                    padding: "0 2px 0 2px",
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
                                                    padding: "0 2px 0 2px",
                                                    height: "24px",
                                                    lineHeight: "24px",
                                                    borderRadius: "0",
                                                }}
                                                onClick={() => incrementJumlahBarang(index)}
                                            >
                                                <PlusOutlined />
                                            </Button>
                                        </div>
                                    </div>
                                    <Button
                                        style={{
                                            marginLeft: "auto",
                                            marginTop: "auto",
                                            padding: "0 2px 0 2px",
                                            height: "24px",
                                            lineHeight: "24px",
                                            borderRadius: "0",
                                            color: "#FF432A"
                                        }}
                                        onClick={() => hapusItem(index)}
                                    >
                                        <BsTrash className="hidden"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="mt-8">
                        <div className="flex justify-between">
                            <p>Total Barang:</p>
                            <p className="font-bold">{totalBarang}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Subtotal:</p>
                            <p className="font-bold">Rp{numberWithCommas(subtotal)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Biaya Pengiriman:</p>
                            <p className="font-bold">{biayaPengiriman === 0 ? "Free" : `Rp${numberWithCommas(biayaPengiriman)}`}</p>
                        </div>
                        <hr className="my-4 border-t-2 border-black" />
                        <div className="flex justify-between font-bold">
                            <p>Total Harga:</p>
                            <p>Rp{numberWithCommas(subtotal + biayaPengiriman)}</p>
                        </div>
                    </div>
                    <PrimaryButton text="Checkout" className="w-full mt-10 mb-10" />
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden xl:flex xl:flex-col xl:container xl:mx-auto xl:p-4">
                <h1 className="text-2xl font-bold mb-6">Keranjang</h1>
                <div className="flex text-lg gap-2">
                <FaArrowLeftLong className="h-6 w-6"/> Lanjutkan
                </div>
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
                                    {cartItems.map((item, index) => (
                                        <tr key={item.id} className="text-center">
                                            <td className="py-2 px-4 flex items-center mt-2">
                                                <img
                                                    src={item.gambar}
                                                    alt={item.nama}
                                                    className="w-20 h-20 rounded mr-4"
                                                />
                                                <span>{item.nama}</span>
                                            </td>
                                            <td className="py-2 px-4">
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
                                            </td>
                                            <td className="py-2 px-4">
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
                                            </td>
                                            <td className="py-2 px-4">
                                                Rp{numberWithCommas(item.harga * item.jumlahBarang)}
                                            </td>
                                            <td className="py-2 px-4">
                                                <Button
                                                    onClick={() => hapusItem(index)}
                                                    style={{
                                                        padding: "0",
                                                        height: "24px",
                                                        lineHeight: "24px",
                                                        borderRadius: "0",
                                                        color: "#FF432A"
                                                    }}
                                                >
                                                    <BsTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full xl:w-1/4 mt-4 xl:mt-0 ml-10">
                        <div className="bg-white shadow-md rounded-lg p-4">
                            <h2 className="text-lg font-bold mb-4">Ringkasan Belanja</h2>
                            <div className="flex justify-between">
                                <p>Total Barang:</p>
                                <p className="font-bold">{totalBarang}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Subtotal:</p>
                                <p className="font-bold">Rp{numberWithCommas(subtotal)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Biaya Pengiriman:</p>
                                <p className="font-bold">{biayaPengiriman === 0 ? "Free" : `Rp${numberWithCommas(biayaPengiriman)}`}</p>
                            </div>
                            <hr className="my-4 border-t-2 border-black" />
                            <div className="flex justify-between font-bold">
                                <p>Total Harga:</p>
                                <p>Rp{numberWithCommas(subtotal + biayaPengiriman)}</p>
                            </div>
                            <PrimaryButton text="Checkout" className="w-full mt-10" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
