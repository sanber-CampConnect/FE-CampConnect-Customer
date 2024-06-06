import { useState, useEffect } from "react";
import PhotoProfile from "../../assets/images/photo-profile.svg";
import ChangeProfile from "./ChangeProfile";
import ChangePassword from "./ChangePassword";
import { OutlineButton } from "../../components/atoms/Buttons";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Profile = () => {
  const [section, setSection] = useState("default");
  const [childData, setChildData] = useState({});
  const [data, setData] = useState({
    username: "alexrawles",
    full_name: "Alex Rawles",
    email: "alexarawles@gmail.com",
    photo_profile: PhotoProfile,
    phone: "081234567890",
  });

  useEffect(() => {
    if (section === "default") {
      setChildData({});
    }
  }, [section]);

  const editData = (record) => {
    setChildData(record);
    setSection("edit");
  };

  const changePass = () => {
    setSection("change_pass");
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
        Swal.fire({
          title: "Berhasil",
          text: "Anda telah berhasil keluar dari akun Anda.",
          icon: "success",
        });
        // Logika untuk logout bisa ditambahkan di sini
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
        Swal.fire({
          title: "Dihapus",
          text: "Akun Anda telah berhasil dihapus.",
          icon: "success",
        });
        // Logika untuk menghapus akun bisa ditambahkan di sini
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
      {/* Sidebar */}
      <div className="w-full md:w-1/3">
        <div className="account-user flex flex-row justify-start space-x-4 mb-3 bg-[#F5F1F1] p-4 rounded-xl">
          <img src={data.photo_profile} alt={data.username} />
          <div className="flex flex-col justify-center space-y-2">
            <h5 className="text-lg font-medium">{data.full_name}</h5>
            <p className="text-neutral text-base font-thin">{data.email}</p>
          </div>
        </div>
        <div className="my-4 xl:my-8 rounded-xl bg-[#F5F1F1]">
          <ul className="space-y-6 p-4">
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-person-fill"></i>
              <a
                className="block text-black rounded md:p-0 cursor-pointer"
                aria-current="page"
                onClick={() => editData(data)}
              >
                Sunting Profil
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-lock-fill"></i>
              <a
                className="block text-black rounded md:p-0 cursor-pointer"
                aria-current="page"
                onClick={() => changePass(data)}
              >
                Ubah Kata Sandi
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-box-arrow-right"></i>
              <a
                href="#"
                className="block text-black rounded md:p-0"
                aria-current="page"
                onClick={handleLogout}
              >
                Keluar Akun
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-trash3-fill"></i>
              <a
                href="#"
                className="block text-black rounded md:p-0"
                aria-current="page"
                onClick={handleDeleteAccount}
              >
                Hapus Akun
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      {section !== "default" && (
        <div className="w-full md:w-1/2 max-h-1/2 h-fit bg-[#F5F1F1] rounded-xl px-4 py-8">
          {section === "edit" && (
            <ChangeProfile
              childData={childData}
              setSection={setSection}
              section={section}
            />
          )}
          {section === "change_pass" && (
            <ChangePassword setSection={setSection} section={section} />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
