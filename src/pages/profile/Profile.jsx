import { useState, useEffect } from "react";
import { photoProfile } from "../../assets/images/index";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import {
  getProfile,
  logOut,
  deleteAccount,
  requestEmailVerification,
  editProfile,
  getMediaUser,
} from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { OutlineButton } from "../../components/atoms/Buttons";
import {
  PopUpChangePicture,
  PopUpCropPicture,
} from "../../components/atoms/Popup";

const Profile = () => {
  const [section, setSection] = useState("default");
  const [childData, setChildData] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  // handle change photo profile
  const [currentImage, setCurrentImage] = useState(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [isChangePictureOpen, setIsChangePictureOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [dataPhotoProfile, setDataPhotoProfile] = useState(null);

  useEffect(() => {
    getDataProfile();
  }, []);

  useEffect(() => {
    if (data && data.image && data.image.trim() !== "") {
      const imageUrl = getMediaUser(data.image);
      setDataPhotoProfile(imageUrl);
    }
  }, [data]);

  useEffect(() => {
    if (section === "default") {
      setChildData({});
    }
  }, [section]);

  const getDataProfile = () => {
    setLoading(true);
    getProfile()
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Keluar Akun",
      text: "Apakah Anda yakin ingin keluar dari akun Anda?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      customClass: {
        confirmButton: "swal2-confirm",
        cancelButton: "swal2-cancel",
        actions: "swal2-actions",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
        dispatch({ type: "LOGOUT" });
        Swal.fire({
          title: "Berhasil",
          text: "Anda telah berhasil keluar dari akun Anda.",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Hapus Akun",
      text: "Akun Anda akan dihapus secara permanen dan data Anda tidak akan tersimpan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
      customClass: {
        confirmButton: "swal2-confirm",
        cancelButton: "swal2-cancel",
        actions: "swal2-actions",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount(data.id)
          .then(() => {
            logOut();
            dispatch({ type: "LOGOUT" });
            Swal.fire({
              title: "Dihapus",
              text: "Akun Anda telah berhasil dihapus.",
              icon: "success",
            }).then(() => {
              navigate("/auth/login");
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error",
              text: "Terjadi kesalahan saat menghapus akun.",
              icon: "error",
            });
            console.error(err);
          });
      }
    });
  };

  const handleRequestEmailVerification = () => {
    if (!data || !data.email) {
      Swal.fire({
        title: "Error",
        text: "Email tidak ditemukan.",
        icon: "error",
      });
      return;
    }

    requestEmailVerification(data.email)
      .then(() => {
        Swal.fire({
          title: "Berhasil",
          text: "Permintaan verifikasi email telah dikirim.",
          icon: "success",
        });
      })
      .catch((err) => {
        if (
          err.response.data.info ===
          "This email has been verified. Verification is not needed"
        ) {
          Swal.fire({
            title: "Gagal",
            text: "Anda sudah melakukan verifikasi email",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Gagal",
            text: "Terjadi kesalahan saat mengirim permintaan verifikasi email.",
            icon: "error",
          });
        }
        console.error(err);
      });
  };

  const editData = (record) => {
    setChildData(record);
    setSection("edit");
  };

  const changePass = () => {
    setSection("change_pass");
  };

  const handleProfileUpdate = (updatedData) => {
    setData(updatedData);
  };

  // handle change photo profile
  const handleOpenChangePicture = () => {
    setIsChangePictureOpen(true);
  };

  const handleCloseChangePicture = () => {
    setIsChangePictureOpen(false);
    setCurrentImage(null);
  };

  const handleSetImage = (imageData) => {
    setCurrentImage(imageData);
    setIsChangePictureOpen(false);
    setIsCropOpen(true);
  };

  const handleSaveCroppedImage = async (croppedImageFile) => {
    const formData = new FormData();
    formData.append("image", croppedImageFile);

    formData.append("email", data.email);
    formData.append("fullname", data.fullname);
    formData.append("id", data.id);
    formData.append("is_verified", data.is_verified);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("username", data.username);

    try {
      const response = await editProfile(formData);
      Swal.fire({
        title: "Berhasil",
        text: "Foto profil berhasil diubah.",
        icon: "success",
      });
      console.log(response);
      setIsCropOpen(false);
      getDataProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat memperbarui foto profil.",
        icon: "error",
      });
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log("Crop complete", croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-center">
      {/* Sidebar */}
      <div className="w-full md:w-1/3">
        {data && (
          <div className="account-user flex flex-row justify-start space-x-4 mb-3 bg-[#F5F1F1] p-4 rounded-xl">
            <img
              src={dataPhotoProfile || photoProfile}
              alt={data.username}
              className="w-24 h-24"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <div className="flex flex-col justify-center space-y-2">
              <h5 className="text-lg font-medium">{data.username}</h5>
              <p className="text-neutral text-base font-thin">{data.email}</p>
              <OutlineButton
                text="Ubah Foto Profil"
                className="text-sm w-full border-primary"
                onClick={handleOpenChangePicture}
              />
            </div>
          </div>
        )}

        <div className="my-4 xl:my-8 rounded-xl bg-[#F5F1F1]">
          <ul className="space-y-6 p-4">
            <li className="flex flex-row items-center space-x-3">
              <div className="w-6 text-center">
                <i className="bi bi-person-fill text-md"></i>
              </div>
              <a
                className="block text-black rounded md:p-0 cursor-pointer text-md"
                aria-current="page"
                onClick={() => editData(data)}
              >
                Sunting Profil
              </a>
            </li>
            <li className="flex flex-row items-center space-x-3">
              <div className="w-6 text-center h-auto">
                <i className="bi bi-lock-fill text-md"></i>
              </div>
              <a
                className="block text-black rounded md:p-0 cursor-pointer text-md"
                aria-current="page"
                onClick={() => changePass(data)}
              >
                Ubah Kata Sandi
              </a>
            </li>
            <li className="flex flex-row items-center space-x-3">
              <div className="w-6 text-center">
                <i className="bi bi-box-arrow-right text-md"></i>
              </div>
              <a
                href="#"
                className="block text-black rounded md:p-0 text-md"
                aria-current="page"
                onClick={handleLogout}
              >
                Keluar Akun
              </a>
            </li>
            <li className="flex flex-row items-center space-x-3">
              <div className="w-6 text-center">
                <i className="bi bi-trash3-fill text-md"></i>
              </div>
              <a
                href="#"
                className="block text-black rounded md:p-0 text-md"
                aria-current="page"
                onClick={handleDeleteAccount}
              >
                Hapus Akun
              </a>
            </li>
          </ul>
        </div>
      </div>

      {data && section === "default" && (
        <div className="w-full md:w-1/2 max-h-1/2 h-fit bg-[#F5F1F1] rounded-xl p-6 xl:p-8">
          <div className="grid grid-rows xl:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium text-base mb-1">Nama Lengkap</label>
              <h1 className="text-neutral">{data.fullname}</h1>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-base mb-1">Nama Akun</label>
              <h1 className="text-neutral">{data.username}</h1>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-base mb-1">
                Nomor Handphone
              </label>
              <h1 className="text-neutral">
                {data.phone == " "
                  ? "Anda belum memasukkan nomor telfon"
                  : data.phone}
              </h1>
            </div>
            <div className="flex flex-col">
              <label className="font-medium text-base mb-1">Email</label>
              <div className="flex flex-row gap-2">
                <h1 className="text-neutral">{data.email}</h1>
                {data.is_verified === 0 ? (
                  <i
                    className="bi bi-exclamation-circle-fill text-warning"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Anda belum melakukan verifikasi email"
                  ></i>
                ) : (
                  <i
                    className="bi bi-check-circle-fill text-success"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Anda sudah melakukan verifikasi email"
                  ></i>
                )}
              </div>
              <button
                onClick={handleRequestEmailVerification}
                className="flex flex-col text-base font-semibold mt-2 text-neutral hover:text-primary underline"
              >
                Verifikasi Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {section !== "default" && (
        <div className="w-full md:w-1/2 max-h-1/2 h-fit bg-[#F5F1F1] rounded-xl p-8">
          {section === "edit" && (
            <ChangeProfile
              childData={childData}
              setSection={setSection}
              section={section}
              onProfileUpdate={handleProfileUpdate}
            />
          )}
          {section === "change_pass" && (
            <ChangePassword setSection={setSection} section={section} />
          )}
        </div>
      )}

      {/* Popups */}
      <PopUpChangePicture
        user={data}
        isOpen={isChangePictureOpen}
        onClose={handleCloseChangePicture}
        setImage={handleSetImage}
        onCrop={() => setIsCropOpen(true)}
      />

      <PopUpCropPicture
        isOpen={isCropOpen}
        onClose={() => setIsCropOpen(false)}
        image={currentImage}
        onCropComplete={handleCropComplete}
        onSave={handleSaveCroppedImage}
      />
    </div>
  );
};

export default Profile;
