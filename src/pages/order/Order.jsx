import { useState, useEffect } from "react";
import { Tabs, Spin } from "antd";
import { OrderCard } from "../../components/atoms/Card";
import { getMyOrders, getProductOrder } from "../../services/api";

const Order = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [productOrder, setProductOrder] = useState([]);
  // const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getDataOrder();
  }, []);

  useEffect(() => {
    if (orderId.length > 0) {
      getMyProductOrder(orderId);
    }
  }, [orderId]);

  const getDataOrder = () => {
    setLoading(true);
    getMyOrders()
      .then((res) => {
        const ids = res.data.data.map((order) => order.id);
        setOrderId(ids);
        setData(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getMyProductOrder = (orderIds) => {
    setLoading(true);
    Promise.all(orderIds.map((id) => getProductOrder(id)))
      .then((results) => {
        // console.log(results);
        // menyimpan data order detail
        // const allOrderItems = results.reduce((acc, res) => {
        //   return acc.concat(res.data.data.orderItems);
        // }, []);
        // menyimpan data product
        const productOrderMap = results.reduce((acc, res, index) => {
          acc[orderIds[index]] = res.data.data.orderItems;
          return acc;
        }, {});
        // setOrderItems(allOrderItems);
        setProductOrder(productOrderMap);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const tabItems = [
    { label: "Semua", key: "0" },
    { label: "Belum Bayar", key: "1" },
    { label: "Sedang Disewa", key: "2" },
    { label: "Dibatalkan", key: "3" },
    { label: "Selesai", key: "4" },
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === "0") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((order) => {
        const statusMap = {
          belum_bayar: "1",
          sedang_disewa: "2",
          dibatalkan: "3",
          selesai: "4",
        };
        return statusMap[order.status] === key;
      });
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          isScrolled ? "bg-opacity-60 backdrop-blur-lg" : "bg-white"
        } tabs-sticky`}
      >
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

      {/* Order Card */}
      {filteredData && filteredData.length > 0 ? (
        filteredData.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            productItems={productOrder[order.id] || []}
            refreshOrders={getDataOrder}
            // orderDetail={orderItems}
          />
        ))
      ) : (
        <div className="min-h-screen flex justify-center text-center">
          <p className="text-neutral my-24">Belum ada order</p>
        </div>
      )}
    </>
  );
};

export default Order;
