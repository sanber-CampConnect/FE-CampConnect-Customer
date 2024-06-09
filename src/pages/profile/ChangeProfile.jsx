import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/atoms/Buttons";
import { editProfile } from "../../services/api";
import { notification } from "antd";

const ChangeProfile = (props) => {
  const { setSection, section, childData, onProfileUpdate } = props;
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    photo_profile: "",
  });

  useEffect(() => {
    if (section === "edit" && childData) {
      setFormData({
        username: childData.username || "",
        fullname: childData.fullname || "",
        email: childData.email || "",
        phone: childData.phone || "",
      });
    }
  }, [section, childData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Received values of form: ", formData);
    editProfile(formData)
      .then((res) => {
        if (res) {
          notification.success({
            message: "Sukses",
            description: "Sukses memperbarui data profil!",
          });
          if (onProfileUpdate) {
            onProfileUpdate(formData);
          }
          setSection("default");
        }
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Error",
          description: "Failed to update profile.",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="block mb-2 text-base font-medium text-gray-900 "
          >
            Nama Akun
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 text-gray-900 text-base rounded-lg focus:outline-primary 0 block w-full p-2.5"
            placeholder="Masukkan nama akun"
            required
          />
        </div>
        <div>
          <label
            htmlFor="fullname"
            className="block mb-2 text-base font-medium text-gray-900 "
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="bg-gray-50 text-gray-900 text-base rounded-lg focus:outline-primary 0 block w-full p-2.5"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-base font-medium text-gray-900 "
          >
            Alamat Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 text-gray-900 text-base rounded-lg focus:outline-primary 0 block w-full p-2.5"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-base font-medium text-gray-900"
          >
            Nomor Telepon
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone === " " ? "" : formData.phone}
            onChange={handleChange}
            className="bg-gray-50 text-gray-900 text-base rounded-lg focus:outline-primary 0 block w-full p-2.5"
            placeholder="081234567890"
            pattern="08[0-9]{8,11}"
            required
          />
        </div>
      </div>
      <PrimaryButton
        text="Simpan"
        type="submit"
        className="w-full text-white"
      />
    </form>
  );
};

export default ChangeProfile;
