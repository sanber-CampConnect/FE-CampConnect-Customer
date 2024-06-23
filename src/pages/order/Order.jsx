import { useState, useEffect } from "react";
import { Tabs, Spin } from "antd";
import { OrderCard } from "../../components/atoms/Card";
import { getMyOrders } from "../../services/api";

const Order = () => {
  const [activeTab, setActiveTab] = useState("0");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = () => {
    setLoading(true);
    getMyOrders()
      .then((res) => {
        // console.log(res.data.data);
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

  // const [dataDummy, setDataDummy] = useState([
  //   {
  //     id: 15,
  //     user_id: 2,
  //     payment_due: "2024-06-20T12:20:28.000Z",
  //     status: "belum_bayar",
  //     last_update: "2024-06-17T13:34:27.000Z",
  //     transaction_id: 13,
  //     transaction_invoice_number: "INV_749d6cd7ca639a9a912b0b3b5ea4",
  //     transaction_evidence_image: "evidence/dmwioadmioa",
  //     transaction_evidence_status: true,
  //     transaction_method: "transfer",
  //     transaction_item_count: 9,
  //     transaction_total_price: 2700,
  //     orderItems: [
  //       {
  //         product_id: 3,
  //         product_name: "Tenda Bagus Sekali",
  //         product_unit_price: "40000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 3,
  //         orderItem_rent_duration: 3,
  //         orderItem_subtotal: 360000,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tenda Bagus Sekali",
  //         product_unit_price: "45000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 1,
  //         orderItem_rent_duration: 1,
  //         orderItem_subtotal: 45000,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tenda Bagus Sekali",
  //         product_unit_price: "20000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 3,
  //         orderItem_rent_duration: 1,
  //         orderItem_subtotal: 60000,
  //       },
  //     ],
  //   },
  //   {
  //     id: 20,
  //     user_id: 4,
  //     payment_due: "2024-06-20T12:20:28.000Z",
  //     status: "dibatalkan",
  //     last_update: "2024-06-17T13:34:27.000Z",
  //     transaction_id: 15,
  //     transaction_invoice_number: "INV_749d6cd7ca639a9a912je83b5ea4",
  //     // transaction_evidence_image: "evidence/dmwioadmioa",
  //     transaction_evidence_status: null,
  //     transaction_method: "cash",
  //     transaction_item_count: 5,
  //     transaction_total_price: 2700,
  //     orderItems: [
  //       {
  //         product_id: 3,
  //         product_name: "Headlamp",
  //         product_unit_price: "12000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 3,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tenda",
  //         product_unit_price: "40000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 1,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tracking Pole",
  //         product_unit_price: "20000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 1,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //     ],
  //   },
  //   {
  //     id: 21,
  //     user_id: 4,
  //     payment_due: "2024-06-20T12:20:28.000Z",
  //     status: "sedang_disewa",
  //     last_update: "2024-06-17T13:34:27.000Z",
  //     transaction_id: 15,
  //     transaction_invoice_number: "INV_749d6cd7ca639a9a912je83b5ea4",
  //     // transaction_evidence_image: "evidence/dmwioadmioa",
  //     transaction_evidence_status: null,
  //     transaction_method: "cash",
  //     transaction_item_count: 5,
  //     transaction_total_price: 2700,
  //     orderItems: [
  //       {
  //         product_id: 3,
  //         product_name: "Headlamp",
  //         product_unit_price: "12000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 3,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tenda",
  //         product_unit_price: "40000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 1,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //       {
  //         product_id: 3,
  //         product_name: "Tracking Pole",
  //         product_unit_price: "20000",
  //         variant_id: 5,
  //         variant_name: "M",
  //         orderItem_count: 1,
  //         orderItem_rent_duration: 30,
  //         orderItem_subtotal: 900,
  //       },
  //     ],
  //   },
  // ]);

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

  if (loading || !data.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  console.log(filteredData);

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
        filteredData.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <div className="min-h-screen flex justify-center text-center">
          <p className="text-neutral my-24">Belum ada order</p>
        </div>
      )}
    </>
  );
};

export default Order;
