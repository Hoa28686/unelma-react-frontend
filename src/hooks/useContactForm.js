import { useState } from "react";
import { submitContactForm } from "../lib/api/contactService";

/**
 * Custom hook for contact form state and submission logic
 * @param {Object} initialFormData - Initial form data
 * @returns {Object} Form state and handlers
 */
export const useContactForm = (initialFormData = { name: "", email: "", message: "" }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear status and field errors when user starts typing again
    if (submitStatus.success !== null) {
      setSubmitStatus({ success: null, message: "" });
    }
    // Clear field-specific error
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: null,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ success: null, message: "" });
    setFieldErrors({});

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: result.message,
        });
        // Reset form on success
        setFormData(initialFormData);
        setFieldErrors({});
      } else {
        // Handle validation errors
        if (result.error && result.error.errors) {
          // Laravel validation errors format: { errors: { field: [messages] } }
          const errors = {};
          Object.keys(result.error.errors).forEach((field) => {
            errors[field] = result.error.errors[field][0]; // Get first error message
          });
          setFieldErrors(errors);
          setSubmitStatus({
            success: false,
            message: "Please correct the errors below.",
          });
        } else {
          setSubmitStatus({
            success: false,
            message: result.message,
          });
        }
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFieldErrors({});
    setSubmitStatus({ success: null, message: "" });
  };

  return {
    formData,
    loading,
    submitStatus,
    fieldErrors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
  };
};

