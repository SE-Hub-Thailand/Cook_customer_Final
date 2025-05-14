import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload.jsx";
import Alert from "../components/Alert.jsx";
import {
  Checkbox,
  TextField,
  createTheme,
  ThemeProvider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import data from "../components/data.json";
import { updateUser } from "../api/strapi/userApi";
import { handlePhotoUpload } from "../api/strapi/uploadApi";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
// import { a } from "vitest/dist/chunks/suite.CcK46U-P.js";

function UpdateUserProfile() {
  const API_URL = import.meta.env.VITE_API_URL
  const userId = localStorage.getItem("lineId");
  const token = localStorage.getItem("token");

  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun",
    },
  });

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [user, setUser] = useState(null);

  const [address, setAddress] = useState({
    houseNumber: "",
    street: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    telNumber: "",
    gender: "",
    photoImage: "",
    checkedOne: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        console.log("userData: ", userData);
        console.log("userData url: ", API_URL + userData.photoImage.url);

        const addressParts = userData.address.split(" ");
        console.log("addressParts[0]: ", addressParts[0]);
        console.log("addressParts[1]: ", addressParts[1]);
        console.log("addressParts[2]: ", addressParts[2]);
        console.log("addressParts[3]: ", addressParts[3]);
        console.log("addressParts[4]: ", addressParts[4]);
        console.log("addressParts[5]: ", addressParts[5]);
        
        setFormData({
          username: userData.username || "",
          fullName: userData.fullName || "",
          telNumber: userData.telNumber || "",
          gender: userData.gender || "",
          photoImage: API_URL + userData.photoImage.url || "",
          checkedOne: true, // Assume user already agreed previously
        });
        setAddress({
          houseNumber: addressParts[0] || "",
          street: addressParts[1] || "",
          subDistrict: addressParts[2] || "",
          district: addressParts[3] || "",
          province: addressParts[4] || "",
          postalCode: addressParts[5] || "",
        });
        console.log("address: ", address);
        // const isProvinceValid = provinces.includes(address.province);
        // const isDistrictValid = districts.includes(address.district);
        // const isSubDistrictValid = subDistricts.includes(address.subDistrict);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  useEffect(() => {
    setIsFormValid(
      formData.username &&
        formData.fullName &&
        formData.telNumber &&
        formData.gender &&
        // address.houseNumber &&
        // address.province &&
        // address.district &&
        // address.subDistrict &&
        formData.checkedOne
    );
  }, [formData, address]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const uniqueProvinces = [
        ...new Set(
          data
            .filter((entry) => entry.provinceList && entry.provinceList[0])
            .map((entry) => entry.provinceList[0].provinceName)
        ),
      ];
      setProvinces(uniqueProvinces);
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    if (name in address) {
      setAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [id || name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setAddress((prev) => ({
      ...prev,
      province: selectedProvince,
      district: "",
      subDistrict: "",
      postalCode: "",
    }));

    const filteredDistricts = data
      .filter(
        (entry) =>
          entry.provinceList &&
          entry.provinceList[0]?.provinceName === selectedProvince &&
          entry.districtList
      )
      .flatMap((entry) =>
        entry.districtList.map((d) => d.districtName)
      );
    setDistricts([...new Set(filteredDistricts)]); // ลบข้อมูลซ้ำ
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setAddress((prev) => ({
      ...prev,
      district: selectedDistrict,
      subDistrict: "",
      postalCode: "",
    }));

    const filteredSubDistricts = data
      .filter(
        (entry) =>
          entry.districtList &&
          entry.districtList.some((d) => d.districtName === selectedDistrict) &&
          entry.subDistrictList
      )
      .flatMap((entry) =>
        entry.subDistrictList.map((s) => s.subDistrictName)
      );
    setSubDistricts([...new Set(filteredSubDistricts)]); // ลบข้อมูลซ้ำ
  };

  const handleSubDistrictChange = (event) => {
    const selectedSubDistrict = event.target.value;
    const postal = data
      .find(
        (entry) =>
          entry.subDistrictList &&
          entry.subDistrictList.some((s) => s.subDistrictName === selectedSubDistrict)
      )
      ?.zipCode;

    setAddress((prev) => ({
      ...prev,
      subDistrict: selectedSubDistrict,
      postalCode: postal || "ไม่พบรหัสไปรษณีย์",
    }));
  };

  const handleFileChange = (file) => {
    setFormData((prev) => ({ ...prev, photoImage: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    let imageId = null;
    if (formData.photoImage) {
      const { url, id } = await handlePhotoUpload(formData.photoImage);
      formData.photoImage = url;
      imageId = id;
    }

    const userData = {
      username: formData.username,
      photoImage: imageId,
      fullName: formData.fullName,
      telNumber: formData.telNumber,
      gender: formData.gender,
      // address: `${address.houseNumber} ${address.street} ${address.subDistrict} ${address.district} ${address.province} ${address.postalCode}`,
    };

    try {
      // const response = await updateUser(userId, userData, token);
      const response = await updateUser(user?.id, userData, token);
      if (response) {
        setShowModal(true);
      }
    } catch (error) {
      console.error("User update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ThemeProvider theme={theme}>
      {showModal && (
        <Alert
          title="User data updated successfully!"
          message={`Hi, ${formData.username}! Your information has been updated successfully.`}
          path="/home"
          status="success"
        />
      )}

      <FileUpload photoImage={formData.photoImage} onFileChange={handleFileChange} />

      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="w-full px-2 mt-4">
            <TextField
              id="username"
              label="ชื่อผู้ใช้"
              variant="outlined"
              className="w-full bg-white"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full px-2 mt-4">
            <TextField
              id="fullName"
              label="ชื่อ-นามสกุล"
              variant="outlined"
              className="w-full bg-white"
              required
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full px-2 mt-4">
            <TextField
              id="telNumber"
              label="เบอร์โทร"
              variant="outlined"
              className="w-full bg-white"
              required
              value={formData.telNumber}
              onChange={handleInputChange}
              inputProps={{
                maxLength: 10,
                pattern: "[0-9]*",
                inputMode: "numeric",
              }}
            />
          </div>

          <div className="w-full px-2 mt-4">
            <FormControl className="w-full mt-4">
              <FormLabel>เพศ*</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="ชาย" />
                <FormControlLabel value="Female" control={<Radio />} label="หญิง" />
              </RadioGroup>
            </FormControl>
          </div>

          {/* <div className="w-full px-2 mt-4">
            <TextField
              label="บ้านเลขที่"
              name="houseNumber"
              className="w-full bg-white mt-4"
              value={address.houseNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full px-2 mt-4">
            <TextField
              label="ถนน"
              name="street"
              className="w-full bg-white mt-4"
              value={address.street}
              onChange={handleInputChange}
              // error={errors.street}
            />
          </div>

          <div className="w-full px-2 mt-4">
            <FormControl className="w-full bg-white mt-4">
              <InputLabel>จังหวัด</InputLabel>
              <Select
                value={address.province}
                onChange={handleProvinceChange}
              >
                {provinces.map((province) => (
                  <MenuItem key={province} value={province}>
                    {province}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="w-full px-2 mt-4">
            {address.province && (
              <FormControl className="w-full bg-white mt-4">
                <InputLabel>อำเภอ</InputLabel>
                <Select
                  value={address.district}
                  onChange={handleDistrictChange}
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          <div className="w-full px-2 mt-4">
            {address.district && (
              <FormControl className="w-full bg-white mt-4">
                <InputLabel>ตำบล</InputLabel>
                <Select
                  value={address.subDistrict}
                  onChange={handleSubDistrictChange}
                >
                  {subDistricts.map((subDistrict) => (
                    <MenuItem key={subDistrict} value={subDistrict}>
                      {subDistrict}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </div>

          <div className="w-full px-2 mt-4">
            {address.subDistrict && (
              <div className="mt-4">
                <strong>รหัสไปรษณีย์:</strong> {address.postalCode}
              </div>
            )}
          </div> */}

          <div className="w-full px-2 mt-4 bg-gray-200 rounded-lg p-4">
            <p className="text-lg font-bold">
              ที่อยู่{" "}
            </p>
            <p className="text-lg">
              {address?.houseNumber || ""} {address?.street || ""}{" "}
              {address?.subDistrict || ""} {address?.district || ""}{" "}
              {address?.province || ""} {address?.postalCode || ""}
            </p>
          </div>

          {/* <Checkbox
            id="checkedOne"
            checked={formData.checkedOne}
            onChange={handleInputChange}
            required
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
          />
          <span>
            <strong>กุ๊ก</strong>ให้ความสำคัญเกี่ยวกับความปลอดภัยข้อมูลของคุณ{" "}
            <span className="text-left leading-loose">
              และเพื่อให้คุณมั่นใจว่า
              กุ๊กมีความมุ่งมั่นที่จะให้ความคุ้มครองและดำเนินการด้วยความรับผิดชอบต่อการเก็บรวบรวม
              ใช้ เปิดเผย และโอนข้อมูลของคุณ กุ๊กจึงขอความยินยอมจากคุณ
            </span>
          </span> */}
        </div>
        <div className="container mx-auto px-4">
          <button
            type="submit"
            disabled={!isFormValid || loading || showModal}
            className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white font-bold transition duration-300 ${
              isFormValid && !showModal
                ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
                : "bg-slate-300 cursor-not-allowed"
            }`}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default UpdateUserProfile;
