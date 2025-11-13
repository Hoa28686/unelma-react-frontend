import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";
import { CustomThemeProvider } from "./context/ThemeContext.jsx";
import { CssBaseline } from "@mui/material";
import ProductDetail from "./pages/Products/ProductDetail.jsx";
import BlogDetail from "./pages/Blog/BlogDetail.jsx";
import Blog from "./pages/Blog/Blog.jsx";
import Products from "./pages/Products/Products.jsx";
import Services from "./pages/Services/Services.jsx";
import ServiceDetail from "./pages/Services/ServiceDetail.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

function App() {
  return (
    <>
      <CssBaseline />
      <CustomThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:blogId" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CustomThemeProvider>
    </>
  );
}

export default App;
