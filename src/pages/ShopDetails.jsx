import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import { getAllShops } from '../api/strapi/shopApi'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { logInfo, logError } from '../utils/logger';

function ShopDetails() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productStock, setProductStock] = useState({
    'บร็อคโคลี': { available: 10, total: 15 },
    'แตงกวา': { available: 20, total: 25 },
    'พริกหยวก': { available: 5, total: 15 }
  });
  const { id } = useParams();
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzI0MDkwMTMwLCJleHAiOjE3MjY2ODIxMzB9.yBSzUjhasa9hbagW3YifpglZCeuB2iE7VCzyDyyApV8';
  const TOKEN = import.meta.env.VITE_TOKEN_TEST;

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        logInfo('Fetching shops data');
        const shopData = await getAllShops(TOKEN);
        setShops(shopData);
        // In a real implementation, you would fetch product stock here
        // For demonstration, we'll use the mock data set above
        logInfo('Successfully fetched shops data', { shopCount: shopData.length });
        setLoading(false);
      } catch (error) {
        logError('Error fetching shops data', { message: error.message });
        setError(error.message);
        setLoading(false);
      }
    };
    fetchShops();
  }, [TOKEN]);

  // Function to render stock status indicator
  const renderStockStatus = (available, total) => {
    const stockPercentage = (available / total) * 100;
    let statusColor = "#4CAF50"; // Green for good stock
    let statusText = "มีสินค้า";
    
    if (stockPercentage <= 20) {
      statusColor = "#F44336"; // Red for low stock
      statusText = "ใกล้หมด";
    } else if (stockPercentage <= 50) {
      statusColor = "#FF9800"; // Orange for medium stock
      statusText = "เหลือน้อย";
    }
    
    return (
      <div className="stock-status" style={{ marginTop: "8px", display: "flex", alignItems: "center" }}>
        <div style={{ 
          width: "12px", 
          height: "12px", 
          borderRadius: "50%", 
          backgroundColor: statusColor,
          marginRight: "8px"
        }}></div>
        <span style={{ fontSize: "0.9rem" }}>{statusText} ({available}/{total})</span>
      </div>
    );
  };

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

        <div className="text-3xl text-center">ดีลเด็ด รายวัน !</div>
        <div className="text-xl text-center mt-2 mb-5">สถานะสินค้าวันนี้</div>
        
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg mt-14 mb-5 float-left">
            <div div className="w-44 h-44 image-1"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">บร็อคโคลี</p>
            <p className="text-3xl mt-5 text-center">35 แต้ม</p>
            {renderStockStatus(productStock['บร็อคโคลี'].available, productStock['บร็อคโคลี'].total)}
          </div>
        </div>
        
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg mb-5 float-left">
            <div className="w-44 h-44 image-2 relative left-5 top-5"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">แตงกวา</p>
            <p className="text-3xl mt-5 text-center">50 แต้ม</p>
            {renderStockStatus(productStock['แตงกวา'].available, productStock['แตงกวา'].total)}
          </div>
        </div>
        
        <div className="grid gap-y-0 relative md:left-14">
          <div className="w-52 h-52 bg-grey-bg mb-3 float-left">
            <div className="w-44 h-44 image-3 relative left-5 top-5"></div>
          </div>
          <div className="relative bottom-44 pl-52 md:pl-32">
            <p className="text-3xl text-center">พริกหยวก</p>
            <p className="text-3xl mt-5 text-center">50 แต้ม</p>
            {renderStockStatus(productStock['พริกหยวก'].available, productStock['พริกหยวก'].total)}
          </div>
        </div>
      </Container>
    </>
  );
}

export default ShopDetails;
