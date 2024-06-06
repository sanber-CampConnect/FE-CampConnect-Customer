import { useState, useEffect } from "react";
import { PrimaryButton } from "../../components/atoms/Buttons";

const ChangeProfile = (props) => {
  const { setSection, section, childData } = props;
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    phone: "",
    photo_profile: "",
  });

  useEffect(() => {
    if (section === "edit" && childData) {
      setFormData({
        username: childData.username || "",
        full_name: childData.full_name || "",
        email: childData.email || "",
        phone: childData.phone || "",
      });
    } else {
      setFormData({
        username: "",
        full_name: "",
        email: "",
        phone: "",
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
            htmlFor="full_name"
            className="block mb-2 text-base font-medium text-gray-900 "
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="full_name"
            value={formData.full_name}
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
            value={formData.phone}
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
