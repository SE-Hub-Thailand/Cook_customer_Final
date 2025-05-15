import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/Group.png";
import "../components/style.css";
import { BsBasket2 } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
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
  const token = localStorage.getItem('token');
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [counts, setCounts] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || {};
  });
  const [cart2, setCart2] = useState(() => {
    return JSON.parse(localStorage.getItem('cart2')) || [];
  });
  const [searchTerm, setSearchTerm] = useState('');

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

  const updateCart = (productId, quantity) => {
    const p = products.find(p => p.id === productId);
    const updatedCounts = { ...counts, [productId]: (counts[productId] || 0) + quantity };
    const currentPoint = parseInt(localStorage.getItem('point')) || 0;

    let newCart2 = [...cart2];
    let totalPointsSum = 0;

    newCart2.forEach(item => {
      totalPointsSum += item.counts * item.point;
    });

    if (totalPointsSum > currentPoint) {
      setShowModal(true);
      return;
    }

    const index = newCart2.findIndex(item => item.id === productId);
    if (index !== -1) {
      newCart2[index].counts += quantity;
      // if (newCart2[index].counts > p.numStock) {
      //   setShowModal2(true);
      //   return;
      // }
    } else {
      // if (quantity > p.numStock) {
      //   setShowModal2(true);
      //   return;
      // }
      newCart2.push({
        id: p.id,
        name: p.name,
        counts: quantity,
        point: p.point,
        numStock: p.numStock,
        price: p.price,
      });
    }

    const updatedProducts = products.map(prod =>
      prod.id === productId ? { ...prod, numStock: prod.numStock - quantity } : prod
    );

    setProducts(updatedProducts);
    setCounts(updatedCounts);
    setCart2(newCart2);
    localStorage.setItem('cart', JSON.stringify(updatedCounts));
    localStorage.setItem('cart2', JSON.stringify(newCart2));
  };

  const handleIncrement = (product) => {
    if (product.numStock === 0) {
      setShowModal2(true);
      return;
    }
    addToCart(product);
    updateCart(product.id, 1);
  };

  const handleDecrement = (productId) => {
    if (counts[productId] > 0) {
      removeFromCart(productId);
      updateCart(productId, -1);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <div className="flex justify-center pt-10">
          <input
            type="text"
            className="border-2 border-gray-300 rounded-md p-2 w-full max-w-xs"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProducts.length > 0 && <p className="text-3xl text-center pt-10">{filteredProducts[0]?.shop?.name}</p>}

        {filteredProducts
          .filter(product => product.status === "approved")
          .map(product => (
            <div key={product.id} className="relative">
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
                  <div className="absolute right-5 top-5 bg-yellow-200 text-black px-3 py-1 text-sm rounded-full shadow-md">
                    เหลือ {product.numStock} ชิ้น
                  </div>
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
                    onClick={() => handleIncrement(product, product.numStock)}>
                    +
                  </button>
                </div>
              </div>
              <p className="text-center text-2xl mt-10">{product.name}</p>
              <p className="text-center text-2xl mt-3">{product.point || 0} แต้ม</p>
            </div>
        ))}

        {filteredProducts.length === 0 && <p className="text-center text-2xl mt-10">No products found</p>}
        {showModal && <PointsModal text="แต้มของท่านไม่เพียงพอ" closeModal={() => setShowModal(false)} />}
        {showModal2 && <PointsModal text="ขออภัย สินค้าในสต็อกไม่เพียงพอ" closeModal={() => setShowModal2(false)} />}
      </Container>
    </>
  );
}
