import Header from "../components/Header";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MdLocationPin } from "react-icons/md";
import {NavLink} from 'react-router-dom';
function ShopDetailParanee() {
    return(
        <>
        <Header/>
        <Container maxWidth="sm" className="mt-7">
            <Box sx={{ bgcolor: '#AFEA3D' }} className="h-3/5 w-full mb-10 ">
                <p className="text-3xl text-center pt-10">ร้านไข่ไก่ปารณีย์</p>
                <div className="flex justify-center my-10">
                    <div className="w-48 h-16 border-2 border-black text-center pt-3 text-2xl">เลือกสินค้า</div>
                </div>
                <div className="flex justify-center">
                     <div className="circle-shop-egg"></div> 
                </div>
                <NavLink to="/store-map/paranee">
                    <div className="mt-10"><p className="text-2xl text-right relative bottom-5 right-5">ดูตำแหน่งที่ตั้ง</p></div>
                </NavLink>
            </Box>
            <div className="text-3xl  text-center">ดีลเด็ด รายวัน !</div>
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg mt-14 mb-5 float-left">
            <div div className="w-44 h-44 image-1"></div>
          </div>
          <div className="relative bottom-44 pl-52  md:pl-32">
            <p className="text-3xl text-center">บร็อคโคลี</p>
            <p className="text-3xl mt-5 text-center">35 แต้ม</p>
          </div>
        </div>
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg  mb-5 float-left  ">
            <div div className="w-44 h-44 image-2 relative left-5 top-5"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">แตงกวา</p>
            <p className="text-3xl mt-5 text-center">50 แต้ม</p>
          </div>
        </div>
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg  mb-3 float-left  ">
            <div div className="w-44 h-44 image-3 relative left-5 top-5"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">พริกหยวก</p>
            <p className="text-3xl mt-5 text-center">50 แต้ม</p>
          </div>
        </div>
      </Container>
        </>
    );
}

export default ShopDetailParanee;