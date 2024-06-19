import { useState } from "react";
import { BackButton } from "../../components/atoms/Buttons";
import { LogoBCA } from "../../assets/images";
import { notification } from "antd";

const PaymentCode = () => {
  const [showATM, setShowATM] = useState(false);
  const [showMbanking, setShowMbanking] = useState(false);
  const [showIbanking, setShowIbanking] = useState(false);

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

  return (
    <>
      <div className="flex flex-col xl:items-center">
        <div className="flex items-center justify-between w-10/12 xl:w-3/5 pr-4 xl:pr-72">
          <BackButton />
          <h3 className="font-medium text-lg">Payment Code</h3>
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
                  Konfirmasi Detail Transfer: Periksa dan tekan &quot;Ya&quot;.
                </li>
                <li>
                  Simpan Bukti Transfer: Ambil dan simpan struk bukti transfer.
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
                  Konfirmasi Detail Transfer: Periksa dan tekan &quot;OK&quot;.
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
                <li>Masukkan Respon KeyBCA: Ketik respon dari KeyBCA Anda.</li>
                <li>
                  Simpan Bukti Transfer: Cetak atau screenshot bukti transfer.
                </li>
              </ol>{" "}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentCode;
