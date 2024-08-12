import "./App.css";
import Home from "./Components/Home";
// import About from "./Components/About";
import Work from "./Components/Work";
// import Testimonial from "./Components/Testimonial";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
// home about work testimonial contact footer
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Components/accountBox/Login"
import Register from "./Components/accountBox/Register"
import Reset from "./Components/accountBox/Reset"
import Setup from "./Components/accountBox/Setup"
import Authenticate from "./Components/accountBox/Authenticate"
import CustomerTracking from "./Components/CustomerTracking"
import CustomerChat from "./Components/CustomerChat"
import CustomerSearch from "./Components/CustomerSearch"
import ServiceDetails from "./Components/ServiceDetails"
import Checkout from "./Components/Checkout"
import Orders from "./Components/Orders"
import Review from "./Components/Review"
import ReadReviews from "./Components/ReadReviews"
import PublicHome from "./Components/PublicHome"
import PublicTracking from "./Components/PublicTracking"
import PublicServices from "./Components/PublicServices"
import PublicReviews from "./Components/PublicReviews"
import PublicDetails from "./Components/PublicDetails"
import AdminHome from "./Components/AdminHome"
import AdminDelivery from "./Components/AdminDelivery"
import AdminOrders from "./Components/AdminOrders"
import AdminReviews from "./Components/AdminReviews"
import AdminServices from "./Components/AdminServices"
import DriverLogin from "./Components/DriverLogin"
import DriverHome from "./Components/DriverHome"
import DriverTracking from "./Components/DriverTracking"
import DriverPickups from "./Components/DriverPickups"
import DriverDropoffs from "./Components/DriverDropoffs"
import AdminChat from "./Components/AdminChat"
import DriverChat from "./Components/DriverChat"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/reset" element={<Reset></Reset>}></Route>
        <Route path="/mfa/authenticate/:user_id" element={<Authenticate></Authenticate>}></Route>
        <Route path="/mfa/setup/:user_id" element={<Setup></Setup>}></Route>
        <Route path="/customer/:user_id" element={<Home></Home>}></Route>
        <Route path="/customer/tracking/:user_id" element={<CustomerTracking></CustomerTracking>}></Route>
        <Route path="/customer/chat/:fullname/:user_id" element={<CustomerChat></CustomerChat>}></Route>
        <Route path="/customer/search/:user_id" element={<CustomerSearch></CustomerSearch>}></Route>
        <Route path="/customer/services/:serviceName/:packageSize/:user_id" element={<ServiceDetails></ServiceDetails>}></Route>
        <Route path="/customer/checkout/:serviceName/:packageSize/:type/:user_id" element={<Checkout></Checkout>}></Route>
        <Route path="/customer/orders/:user_id" element={<Orders></Orders>}></Route>
        <Route path="/customer/review/:serviceName/:user_id" element={<Review></Review>}></Route>
        <Route path="/customer/reviews/:serviceName/:user_id" element={<ReadReviews></ReadReviews>}></Route>
        <Route path="/public" element={<PublicHome></PublicHome>}></Route>
        <Route path="/public/tracking" element={<PublicTracking></PublicTracking>}></Route>
        <Route path="/public/services" element={<PublicServices></PublicServices>}></Route>
        <Route path="/public/reviews/:serviceName" element={<PublicReviews></PublicReviews>}></Route>
        <Route path="/public/services/:serviceName/:packageSize" element={<PublicDetails></PublicDetails>}></Route>
        <Route path="/admin" element={<AdminHome></AdminHome>}></Route>
        <Route path="/admin/deliveries" element={<AdminDelivery></AdminDelivery>}></Route>
        <Route path="/admin/orders" element={<AdminOrders></AdminOrders>}></Route>
        <Route path="/admin/reviews" element={<AdminReviews></AdminReviews>}></Route>
        <Route path="/admin/services" element={<AdminServices></AdminServices>}></Route>
        <Route path="/driver/login" element={<DriverLogin></DriverLogin>}></Route>
        <Route path="/driver/:driver_id" element={<DriverHome></DriverHome>}></Route>
        <Route path="/driver/tracking/:driver_id" element={<DriverTracking></DriverTracking>}></Route>
        <Route path="/driver/pickups/:driver_id" element={<DriverPickups></DriverPickups>}></Route>
        <Route path="/driver/dropoffs/:driver_id" element={<DriverDropoffs></DriverDropoffs>}></Route>
        <Route path="/driver/chat/:fullname/:driver_id" element={<DriverChat></DriverChat>}></Route>
        <Route path="/admin/chat" element={<AdminChat></AdminChat>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
