import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LiffProvider } from 'react-liff';
import { CartProvider } from './components/CartContext';
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.jsx';
import HistoryPoint from './pages/History_point.jsx';
import HistoryServiceMachine from './pages/History_service_machine.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ShopDetails from './pages/ShopDetails.jsx';
// import ShopDetailsKhunnaiwimon from './pages/ShopDetailsKhunnaiwimon.jsx';
// import MapKhunnaiWimon from './components/MapKhunnaiWimon.jsx';
// import MapNaitonmai from './components/MapNaitonmai.jsx';
// import ShopDetailsNaiTonMai from './pages/ShopDeatilNaiTonMai.jsx';
// import ShopDetailParanee from './pages/ShopDetailParanee.jsx';
// import MapParanee from './components/MapParanee.jsx';
// import ShopDetailNaiKrung from './pages/ShopDetailNaiKrung.jsx';
// import MapKrung from './components/MapKrung.jsx';
// import ShopDetailKamalad from './pages/ShopDetailKamalad.jsx';
// import MapKamalad from './components/MapKamalad.jsx';
import Conclusion from './pages/Conclusion.jsx';
import MachinePosition from './pages/MachinePosition.jsx';
import ContactUs from './pages/ContactUs.jsx';
// import ConfirmOrder from './pages/partner/ConfirmOrder.jsx';
// import ProfileStore from './pages/partner/ProfileStore.jsx';
// // import ContactUs_Partner from './pages/partner/ContactUs.jsx';
// import PDPA from './pages/partner/PDPA.jsx';
// import GetMoneyItems from './pages/partner/GetMoneyItems.jsx';
// import AddProduct from './pages/partner/AddProduct.jsx';
import ChooseShop from './pages/ChooseShop.jsx';
import ChooseWimon from './pages/ChooseWimon.jsx';
import Register from './pages/Register.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import Login from './pages/Login.jsx';
import ShopList from './pages/ShopList.jsx';
import Map from './pages/Map.jsx';
import UpdateUserProfile from './pages/UpdateUserProfile.jsx';
import CartSummary from './pages/CartSummary.jsx';
import LoadingSpinner from './components/LoadingSpinner';
import PDPA_Customer from './pages/PDPA_Customer.jsx';
// import RedeemDetails from './pages/RedeemDetails.jsx';
// import UpdateProfileStore from './pages/partner/UpdateProfileStore.jsx';

const liffId = import.meta.env.VITE_LIFF_ID;

function AppWithLoader() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const location = useLocation();

  useEffect(() => {
    // Set loading to true when navigation starts
    setLoading(true);
  }, [location]);

  useEffect(() => {
    // Set loading to false once navigation is done
    const timeout = setTimeout(() => setLoading(false), 500); // Add slight delay for smoother transition

    return () => clearTimeout(timeout);
  }, [navigation.state]);

  if (loading) {
    return <LoadingSpinner />; // Show loading spinner while loading
  }

  return <RouterProvider router={router} />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/cart",
    element: <CartSummary />

  },
  {
    path: "/register/:userId",
    element: <Register />
  },
  {
    path: "/shopList",
    element: <ShopList />
  },
  {
    path: "/first",
    element: <LoginRegister />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/choose/wimon",
    element: <ChooseWimon />
  },
  {
    path: "/shop/:id",
    element: <ChooseShop />
  },
  {
    path: "/history-point/:id",
    element: <HistoryPoint />
  },
  // {
  //   path: "/redeem-details/:id",
  //   element: <RedeemDetails />
  // },
  {
    path: "/history-service-machine/:id",
    element: <HistoryServiceMachine />
  },
  {
    path: "/UserProfile",
    element: <UserProfile />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/pdpa_customer",
    element: <PDPA_Customer />
  },
  {
    path: "/update-user-profile",
    element: <UpdateUserProfile />
  },
  // {
  //   path: "/store-map/khunnaiwimon",
  //   element: <MapKhunnaiWimon />
  // },
  // {
  //   path: "/store-map/naitonmai",
  //   element: <MapNaitonmai />
  // },
  // {
  //   path: "/store-map/paranee",
  //   element: <MapParanee />
  // },
  // {
  //   path: "/store-map/krung",
  //   element: <MapKrung />
  // },
  // {
  //   path: "/store-map/kamalad",
  //   element: <MapKamalad />
  // },
  {
    path: "/conclusion",
    element: <Conclusion />
  },
  {
    path: "/machine-position",
    element: <MachinePosition />
  },
  {
    path: "/map",
    element: <Map />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  // {
  //   path: "/partner",
  //   element: <ConfirmOrder />
  // },
  // {
  //   path: "/partner/profile-store",
  //   element: <ProfileStore />
  // },
  // {
  //   path: "/partner/update-profile-store/:id",
  //   element: <UpdateProfileStore />
  // },
  // {
  //   path: "/partner/contact-us",
  //   element: <ContactUs_Partner />
  // },
  // {
  //   path: "/partner/pdpa",
  //   element: <PDPA />
  // },
  // {
  //   path: "/partner/get-money-item",
  //   element: <GetMoneyItems />
  // },
  // {
  //   path: "/partner/add-product",
  //   element: <AddProduct />
  // },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiffProvider liffId={liffId}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </LiffProvider>
  </StrictMode>,
)
