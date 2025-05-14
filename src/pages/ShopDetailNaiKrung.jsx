import Header from "../components/Header";
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { MdLocationPin } from "react-icons/md";
import {NavLink} from 'react-router-dom';
function ShopDetailNaiKrung() {
    return(
        <>
        <Header/>
        <Container maxWidth="sm" className="mt-7">
            <Box sx={{ bgcolor: '#AFEA3D' }} className="h-3/5 w-full mb-10 ">
                <p className="text-3xl text-center pt-10">ร้านไข่เป็ดนายกรุง</p>
                <div className="flex justify-center my-10">
                    <div className="w-48 h-16 border-2 border-black text-center pt-3 text-2xl">เลือกสินค้า</div>
                </div>
                <div className="flex justify-center">
                     <div className="circle-shop-duck-egg"></div> 
                </div>
                <NavLink to="/store-map/krung">
                    <div className="mt-10"><p className="text-2xl text-right relative bottom-5 right-5">ดูตำแหน่งที่ตั้ง</p></div>
                </NavLink>
            </Box>
            
      </Container>
        </>
    );
}

export default ShopDetailNaiKrung;