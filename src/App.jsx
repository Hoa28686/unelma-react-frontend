import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "./Layout.jsx";
import { CustomThemeProvider } from "./context/ThemeContext.jsx";
import { CssBaseline, CircularProgress, Box } from "@mui/material";

// Lazy load all pages for code splitting - only load what's needed
const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const ProductDetail = lazy(() => import("./pages/Products/ProductDetail.jsx"));
const BlogDetail = lazy(() => import("./pages/Blog/BlogDetail.jsx"));
const Blog = lazy(() => import("./pages/Blog/Blog.jsx"));
const Products = lazy(() => import("./pages/Products/Products.jsx"));
const Services = lazy(() => import("./pages/Services/Services.jsx"));
const ServiceDetail = lazy(() => import("./pages/Services/ServiceDetail.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Register = lazy(() => import("./pages/Auth/Register.jsx"));
const User = lazy(() => import("./pages/User.jsx"));
const PaymentSuccess = lazy(() => import("./pages/Payment/PaymentSuccess.jsx"));
const PaymentCancel = lazy(() => import("./pages/Payment/PaymentCancel.jsx"));
const Favorites = lazy(() => import("./pages/Favorites.jsx"));

// Loading fallback component
const LoadingFallback = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <CircularProgress />
  </Box>
);

function App() {
  return (
    <>
      <CssBaseline />
      <CustomThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id/:slug" element={<ProductDetail />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/:serviceId"
                  element={<ServiceDetail />}
                />
                <Route path="/blogs" element={<Blog />} />
                <Route path="/blogs/:id/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CustomThemeProvider>
    </>
  );
}

export default App;
