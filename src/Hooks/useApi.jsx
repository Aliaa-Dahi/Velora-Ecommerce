import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";
// https://ecommerce.routemisr.com/api/v1/

const useApi = (endpoint, page = 1) => {
  const isProducts = endpoint === "products";

  const url = isProducts
    ? `${BASE_URL}/${endpoint}?page=${page}&limit=12`
    : `${BASE_URL}/${endpoint}`;

  return useQuery({
    queryKey: isProducts ? [endpoint, page] : [endpoint],
    queryFn: () => axios.get(url).then((res) => res.data),
    keepPreviousData: true,
  });
};

export default useApi;
