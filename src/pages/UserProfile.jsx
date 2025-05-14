import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import FileUpload from "../components/FileUpload.jsx";
import { Checkbox, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WebcamCapture from "../components/WebcamCapture.jsx";
import { getUser } from "../api/strapi/userApi";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
function UserProfile() {

  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun",
    },
  });

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    telNumber: "",
    gender: "",
    address: "",
    cardID: "",
    photoImage: "",
    checkedOne: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('lineId');
  // const token = import.meta.env.VITE_TOKEN_TEST;
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const {
      username,
      password,
      fullName,
      telNumber,
      gender,
      address,
      cardID,
      checkedOne,
    } = formData;

    setIsFormValid(
      username &&
      password &&
      fullName &&
      telNumber &&
      gender &&
      address &&
      cardID &&
      checkedOne
    );
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit logic goes here, possibly sending formData to a server
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const userData = await getUser(userId, token);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleImageCapture = (imageSrc) => {
    setFormData((prevData) => ({
      ...prevData,
      photoImage: imageSrc,
    }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <FileUpload />
      <h1> Hello, {user.username}</h1>
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
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
            <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
              <TextField
                id="password"
                label="รหัสผ่าน"
                type="password"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
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
            <div className="w-full md:w-1/2 px-2 mt-4">
              <TextField
                id="telNumber"
                label="เบอร์โทร"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.telNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <FormControl>
                <FormLabel>เพศ</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="ชาย"
                    control={<Radio />}
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="หญิง"
                    control={<Radio />}
                    label="หญิง"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                id="address"
                placeholder="ที่อยู่"
                multiline
                rows={4}
                className="w-full bg-white"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                id="cardID"
                label="หมายเลขบัตรประจำตัวประชาชน"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.cardID}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <WebcamCapture onCapture={handleImageCapture} />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-10 mb-5">
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
            disabled={!isFormValid}
            className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white ${
              isFormValid ? "bg-green-500" : "bg-slate-300"
            }`}
          >
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default UserProfile;
