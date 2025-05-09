import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { getAllShops } from '../api/strapi/shopApi'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

function ShopDetails() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI0MDkwMTMwLCJleHAiOjE3MjY2ODIxMzB9.yBSzUjhasa9hbagW3YifpglZCeuB2iE7VCzyDyyApV8';
  const TOKEN = import.meta.env.VITE_TOKEN_TEST ;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const shopData = await getAllShops(TOKEN);
        setShops(shopData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchShops();
  }, [TOKEN]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <Container maxWidth="sm" className="mt-7">
        <Box sx={{ bgcolor: "#AFEA3D" }} className="h-3/5 w-full mb-10 ">

          <p className="text-3xl text-center pt-10">{shops[id].name}</p>
          <div className="flex justify-center my-10">
            <NavLink to={`/choose/${id}`}>
              <div className="w-48 h-16 border-2 border-black text-center pt-3 text-2xl text-black">
                เลือกสินค้า
              </div>
            </NavLink>
          </div>
          <div className="flex justify-center">
            <div className="circle-shop-vegetable"></div>
          </div>
          <NavLink to="/store-map/khunnaiwimon">
            <div className=" mt-10">
              <p className="text-2xl text-right relative bottom-5 right-5">
                ดูตำแหน่งที่ตั้ง
              </p>
            </div>
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
            <div className="w-44 h-44 image-2 relative left-5 top-5"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">แตงกวา</p>
            <p className="text-3xl mt-5 text-center">50 แต้ม</p>
          </div>
        </div>
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg  mb-3 float-left  ">
            <div className="w-44 h-44 image-3 relative left-5 top-5"></div>
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

export default ShopDetails;
