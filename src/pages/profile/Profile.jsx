import { useState, useEffect } from "react";
import PhotoProfile from "../../assets/images/photo-profile.svg";
import ChangeProfile from "./ChangeProfile";

const Profile = () => {
  const [section, setSection] = useState("default");
  const [childData, setChildData] = useState({});
  const [data, setData] = useState({
    name: "Alex Rawles",
    email: "alexarawles@gmail.com",
    photo_profile: PhotoProfile,
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

  return (
    <>
      <div className="account-user flex flex-row justify-start space-x-4 mb-8">
        <img src={data.photo_profile} alt={data.name} />
        <div className="flex flex-col justify-center space-y-2">
          <h5 className="text-lg font-medium">{data.name}</h5>
          <p className="text-neutral text-base font-thin">{data.email}</p>
        </div>
      </div>
      <div className="bg-[#F5F1F1] rounded-xl p-4">
        {section === "default" && (
          <ul className="space-y-6">
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-person-fill"></i>
              <a
                href="/edit-profile"
                className="block text-black rounded md:p-0"
                aria-current="page"
              >
                Sunting Profil
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-lock-fill"></i>
              <a
                href="/change-password"
                className="block text-black rounded md:p-0"
                aria-current="page"
              >
                Ubah Kata Sandi
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-box-arrow-right"></i>
              <a
                href="/logout"
                className="block text-black rounded md:p-0"
                aria-current="page"
              >
                Keluar Akun
              </a>
            </li>
            <li className="flex flex-row items-center space-x-2">
              <i className="bi bi-trash3-fill"></i>
              <a
                href="/delete-account"
                className="block text-black rounded md:p-0"
                aria-current="page"
              >
                Hapus Akun
              </a>
            </li>
          </ul>
        )}
        {section === "edit" && (
          <ChangeProfile
            childData={childData}
            setSection={setSection}
            section={section}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
