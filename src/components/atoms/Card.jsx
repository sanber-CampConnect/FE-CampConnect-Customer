import { numberWithCommas, truncateDescription } from "../../utils/Helper";
import { useNavigate } from "react-router-dom";
import { PlaceholderProduct } from "../../assets/images/index";
import { getMediaProduct } from "../../services/api";
import { useEffect, useState } from "react";
import { OutlineButton, PrimaryButton, TextButton } from "./Buttons";
import { Tag, notification, Modal, Radio, Input } from "antd";
import { OrderProduct } from "../moleculs/OrderProduct";

const PopularProduct = ({ product }) => {
  const [photoProduct, setPhotoProduct] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (product && product.image && product.image.trim() !== "") {
        try {
          const imageUrl = await getMediaProduct(product.image);
          if (imageUrl) {
            setPhotoProduct(imageUrl);
          } else {
            setPhotoProduct(PlaceholderProduct);
          }
        } catch (error) {
          console.error(error);
          setPhotoProduct(PlaceholderProduct);
        }
      }
    };

    fetchImage();
  }, [product]);

  return (
    <div className="rounded-3xl border border-primary text-center m-4 xl:w-48 w-44 h-52 overflow-hidden relative flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={photoProduct || PlaceholderProduct}
          alt={product.name}
          className="object-cover w-full h-[10rem]"
        />
      </div>
      <div className="p-3 font-normal text-md h-20 flex items-center justify-center">
        {product.name}
      </div>
    </div>
  );
};

