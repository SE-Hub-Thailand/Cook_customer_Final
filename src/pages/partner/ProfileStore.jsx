import Header from "../../components/partner/Header";
import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import WebcamCapture from "../../components/WebcamCapture";
import WebcamCapture2 from "../../components/WebcamCapture2";

export default function ProfileStore() {
  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun !important",
    },
  });

  const [formData, setFormData] = useState({
    storeName: "",
    fullName: "",
    address: "",
    cardID: "",
    bankName: "",
    bankChoose: "",
    photoImage: "",
    bookBankImage: "",
    checkedOne: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

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
      bankChoose: event.target.value,
    }));
  };

  // Use effect to validate form data
  useEffect(() => {
    const {
      storeName,
      fullName,
      address,
      cardID,
      bankName,
      bankChoose,
      photoImage,
      bookBankImage,
    } = formData;

    // Check if all fields are filled
    if (
      storeName &&
      fullName &&
      address &&
      cardID &&
      bankName &&
      bankChoose &&
      photoImage &&
      bookBankImage&&
      checkedOne
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
    console.log(isFormValid);
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isFormValid) {
      // Submit logic here
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <TextField
                id="storeName"
                label="ชื่อร้านค้า"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.storeName}
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
                id="bankName"
                label="หมายเลขบัญชีธนาคาร"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
              <FormControl fullWidth>
                <InputLabel id="bank-select-label">ธนาคาร</InputLabel>
                <Select
                  className="bg-white"
                  labelId="bank-select-label"
                  id="bankChoose"
                  value={formData.bankChoose}
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
                id="address"
                multiline
                minRows={3}
                maxRows={10}
                fullWidth
                className="w-full bg-white"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <button
            type="submit"
        
            className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white bg-green-500
            `}
          >
            
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
}
