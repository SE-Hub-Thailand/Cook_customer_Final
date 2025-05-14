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
import { createUser } from "../api/strapi/userApi";
import { handlePhotoUpload } from "../api/strapi/uploadApi";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

function Register() {
  const displayName = localStorage.getItem("displayName");
  const pictureUrl = localStorage.getItem("pictureUrl");
  const userId = localStorage.getItem("lineId");

  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun",
    },
  });

  // const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [address, setAddress] = useState({
    houseNumber: "",
    street: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState({
    houseNumber: false,
    province: false,
    district: false,
    subDistrict: false,
  });
  const [formData, setFormData] = useState({
    username: displayName || "",
    password: "",
    fullName: "",
    telNumber: "",
    gender: "",
    address: "",
    photoImage: pictureUrl || "",
    checkedOne: false,
  });

  useEffect(() => {
    setIsFormValid(
      formData.username &&
        formData.fullName &&
        formData.telNumber &&
        formData.gender &&
        address.houseNumber &&
        address.province &&
        address.district &&
        address.subDistrict &&
        formData.checkedOne
    );
  }, [formData, address]);

  // โหลดข้อมูลจังหวัด
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
      setErrors((prev) => ({ ...prev, [name]: !value }));
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
      username: formData.username || `cook${userId}`,
      email: `cook${userId}@cook.com`,
      password: "cookcook",
      lineId: userId,
      userType: "customer",
      photoImage: imageId,
      fullName: formData.fullName,
      telNumber: formData.telNumber,
      gender: formData.gender,
      address: `${address.houseNumber} ${address.street} ${address.subDistrict} ${address.district} ${address.province} ${address.postalCode}`,
      point: 0,
    };

    try {
      const response = await createUser(userData);
      if (response.jwt) {
        localStorage.setItem("token", response.jwt);
        setShowModal(true);
      }
    } catch (error) {
      console.error("User registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <ThemeProvider theme={theme}>
      {showModal && (
        <Alert
          title="User registered successfully!"
          message={`Welcome, ${formData.username}! We’re so happy to have you.`}
          path="/home"
          status="success"
        />
      )}

      <FileUpload
        photoImage={formData.photoImage}
        onFileChange={handleFileChange}
      />

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
            className="w-full bg-white mt-4"
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
            className="w-full bg-white mt-4"
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

        <div className="w-full px-2 mt-4">
          <TextField
            label="บ้านเลขที่"
            name="houseNumber"
            className="w-full bg-white mt-4"
            value={address.houseNumber}
            onChange={handleInputChange}
            error={errors.houseNumber}
          />
        </div>

        <div className="w-full px-2 mt-4">
          <TextField
            label="ถนน"
            name="street"
            className="w-full bg-white mt-4"
            value={address.street}
            onChange={handleInputChange}
            error={errors.street}
          />
        </div>

        <div className="w-full px-2 mt-4">
          <FormControl className="w-full bg-white mt-4">
            <InputLabel>จังหวัด</InputLabel>
            <Select
              value={address.province}
              onChange={handleProvinceChange}
              error={errors.province}
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
                error={errors.district}
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
                error={errors.subDistrict}
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
        </div>

          {/* <Checkbox
            id="checkedOne"
            checked={formData.checkedOne}
            onChange={handleInputChange}
            required
          />
          <span>
            ยินยอมให้จัดเก็บข้อมูลส่วนตัว
          </span>
        </div>

        <Button
          type="submit"
          disabled={!isFormValid || loading || showModal}
          className="w-full bg-green-500 mt-4"
        >
          ลงทะเบียน
        </Button> */}
                  <Checkbox
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
          </span>
        </div>
        <div className="container mx-auto px-4">
        <button
          type="submit"
          disabled={!isFormValid || loading || showModal}
          className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white font-bold transition duration-300 ${
            isFormValid && !showModal
              ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
              : "bg-slate-300 cursor-not-allowed"
          } ${isFormValid && !showModal ? "cursor-pointer" : ""}`}
        >
          ลงทะเบียน
        </button>
        </div>
      </form>
      
    </ThemeProvider>
  );
}

export default Register;