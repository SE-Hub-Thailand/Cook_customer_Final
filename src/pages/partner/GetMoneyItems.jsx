import Header from "../../components/partner/Header";
import Container from "@mui/material/Container";
import { FaSearch } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { HiX } from "react-icons/hi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from '@mui/material/Paper';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function GetMoneyItems() {
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
          <FormControl fullWidth className="bg-white">
            <InputLabel htmlFor="outlined-adornment-amount">
              ค้นหาตามวันที่...
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              endAdornment={
                <InputAdornment position="end">
                  <FaSearch />
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl>
          <div className="w-full h-42 bg-white mt-10 rounded-lg shadow-md p-5 leading-loose">
            <p>เลขที่ใบรายการรับเงิน : P0001</p>
            <p>ชื่อ: Christian นามสกุล: Walton</p>

            <div>
              <p>วันที่ 7 สิงหาคม 2567 เวลา 18:35 น.</p>
            </div>
            <div className="flex">
              <div className="flex-none w-14"></div>
              <div className="flex-auto w-64"></div>
              <div className="flex-auto">
                <button
                  onClick={handleOpen}
                  className="bg-yellow-hard-bg rouded-md px-4 py-2 rounded-md mt-2 w-32"
                >
                  ดูใบเสร็จ
                </button>
                <Modal
                  open={open}
                  
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} >
                    <div className="w-full h-20 bg-red-600 border-none flex items-center justify-end px-3">
                      {/* Close button that triggers handleClose */}
                      <HiX
                        className="text-5xl text-white cursor-pointer"
                        onClick={handleClose}
                      />
                    </div>
                      <TableContainer component={Paper} className="mt-10 px-6">
                        <Table sx={{ minWidth: 300 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>รายการสินค้า</TableCell>
                              <TableCell align="right">จำนวน</TableCell>
                              <TableCell align="right">มูลค่า (บาท)</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            
                              <TableRow
                                
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                
                                <TableCell align="center">
                                  หัวไชเท้า
                                </TableCell>
                                <TableCell align="right">1</TableCell>
                                <TableCell align="right">10</TableCell>
                                
                              </TableRow>
                              <TableRow
                                
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell align="center">
                                  หอมหัวใหญ่
                                </TableCell>
                                <TableCell align="right">2</TableCell>
                                <TableCell align="right">10</TableCell>
                              </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="px-7">
                      <div className=" border-t-2 border-slate-200"></div>
                      </div>
                      
                     <div className="flex mt-3  px-11">
                        <div className="flex-none w-40">รวมเป็นมูลค่า</div>
                        <div className="flex-none w-20 text-center">20</div>
                        <div className="flex-none w-40 text-center">บาท</div>
                      </div> 
                   
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}
