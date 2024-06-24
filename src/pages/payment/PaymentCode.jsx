import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/atoms/Buttons";
import { LogoBCA } from "../../assets/images";
import { notification, Modal, Button, Spin } from "antd";
import { useParams } from "react-router-dom";
import { submitTransactionEvidence } from "../../services/api";
import { getProductOrder } from "../../services/api";
import { formatDate, formatTime, numberWithCommas } from "../../utils/Helper";

const PaymentCode = () => {
  const { transactionId, orderId } = useParams();
  const [showATM, setShowATM] = useState(false);
  const [showMbanking, setShowMbanking] = useState(false);
  const [showIbanking, setShowIbanking] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    getDataOrder();
  }, []);

  const getDataOrder = () => {
    setLoading(true);
    getProductOrder(orderId)
      .then((res) => {
        setDataOrder(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleTutorialATM = () => {
    setShowATM(!showATM);
  };
  const toggleMbanking = () => {
    setShowMbanking(!showMbanking);
  };
  const toggleIbanking = () => {
    setShowIbanking(!showIbanking);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("0405232913").then(() => {
      notification.success({
        message: "Nomor Rekening Disalin",
        description: "Nomor rekening berhasil disalin ke clipboard.",
        placement: "topRight",
        duration: 2,
      });
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(previewUrl);
      setPreviewVisible(true);
    }
  };

  const handleModalCancel = () => {
    setPreviewVisible(false);
    setFile(null);
    setPreviewUrl(null);
  };

  const handleButtonSubmitEvidence = async () => {
    if (!file) {
      console.log("No file selected.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await submitTransactionEvidence(transactionId, formData);
      if (response.status === 201) {
        notification.success({
          message: "Bukti Transfer Dikirim",
          description: "Bukti transfer berhasil dikirim.",
          placement: "topRight",
          duration: 2,
        });
      } else {
        notification.error({
          message: "Gagal Mengirim Bukti Transfer",
          description: "Terjadi kesalahan saat mengirim bukti transfer.",
          placement: "topRight",
          duration: 2,
        });
      }
    } catch (error) {
      console.error("Error submitting file:", error);
      notification.error({
        message: "Gagal Mengirim Bukti Transfer",
        description: "Terjadi kesalahan saat mengirim bukti transfer.",
        placement: "topRight",
        duration: 2,
      });
    } finally {
      setLoading(false);
      setPreviewVisible(false);
      setFile(null);
      setPreviewUrl(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  console.log(dataOrder.payment_due);

  return (
    <>
      <div className="xl:align-middle xl:justify-center xl:items-center">
        <div className="flex flex-col xl:items-center">
          <div className="flex items-center justify-center">
            <h3 className="font-medium text-lg">Payment</h3>
          </div>
          <div className="flex flex-col gap-2 text-center mt-4">
            <h1 className="text-md font-normal">Tenggat Pembayaran</h1>
            <p className="text-md font-semibold text-failed">
              {formatDate(dataOrder.payment_due)},{" "}
              {formatTime(dataOrder.payment_due)}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center gap-2 mt-6">
            <img src={LogoBCA} alt="BCA" className="w-8 h-auto" />
            <h2 className="font-semibold text-lg">Bank BCA</h2>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <p className="text-primary text-xl font-medium">0405232913</p>
            <i
              className="bi bi-copy text-primary text-lg cursor-pointer"
              onClick={copyToClipboard}
            ></i>
          </div>
          <div className="mt-8 flex justify-start text-start">
            <p className="text-neutral">
              Tips. Anda dapat melihat halaman ini pada page Order &gt; Bayar
            </p>
          </div>
          <div className="flex flex-col mt-8 xl:w-2/5">
            <div
              className="flex flex-row cursor-pointer"
              onClick={toggleTutorialATM}
            >
              <p className="font-medium text-primary">Pembayaran via ATM</p>
              <i
                className={`bi ${
                  showATM ? "bi-chevron-up" : "bi-chevron-down"
                } ml-2`}
              ></i>
            </div>
            {showATM && (
              <div className="mt-2">
                <ol className="list-decimal ml-6">
                  <li>
                    Masukkan Kartu ATM: Masukkan kartu ATM BCA dan pilih bahasa.
                  </li>
                  <li>Masukkan PIN ATM: Ketik PIN ATM Anda.</li>
                  <li>
                    Pilih Menu &quot;Transaksi Lainnya&quot;: Tekan
                    &quot;Transaksi Lainnya&quot;.
                  </li>
                  <li>
                    Pilih Menu &quot;Transfer&quot;: Tekan &quot;Transfer&quot;.
                  </li>
                  <li>
                    Pilih &quot;Ke Rekening BCA&quot;: Pilih &quot;Ke Rekening
                    BCA&quot;.
                  </li>
                  <li>Masukkan Nomor Rekening Tujuan: Ketik 0405232913.</li>
                  <li>
                    Masukkan Jumlah Transfer: Ketik jumlah uang yang akan
                    ditransfer.
                  </li>
                  <li>
                    Konfirmasi Detail Transfer: Periksa dan tekan
                    &quot;Ya&quot;.
                  </li>
                  <li>
                    Simpan Bukti Transfer: Ambil dan simpan struk bukti
                    transfer.
                  </li>
                </ol>
              </div>
            )}
            <div
              className="flex flex-row cursor-pointer mt-4"
              onClick={toggleMbanking}
            >
              <p className="font-medium text-primary">
                Pembayaran via Mobile Banking
              </p>
              <i
                className={`bi ${
                  showMbanking ? "bi-chevron-up" : "bi-chevron-down"
                } ml-2`}
              ></i>
            </div>
            {showMbanking && (
              <div className="mt-2">
                <ol className="list-decimal ml-6">
                  <li>Buka Aplikasi m-BCA: Login dengan kode akses Anda.</li>
                  <li>
                    Pilih Menu &quot;m-Transfer&quot;: Pilih
                    &quot;m-Transfer&quot;.
                  </li>
                  <li>
                    Pilih &quot;Transfer ke Rekening BCA&quot;: Tekan
                    &quot;Transfer ke Rekening BCA&quot;.
                  </li>
                  <li>
                    Masukkan Detail Transfer: Ketik 0405232913 dan jumlah
                    transfer.
                  </li>
                  <li>
                    Konfirmasi Detail Transfer: Periksa dan tekan
                    &quot;OK&quot;.
                  </li>
                  <li>Masukkan PIN m-BCA: Ketik PIN m-BCA Anda.</li>
                  <li>Simpan Bukti Transfer: Screenshot bukti transfer.</li>
                </ol>
              </div>
            )}
            <div
              className="flex flex-row cursor-pointer mt-4"
              onClick={toggleIbanking}
            >
              <p className="font-medium text-primary">
                Pembayaran via Internet Banking
              </p>
              <i
                className={`bi ${
                  showIbanking ? "bi-chevron-up" : "bi-chevron-down"
                } ml-2`}
              ></i>
            </div>
            {showIbanking && (
              <div className="mt-2">
                <ol className="list-decimal ml-6">
                  <li>Buka Situs KlikBCA: Login dengan User ID dan PIN.</li>
                  <li>
                    Pilih Menu &quot;Transfer Dana&quot;: Tekan &quot;Transfer
                    Dana&quot;.
                  </li>
                  <li>
                    Pilih &quot;Ke Rekening BCA&quot;: Pilih &quot;Ke Rekening
                    BCA&quot;.
                  </li>
                  <li>
                    Masukkan Detail Transfer: Ketik 0405232913 dan jumlah
                    transfer.
                  </li>
                  <li>
                    Konfirmasi Detail Transfer: Periksa dan klik
                    &quot;Lanjut&quot;.
                  </li>
                  <li>
                    Masukkan Respon KeyBCA: Ketik respon dari KeyBCA Anda.
                  </li>
                  <li>
                    Simpan Bukti Transfer: Cetak atau screenshot bukti transfer.
                  </li>
                </ol>{" "}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-8">
            <PrimaryButton
              text="Kirim Bukti Transfer"
              onClick={() => document.getElementById("fileInput").click()}
            />
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </div>
        </div>
      </div>

      <Modal
        title="Preview Bukti Pembayaran"
        open={previewVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Batalkan
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleButtonSubmitEvidence}
          >
            Kirim
          </Button>,
        ]}
      >
        <div className="flex justify-center items-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "70vh" }}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default PaymentCode;
