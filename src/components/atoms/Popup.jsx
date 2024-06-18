import { useState } from "react";
import { Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../../utils/cropPhotoProfile";
import { photoProfile } from "../../assets/images";

export const PopUpChangePicture = ({
  user,
  isOpen,
  onClose,
  setImage,
  onCrop,
}) => {
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      console.log("Uploaded file:", info.file.originFileObj);
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        onCrop();
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      title="Ubah Foto Profil"
      className="text-center items-start"
    >
      <div className="flex flex-col gap-3 items-center justify-center">
        <img
          src={
            user && user.image && user.image.trim() !== ""
              ? user.image
              : photoProfile
          }
          alt={user && user.username}
          className="w-24 h-24"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Upload
          name="photo"
          showUploadList={false}
          customRequest={({ file, onSuccess }) => {
            console.log("Custom request file:", file);
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
              onCrop();
              onSuccess("ok");
            };
            reader.readAsDataURL(file);
          }}
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>
            Ambil Foto profil dari galeri
          </Button>
        </Upload>
      </div>
    </Modal>
  );
};

export const PopUpCropPicture = ({ isOpen, onClose, image, onSave }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleSave = async () => {
    try {
      const croppedImageFile = await getCroppedImg(image, croppedAreaPixels);
      console.log("Cropped image file:", croppedImageFile);
      onSave(croppedImageFile);
      onClose();
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      title="Ubah Foto Profil"
      style={{
        top: 20,
        backgroundColor: "white",
        borderRadius: "24px",
        paddingBottom: "0px",
        marginTop: "12px",
        textAlign: "center",
      }}
      width={600}
    >
      <div
        style={{
          height: "400px",
          width: "100%",
          position: "relative",
          backgroundColor: "white",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Button
          onClick={handleSave}
          style={{ width: "100%", marginBottom: "12px" }}
        >
          Simpan
        </Button>
      </div>
    </Modal>
  );
};
