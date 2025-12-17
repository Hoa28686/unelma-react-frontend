import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { handleItemClick } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/products/productsSlice";

function ProductRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // Fetch products if not loaded
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Memoize product lookup if id is unchanged
  const product = useMemo(() => {
    return products.find((b) => b.id === Number(id));
  }, [products, id]);

  // Redirect to the product’s full URL
  useEffect(() => {
    if (!product) return;
    handleItemClick(navigate, product, "products");
  }, [product, navigate]);

  return null; //only redirect, no UI
}

export default ProductRedirect;
