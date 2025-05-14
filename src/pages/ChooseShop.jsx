import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/Group.png";
import "../components/style.css";
import { BsBasket2 } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from 'react';
import { getAllProductsByShopId } from "../api/strapi/productApi";
import { CartContext } from '../components/CartContext';
import PointsModal from '../components/PointsModal';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ChooseShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // const [counts, setCounts] = useState(() => {
  //   const storedCounts = localStorage.getItem('cart');
  //   return storedCounts ? JSON.parse(storedCounts) : {};
  // });
  const [counts, setCounts] = useState(() => {

    const isRefreshed = true; // ใช้เงื่อนไขนี้สำหรับการเช็คว่ามีการรีเฟรชหรือไม่
    if (isRefreshed) {
      // รีเซ็ตค่า counts เป็น 0 หรือ object ว่างเปล่า
      localStorage.removeItem('cart');
      localStorage.removeItem('cart2');
      // localStorage.removeItem('point');
      return {};
    } else {
      // ดึงค่าจาก localStorage ถ้ามีการบันทึกไว้

      const storedCounts = localStorage.getItem('cart');
      return storedCounts ? JSON.parse(storedCounts) : {};
    }
  });
  // const token = import.meta.env.VITE_TOKEN_TEST;
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useContext(CartContext); // Access addToCart and removeFromCart

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const ProductData = await getAllProductsByShopId(token, id);
        localStorage.setItem('shopId', id);
        setProducts(ProductData);
        setLoading(false);

        if (ProductData.length === 0) {
          alert("No product for this shop");
          navigate("/home");
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, token, navigate]);

  // console.log("products[19]: ", p.name);

  const updateCart = (productId, quantity) => {

    const p = products.find(p => p.id === productId);
    console.log("AllP: ", p);
    console.log("add p[",productId, "]: ", p.name, " point: ", p.point, " numStock: ", p.numStock);

    console.log("productId: ", productId, "quantity: ", quantity);
    console.log("counts in update: ", counts);
    const updatedCounts = { ...counts, [productId]: (counts[productId] || 0) + quantity };
    // Retrieve the current cart items from localStorage or an empty array if none exist
    const storedCounts = JSON.parse(localStorage.getItem('cart2')) || [];

    let totalPointsSum = 0;
    let totalCountSum = 0;

    storedCounts.forEach(item => {
      const count = item.counts; // Assuming the counts field contains the quantity of the item
      if (count > 0) {
        const totalPoints = item.point * count; // Calculate total points for the item
        totalPointsSum += totalPoints; // Add points to total sum
        totalCountSum += count; // Add count to total count sum
      }
    });
    const currentPoint = localStorage.getItem('point');
    if (totalPointsSum > currentPoint) {
      setShowModal(true);
      // return;
    }

    // Check if the product already exists in the updatedCounts array
    const existingProductIndex = storedCounts.findIndex(item => item.id === productId);

    if (existingProductIndex !== -1) {
      // If the product exists, update the counts
      storedCounts[existingProductIndex].counts += quantity;
      if (p.numStock < storedCounts[existingProductIndex].counts) {
        console.log("2.1 modal2", showModal2);
        setShowModal2(true);
        console.log("2.2 modal2", showModal2);
        return;
      }
    } else {
      // If the product does not exist, push a new entry with all necessary data
      console.log("p.numStock: ", p.numStock, " >= quantity: ", quantity);
      if (p.numStock < quantity) {
        console.log("1.1 modal2", showModal2);
        setShowModal2(true);
        console.log("1.2 modal2", showModal2);
        return;

      }
      storedCounts.push({
        id: p.id,
        name: p.name,
        counts: quantity, // Initial count based on the update
        point: p.point,
        numStock: p.numStock,
        price: p.price,
      });
    }

    // Update state with an array of products containing detailed information
    setCounts(storedCounts); // Assuming 'counts' is an array of products

    // Store the updated data in localStorage
    localStorage.setItem('cart2', JSON.stringify(storedCounts));
    console.log("storedCounts: ", JSON.stringify(storedCounts));
    setCounts(updatedCounts);
    localStorage.setItem('cart', JSON.stringify(updatedCounts));
    console.log("updatedCounts in update: ", JSON.stringify(updatedCounts));

  };

  const handleIncrement = (product) => {
  console.log("In CountsById[", product.id, "] : ", product);
    addToCart(product);
    updateCart(product.id, 1);
  };

  const handleDecrement = (productId) => {
  console.log("De CountsById[", productId, "] : ", counts[productId]);
    if (counts[productId] > 0) {
      removeFromCart(productId);
      updateCart(productId, -1);
    }
  };
  const [searchTerm, setSearchTerm] = useState('');
  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log("CountsById[", product.id, "] : ", counts[products.id]);
  console.log("products: ", products);
  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      {/* <Header counts={counts} products={products}/> */}
      <Container maxWidth="sm">
        {/* Search input field */}
        <div className="flex justify-center pt-10">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 w-full max-w-xs"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Display the shop name if products are available */}
        {filteredProducts.length > 0 && <p className="text-3xl text-center pt-10">{filteredProducts[0]?.shop?.name}</p>}

        {/* Display filtered products */}
        {/* {filteredProducts.map(product => ( */}
        {filteredProducts
          .filter(product => product.status === "approved")
          .map(product => (
          <div key={product.id}>
            <div className="w-full h-60 bg-white mt-10 rounded-s-md">
              <div className="flex justify-center">
                <span
                  className="circle"
                  style={{
                    backgroundImage: product.image?.data?.attributes?.url
                      ? `url(${API_URL}${product.image.data.attributes.url})`
                      : 'url(https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg)',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    maxWidth: "150px",
                    height: "150px",
                    borderRadius: "50%",
                  }}
                ></span>
              </div>
              <div className="flex flex-row">
                <button
                  className="basis-1/4 rounded-bl-md bg-red-hard-bg text-white font-bold text-3xl pb-3 width-button-inandde"
                  style={{ height: '2.9rem' }}
                  onClick={() => handleDecrement(product.id)}>
                  -
                </button>
                <button
                  className="basis-1/2 col-start-2 col-span-4 bg-yellow-hard-bg font-bold width-button-count"
                  style={{ height: '2.9rem' }}>
                  {counts[product.id] || 0}
                </button>
                <button
                  className="basis-1/4 bg-green-hard-bg text-white font-bold text-3xl pb-3 rounded-br-md width-button-inandde"
                  style={{ height: '2.9rem' }}
                  onClick={() => handleIncrement(product)}>
                  +
                </button>
              </div>
            </div>
            <p className="text-center text-2xl mt-10">{product.name}</p>
            <p className="text-center text-2xl mt-3">{product.point || 0} แต้ม</p>
            <p className="text-center text-xl mt-1 pb-10">สินค้าคงเหลือ: {product.numStock}</p>
          </div>
        ))}

        {/* Display a message if no products match the search term */}
        {filteredProducts.length === 0 && <p className="text-center text-2xl mt-10">No products found</p>}
        {showModal &&
          <PointsModal text="แต้มของท่านไม่เพียงพอ" closeModal={() => setShowModal(false)} />
        }
        {showModal2 &&
          <PointsModal text="ขออภัย สินค้าในสต็อกไม่เพียงพอ" closeModal={() => setShowModal2(false)} />
        }
      </Container>
    </>
  );
}