const ReviewUser = ({ review }) => {
  return (
    <div className="border border-[#D4D2E3] shadow text-black rounded-3xl p-4 xl:p-6 text-justify h-[150px] w-44 xl:w-72 xl:h-44 justify-center m-4 overflow-hidden">
      <div className="flex items-center mb-4">
        <img
          src={review.image}
          alt={review.name}
          className="rounded-full w-8 h-8 xl:w-12 xl:h-12 object-cover"
        />
        <div className="ml-4">
          <div className="font-bold text-sm xl:text-md text-[#5D5A88]">
            {review.name}
          </div>
          <div className="text-sm text-neutral">{review.title}</div>
        </div>
      </div>
      <div className="text-sm text-neutral line-clamp-4">{review.text}</div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [photoProduct, setPhotoProduct] = useState(null);
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/catalogue/${product.id}`, { state: { product } });
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (product && product.image && product.image.trim() !== "") {
        try {
          const imageUrl = await getMediaProduct(product.image);
          if (imageUrl) {
            setPhotoProduct(imageUrl);
          } else {
            setPhotoProduct(PlaceholderProduct);
          }
        } catch (error) {
          console.error(error);
          setPhotoProduct(PlaceholderProduct);
        }
      }
    };

    fetchImage();
  }, [product]);

  return (
    <div className="rounded-lg border border-[#F2EDED] shadow-md p-6 w-11/12 h-[520px] max-h-[520px] flex flex-col">
      <div className="w-full flex-grow">
        <img
          src={photoProduct || PlaceholderProduct}
          alt={product.name}
          className="object-cover rounded-lg w-full h-72"
        />
        <div className="mt-4">
          <h3 className="font-medium text-lg text-[#5D5A88]">{product.name}</h3>
          <p className="text-[#9795B5] text-base mt-2 leading-6 text-justify">
            {truncateDescription(product.description)}
          </p>
        </div>
      </div>
      <div className="mt-auto">
        <TextButton
          text="Detail Produk"
          className="w-full rounded-[24px] py-3"
          onClick={handleDetailClick}
        />
      </div>
    </div>
  );
};

const OrderCardMobile = ({ order }) => {
  console.log(order);
  const navigate = useNavigate();
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  // const [isReasonModalVisible, setIsReasonModalVisible] = useState(false);
  // const [selectedReason, setSelectedReason] = useState(null);
  // const [customReason, setCustomReason] = useState("");

  const productItems = order.orderItems;

  const statusColorMap = {
    1: "orange",
    2: "blue",
    3: "red",
    4: "green",
  };

  const statusTextMap = {
    1: "Belum Bayar",
    2: "Sedang Disewa",
    3: "Dibatalkan",
    4: "Selesai",
  };

  const statusMap = {
    belum_bayar: 1,
    sedang_disewa: 2,
    dibatalkan: 3,
    selesai: 4,
  };

  const orderStatus = statusMap[order.status];
  const tagColor = statusColorMap[orderStatus];
  const tagText = statusTextMap[orderStatus];

  const transactionMethodText =
    order.transaction_method === "transfer" ? "Transfer via BCA" : "Tunai";

  const transactionEvidenceText = order.transaction_evidence_image
    ? "Sudah Dikirim"
    : "Belum Dikirim";

  const transactionEvidenceStatusText =
    order.transaction_evidence_status === null
      ? "Sedang dicek"
      : order.transaction_evidence_status
      ? "Valid"
      : "Invalid";

  const handleCancel = () => {
    setIsCancelModalVisible(true);
  };

  const handleCancelConfirm = () => {
    setIsCancelModalVisible(false);
    // setIsReasonModalVisible(true);
  };

  // const handleReasonSubmit = () => {
  //   setIsReasonModalVisible(false);
  //   notification.success({
  //     message: "Pesanan Dibatalkan",
  //     description: "Pesanan Anda telah dibatalkan.",
  //   });
  // };

  return (
    <>
      <div className="flex flex-col justify-center mb-4">
        <div className="flex justify-end">
          {orderStatus && <Tag color={tagColor}>{tagText}</Tag>}
        </div>
        <div className="">
          <OrderProduct productItems={productItems} />
        </div>
        <div className="my-6 px-2">
          <div className="flex flex-row justify-between mb-2">
            <p className="">Jumlah Barang:</p>
            <p className="font-semibold">{order.transaction_item_count}</p>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <p className="">Total Harga:</p>
            <p className="font-semibold">
              Rp{numberWithCommas(order.transaction_total_price)}
            </p>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <p className="">Metode Pembayaran:</p>
            <p className="font-semibold">{transactionMethodText}</p>
          </div>
          {order.transaction_method === "transfer" && (
            <>
              <div className="flex flex-row justify-between mb-2">
                <p className="">Bukti Pembayaran:</p>
                <p className="font-semibold">{transactionEvidenceText}</p>
              </div>
              <div className="flex flex-row justify-between mb-2">
                <p className="">Status Konfirmasi Bukti:</p>
                <p className="font-semibold">{transactionEvidenceStatusText}</p>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row w-full gap-3 mb-4 px-1">
          {order.status === "belum_bayar" && (
            <>
              <OutlineButton
                text="Batalkan"
                className="w-full"
                onClick={handleCancel}
              />
              <PrimaryButton
                text="Bayar"
                className="w-full"
                onClick={() => navigate(`/payment/${order.id}`)}
              />
            </>
          )}
          {order.status === "sedang_disewa" && (
            <>
              <PrimaryButton
                text="Hubungi Admin"
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://api.whatsapp.com/send/?phone=6282228034763&text&type=phone_number&app_absent=0",
                    "_blank"
                  )
                }
              />
            </>
          )}
          {(order.status === "dibatalkan" || order.status === "selesai") && (
            <PrimaryButton
              text="Sewa Lagi"
              className="w-full"
              onClick={() => navigate(`/catalogue`)}
            />
          )}
        </div>
        <hr className="w-full border-t-2 border-gray-100 opacity-20 mt-12 mb-6 rounded-full -z-50" />
      </div>

      {/* Notifikasi pembatalan */}
      <Modal
        title="Konfirmasi Pembatalan"
        open={isCancelModalVisible}
        onOk={handleCancelConfirm}
        onCancel={() => setIsCancelModalVisible(false)}
        okText="Iya"
        cancelText="Tidak"
      >
        <p>Apakah anda yakin akan membatalkan pesanan ini?</p>
      </Modal>

      {/* Notifikasi alasan pembatalan */}
      {/* <Modal
        title="Alasan Pembatalan"
        open={isReasonModalVisible}
        onOk={handleReasonSubmit}
        onCancel={() => setIsReasonModalVisible(false)}
        okText="Kirim"
        cancelText="Batal"
      >
        <div className="flex flex-col">
          <Radio.Group
            onChange={(e) => setSelectedReason(e.target.value)}
            value={selectedReason}
          >
            <Radio value="reason1">Alasan 1</Radio>
            <Radio value="reason2">Alasan 2</Radio>
            <Radio value="reason3">Alasan 3</Radio>
            <Radio value="reason4">Alasan Lainnya</Radio>
          </Radio.Group>
          {selectedReason === "reason4" && (
            <Input.TextArea
              rows={4}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Tuliskan alasan pembatalan"
              className="mt-2"
            />
          )}
        </div>
      </Modal> */}
    </>
  );
};

export { PopularProduct, ReviewUser, ProductCard, OrderCardMobile };
