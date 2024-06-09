import { Input, Tabs } from "antd";
import { useState, useEffect } from "react";
import tendaXL from "../../assets/images/tenda-exl-chanodug.png";
import ProductCardMobile from "../../components/organisms/ProductCardMobile";

const { Search } = Input;

const Catalogue = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isScrolled, setIsScrolled] = useState(false);
  const [data, setData] = useState([
    {
      key: "1",
      product_name: "Tenda EXL Chanodug Kap. 12P",
      product_category: "Tenda",
      price: "90000",
      product_type: ["Tenda EXL"],
      stock: "10",
      image: tendaXL,
      description:
        "Tenda adalah tempat pelindung yang terdiri dari lembaran kain atau bahan lainnya menutupi yang melekat pada kerangka tiang atau menempel pada tali pendukung. Beberapa tenda tidak perlu berdiri di atas tanah karena ada beberapa model tenda yang menggantung di pohon.",
      how_to_use: [
        "Siapkan tenda dan semua perlengkapan yang diperlukan.",
        "Pilih lokasi yang datar dan aman untuk mendirikan tenda.",
        "Keluarkan tenda dari kantong penyimpanan dan letakkan di lokasi yang telah dipilih.",
        "Rakit kerangka tenda dan pasang tiang penyangga.",
        "Pasang kain tenda pada kerangka dan kencangkan tali-talinya.",
        "Pastikan tenda terpasang dengan kuat dan aman.",
      ],
    },
    {
      key: "2",
      product_name: "Sepatu",
      product_category: "Perlengkapan Pribadi",
      product_type: ["31", "32", "33"],
      price: "100",
      image: tendaXL,
      stock: "1",
      description:
        "Sepatu adalah salah satu jenis alas kaki (footwear) yang biasanya terdiri atas bagian-bagian sol, hak, kap, tali, dan lidah.",
      how_to_use: [
        "Pilih sepatu yang sesuai dengan aktivitas yang akan dilakukan.",
        "Gunakan kaus kaki yang bersih dan nyaman.",
        "Masukkan kaki ke dalam sepatu dan pastikan ukurannya pas.",
        "Kencangkan tali sepatu dengan kencang tetapi tidak terlalu ketat.",
        "Uji sepatu di area yang datar sebelum digunakan untuk aktivitas intensif.",
      ],
    },
    {
      key: "3",
      product_name: "Tracking Pole",
      product_category: "Perlengkapan Pribadi",
      product_type: ["10", "11", "12"],
      price: "100000",
      image: tendaXL,
      stock: "10",
      description:
        "Alat ini sangat berguna selama hiking atau dijalanan menanjak, dimana beban kaki bisa kita bagi ke tracking pole melalui tumpuan tangan. Sehingga membantu mengurangi resiko cedera otot kaki dan terkilir/keseleo.",
      how_to_use: [
        "Pilih tracking pole yang sesuai dengan tinggi tubuh.",
        "Pegang tracking pole dengan benar, dengan pegangan yang nyaman dan kokoh.",
        "Tempatkan tracking pole di depan tubuh saat menanjak atau menuruni lereng.",
        "Gunakan kedua tracking pole untuk keseimbangan tambahan saat melintasi medan yang sulit.",
        "Pastikan untuk membersihkan dan merawat tracking pole setelah digunakan.",
      ],
    },
  ]);
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (value) => {
    const filtered = data.filter(
      (item) =>
        item.product_name.toLowerCase().includes(value.toLowerCase()) ||
        item.product_category.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const changeScrolled = () => {
    if (window.scrollY >= 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeScrolled);
    return () => {
      window.removeEventListener("scroll", changeScrolled);
    };
  }, []);

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "0") {
      setFilteredData(data);
    } else {
      const filteredByCategory = data.filter(
        (item) => item.product_category === key
      );
      setFilteredData(filteredByCategory);
    }
  };

  return (
    <>
      <div
        className={`${
          isScrolled ? "bg-opacity-60 backdrop-blur-lg" : "bg-white"
        } search-tabs-sticky`}
      >
        <Search
          size="large"
          placeholder="Cari produk..."
          onSearch={onSearch}
          enterButton
        />
        <div className="mt-4">
          <Tabs
            defaultActiveKey="1"
            size="large"
            onChange={handleTabChange}
            style={{ marginBottom: 8 }}
            items={[
              {
                label: "Semua",
                key: "0",
              },
              {
                label: "Tenda",
                key: "Tenda",
              },
              {
                label: "Alat Masak",
                key: "Alat Masak",
              },
              {
                label: "Alat Tidur",
                key: "Alat Tidur",
              },
              {
                label: "Penerangan",
                key: "Penerangan",
              },
              {
                label: "Perlengkapan Pribadi",
                key: "Perlengkapan Pribadi",
              },
              {
                label: "Lainnya",
                key: "Lainnya",
              },
            ]}
          />
        </div>
      </div>
      <div>
        {filteredData.map((item) => (
          <ProductCardMobile
            key={item.key}
            image={item.image}
            product_name={item.product_name}
            price={item.price}
            stock={item.stock}
          />
        ))}
      </div>
    </>
  );
};

export default Catalogue;
