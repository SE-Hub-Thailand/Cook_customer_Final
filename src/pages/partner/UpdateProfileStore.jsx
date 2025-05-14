import Header from "../../components/partner/Header";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import WebcamCapture from "../../components/WebcamCapture";
import WebcamCapture2 from "../../components/WebcamCapture2";
import { useParams } from 'react-router-dom';
import { getShopById, updateShop } from '../../api/strapi/shopApi';
import { uploadImage } from "../../api/strapi/uploadApi"; // Import uploadImage function

export default function UpdateProfileStore() {
  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun !important",
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    location: "",
    cardID: "",
    bookBankNumber: "",
    bankName: "",
    photoImage: "",
    bookBankImage: "",
    checkedOne: false
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI0MDkwMTMwLCJleHAiOjE3MjY2ODIxMzB9.yBSzUjhasa9hbagW3YifpglZCeuB2iE7VCzyDyyApV8';
  const token = import.meta.env.VITE_TOKEN_TEST ;

  // Handle changes in text fields and select inputs
  const handleInputChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle select input changes separately
  const handleSelectChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      bankName: event.target.value,
    }));
  };

  // Use effect to validate form data
  useEffect(() => {
    const {
      name,
      fullName,
      location,
      cardID,
      bookBankNumber,
      bankName,
      photoImage,
      bookBankImage,
      checkedOne,
    } = formData;

    // Check if all fields are filled
    if (
      name &&
      fullName &&
      location &&
      cardID &&
      bookBankNumber &&
      bankName &&
      photoImage &&
      bookBankImage&&
      checkedOne
    );
    // {
    //   setIsFormValid(true);
    // } else {
    //   setIsFormValid(false);
    // }
    // console.log(isFormValid);
  }, [formData]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const shopData = await getShopById(id, token);
        setShops(shopData);
        setFormData({
          name: shopData.name || "",
          fullName: shopData.user.fullName || "",
          location: shopData.location || "",
          cardID: shopData.cardID || "",
          bookBankNumber: shopData.bookBankNumber || "",
          bankName: shopData.bankName || "",
          photoImage: shopData.photoImage || "",
          bookBankImage: shopData.bookBankImage || "",
          checkedOne: false, // Assume consent is not automatically checked
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchShops();
  }, [id, token]);

  const createPhotoImageObject = (uploadedImageData) => {
    return {
      id: uploadedImageData.id,
      name: uploadedImageData.name,
      alternativeText: uploadedImageData.alternativeText || null,
      caption: uploadedImageData.caption || null,
      width: uploadedImageData.width,
      height: uploadedImageData.height,
      formats: uploadedImageData.formats, // If formats are available
      hash: uploadedImageData.hash,
      ext: uploadedImageData.ext,
      mime: uploadedImageData.mime,
      size: uploadedImageData.size,
      url: uploadedImageData.url,
      provider: uploadedImageData.provider,
      createdAt: uploadedImageData.createdAt,
      updatedAt: uploadedImageData.updatedAt,
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let uploadedImageObject = null;

      // อัปโหลดรูปภาพก่อน ถ้ามีรูปภาพที่จะอัปโหลด
      if (formData.photoImage) {
        const uploadedImageData = await uploadImage(formData.photoImage);
        uploadedImageObject = createPhotoImageObject(uploadedImageData); // สร้าง object สำหรับ photoImage
      }
      const shopData = {
          name: formData.name,
          fullName: formData.fullName,
          location: formData.location,
          cardID: formData.cardID,
          bookBankNumber: formData.bookBankNumber,
          bankName: formData.bankName,
          photoImage: uploadedImageObject,
          bookBankImage: formData.bookBankImage,
      };
      // Call the updateUser function to send the updated formData to the API
      await updateShop(token, id, shopData);
      alert("User data updated successfully!");
	//   navigate("/home");
    } catch (error) {
      console.error("Error updating shop data:", error);
      alert("Error updating shop data");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <TextField
                id="name"
                label="ชื่อร้านค้า"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
              <TextField
                id="fullName"
                label="ชื่อ-นามสกุล"
                type="text"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
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
            <div className="w-full md:w-1/2 px-2 mt-4">
              <TextField
                id="bookBankNumber"
                label="หมายเลขบัญชีธนาคาร"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.bookBankNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
              <FormControl fullWidth>
                <InputLabel id="bank-select-label">ธนาคาร</InputLabel>
                <Select
                  className="bg-white"
                  labelId="bank-select-label"
                  id="bankName"
                  value={formData.bankName}
                  label="ธนาคาร"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="ธนาคารกรุงเทพ จำกัด (มหาชน)">ธนาคารกรุงเทพ จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารกรุงไทย จำกัด (มหาชน)">ธนาคารกรุงไทย จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)">ธนาคารกรุงศรีอยุธยา จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารกสิกรไทย จำกัด (มหาชน)">ธนาคารกสิกรไทย จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารเกียรตินาคินภัทร จำกัด (มหาชน)">ธนาคารเกียรตินาคินภัทร จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารซีไอเอ็มบี ไทย จำกัด (มหาชน)">ธนาคารซีไอเอ็มบี ไทย จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารทหารไทยธนชาต จำกัด (มหาชน)">ธนาคารทหารไทยธนชาต จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารทิสโก้ จำกัด (มหาชน)">ธนาคารทิสโก้ จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารไทยเครดิต จำกัด (มหาชน)">ธนาคารไทยเครดิต จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารไทยพาณิชย์ จำกัด (มหาชน)">ธนาคารไทยพาณิชย์ จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารยูโอบี จำกัด (มหาชน)">ธนาคารยูโอบี จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารแลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)">ธนาคารแลนด์ แอนด์ เฮ้าส์ จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)">ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารไอซีบีซี (ไทย) จำกัด (มหาชน)">ธนาคารไอซีบีซี (ไทย) จำกัด (มหาชน)</MenuItem>
                  <MenuItem value="ธนาคารแห่งประเทศจีน (ไทย) จำกัด (มหาชน)">ธนาคารแห่งประเทศจีน (ไทย) จำกัด (มหาชน)</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="w-full px-2 mt-4">
              <div>
                <label className="">ถ่ายรูปตนเองพร้อมถือบัตรประจำตัวประชาชน</label>
              </div>
              <WebcamCapture className="bg-white" id="photoImage" />
            </div>
            <div className="w-full px-2 mt-4">
              <label>ถ่ายหน้าบุ๊คแบงก์</label>
              <WebcamCapture2 className="bg-white" id="bookBankImage" />
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                label="ที่อยู่"
                placeholder="ที่อยู่"
                id="location"
                multiline
                minRows={3}
                maxRows={10}
                fullWidth
                className="w-full bg-white"
                required
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
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
