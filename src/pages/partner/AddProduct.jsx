import Header from "../../components/partner/Header";
import { FaPlus } from "react-icons/fa";
import Container from "@mui/material/Container";
import onion from "../../assets/images/onion.png";
import vet from "../../assets/images/vet.png";
import pepper from "../../assets/images/pepper.png";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import { HiX } from "react-icons/hi";
import TextField from '@mui/material/TextField';
import WebcamCapture from "../../components/WebcamCapture";
import { FaRegSave } from "react-icons/fa";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2
};

export default function AddProduct() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun !important",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Container maxWidth="sm">
          <div className="flex  flex-row">
            <div className="basis-6/12"></div>
            <div onClick={handleOpen} className="basis-6/12 bg-green-hard-bg w-36 h-12 flex justify-center items-center rounded-md mt-5 ml-10">
              {" "}
              <FaPlus className="text-2xl text-white" />{" "}
              <span className="text-white pl-3">เพิ่มสินค้า</span>
            </div>
          </div>
          <Modal
                  open={open}
                  
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} >
                   
                    <TextField className="w-full product-name" id="outlined-basic" label="ชื่อสินค้า" variant="outlined" /> 
                    <TextField className="w-full product-name" id="outlined-basic" label="จำนวน" variant="outlined" /> 
                    <TextField className="w-full product-name" id="outlined-basic" label="ประเภทสินค้า" variant="outlined" /> 
                    <TextField className="w-full product-name" id="outlined-basic" label="มูลค่าต่อชิ้น" variant="outlined" /> 
                    <div className="pt-5 pl-4">
                         <label>ถ่ายรูปสินค้า</label>
                    </div>
                    <WebcamCapture className="bg-white" />
                    <div className="grid grid-cols-3 gap-4">
                        <div></div>
                        <button className=" ml-20 mt-14" onClick={handleClose}>ยกเลิก</button>
                        <div>
                            <button className="w-full bg-green-hard-bg h-10 mt-14 flex justify-center items-center"><FaRegSave className="text-white text-2xl"/> <span className="pl-2 text-white">เพิ่มสินค้า</span> </button>
                        </div>
                        
                    </div>
                  </Box>
                </Modal>
          <div className="w-full h-auto bg-white rounded-md inner-shadow p-5 mt-10">
            <div className=" grid grid-cols-3 gap-4">
              <div>
                <img src={onion} alt="onion" />
              </div>
              <p className="col-span-2 text-2xl mt-8">หอมหัวใหญ่</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนสินค้าในสต็อก</p>
              <p className="text-center">20</p>
              <p className="text-right">ชิ้น</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนเงินทั้งหมด</p>
              <p className="text-center">100</p>
              <p className="text-right">บาท</p>
            </div>
          </div>
          <div className="w-full h-auto bg-white rounded-md inner-shadow p-5 mt-10">
            <div className=" grid grid-cols-3 gap-4">
              <div>
                <img src={vet} alt="vet" />
              </div>
              <p className="col-span-2 text-2xl mt-8">หอมหัวใหญ่</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนสินค้าในสต็อก</p>
              <p className="text-center">40</p>
              <p className="text-right">ชิ้น</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนเงินทั้งหมด</p>
              <p className="text-center">120</p>
              <p className="text-right">บาท</p>
            </div>
          </div>
          <div className="w-full h-auto bg-white rounded-md inner-shadow p-5 mt-10 mb-10">
            <div className=" grid grid-cols-3 gap-4">
              <div>
                <img src={pepper} alt="pepper" />
              </div>
              <p className="col-span-2 text-2xl mt-8">พริกหยวก</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนสินค้าในสต็อก</p>
              <p className="text-center">50</p>
              <p className="text-right">ชิ้น</p>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-10">
              <p className="col-span-2">จำนวนเงินทั้งหมด</p>
              <p className="text-center">500</p>
              <p className="text-right">บาท</p>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
