import { Input, Tabs } from "antd";
import { useState, useEffect } from "react";
import { Product6, Product7, Product8 } from "../../assets/images";
import ProductCardMobile from "../../components/organisms/ProductCardMobile";
import { Footer } from "../../components/organisms/Footer";
import { ProductCard } from "../../components/atoms/Card";

const { Search } = Input;

const Catalogue = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [isScrolled, setIsScrolled] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      product_name: "Tenda EXL Chanodug Kap. 12P",
      product_category: "Tenda",
      price: "90000",
      product_type: ["Tenda EXL"],
      stock: "10",
      image: Product6,
      description:
        "Tenda adalah tempat pelindung yang terdiri dari lembaran kain atau bahan lainnya menutupi yang melekat pada kerangka tiang atau menempel pada tali pendukung. Beberapa tenda tidak perlu berdiri di atas tanah karena ada beberapa model tenda yang menggantung di pohon.",
    },
    {
      id: 2,
      product_name: "Sepatu Gunung",
      product_category: "Perlengkapan Pribadi",
      product_type: ["31", "32", "33"],
      price: "20000",
      image: Product7,
      stock: "1",
      description:
        "Sepatu adalah salah satu jenis alas kaki (footwear) yang biasanya terdiri atas bagian-bagian sol, hak, kap, tali, dan lidah.",
    },
    {
      id: 3,
      product_name: "Tracking Pole",
      product_category: "Perlengkapan Pribadi",
      product_type: ["10", "11", "12"],
      price: "100000",
      image: Product8,
      stock: "10",
      description:
        "Alat ini sangat berguna selama hiking atau dijalanan menanjak, dimana beban kaki bisa kita bagi ke tracking pole melalui tumpuan tangan. Sehingga membantu mengurangi resiko cedera otot kaki dan terkilir/keseleo.",
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

      {/* Product Card tampilan mobile */}
      <div className="block xl:hidden">
        {filteredData.map((product) => (
          <ProductCardMobile key={product.id} product={product} />
        ))}
      </div>

      {/* Product Card tampilan Desktop */}
      <div className="hidden xl:grid xl:grid-cols-3 xl:gap-0 xl:my-6 xl:place-items-center">
        {filteredData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Catalogue;
