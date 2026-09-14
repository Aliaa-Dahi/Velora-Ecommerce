import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

const useApi = (endpoint, page = 1, requiresAuth = false) => {
  const isProducts = endpoint === "products";

  const url = isProducts
    ? `${BASE_URL}/${endpoint}?page=${page}&limit=12`
    : `${BASE_URL}/${endpoint}`;

  const headers = requiresAuth ? { token: Cookies.get("token") } : {};

  return useQuery({
    queryKey: isProducts ? [endpoint, page] : [endpoint],
    queryFn: () => axios.get(url, { headers }).then((res) => res.data),
    keepPreviousData: true,
  });
};

export default useApi;
