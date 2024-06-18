import { Input, Tabs } from "antd";
import { useState, useEffect } from "react";
import ProductCardMobile from "../../components/organisms/ProductCardMobile";
import { Footer } from "../../components/organisms/Footer";
import { ProductCard } from "../../components/atoms/Card";
import { getAllProduct, getProductCategories } from "../../services/api";

const { Search } = Input;

const Catalogue = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getDataProduct();
    getCategory();
  }, []);

  const getDataProduct = () => {
    setLoading(true);
    getAllProduct()
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategory = () => {
    setLoading(true);
    getProductCategories()
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSearch = (value) => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.category_name.toLowerCase().includes(value.toLowerCase())
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
        (item) => item.category_id.toString() === key
      );
      setFilteredData(filteredByCategory);
    }
  };

  const tabItems = [
    { label: "Semua", key: "0" },
    ...category.map((cat) => ({ label: cat.name, key: cat.id.toString() })),
  ];

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
            defaultActiveKey="0"
            size="large"
            onChange={handleTabChange}
            style={{ marginBottom: 8 }}
            items={tabItems}
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
      <div className="hidden xl:grid xl:grid-cols-3 xl:gap-y-12 xl:my-6 xl:place-items-center">
        {filteredData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Catalogue;
