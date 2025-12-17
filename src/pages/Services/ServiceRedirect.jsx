import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { handleItemClick } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../store/slices/services/servicesSlice";

function ServiceRedirect() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.services);

  // Fetch services if not loaded
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services.length]);

  // Memoize service lookup if id is unchanged
  const service = useMemo(() => {
    return services.find((b) => b.id === Number(id));
  }, [services, id]);

  // Redirect to the service’s full URL
  useEffect(() => {
    if (!service) return;
    handleItemClick(navigate, service, "services");
  }, [service, navigate]);

  return null; //only redirect, no UI
}

export default ServiceRedirect;
