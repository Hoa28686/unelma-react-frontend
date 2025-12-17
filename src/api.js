const baseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const API = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  logout: `${baseUrl}/logout`,
  products: `${baseUrl}/products`,
  blogs: `${baseUrl}/blogs`,
  favorites: `${baseUrl}/favorites`,
  services: `${baseUrl}/services`,
  careers: `${baseUrl}/vacancies`,
  purchases: `${baseUrl}/profile/purchases`,
};
