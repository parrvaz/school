import Cookies from 'js-cookie';
import { ApisauceInstance, create } from 'apisauce';
import { toast } from 'react-hot-toast';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'pishkar.semimnet.ir/api';

// create main request configs
const request = ((): ApisauceInstance => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'fa',
  };
  return create({ baseURL, headers });
})();

request.addRequestTransform((req) => {
  const token = Cookies.get('token') || req.params?.token; // req.params?.token for SSR;
  if (token && req.headers) req.headers.Authorization = token;
});

request.axiosInstance.interceptors.response.use(
  (response) => {
    response.data.message && toast.success(response.data.message);
    return response;
  },
  (error) => {
    // const token = Cookies.get("token");

    // if (token && error.config.url === "/user" && error.response.status === 401)
    //   Cookies.remove("token");

    // error.response.data.message &&
    //   !error.config.url.includes("/user") &&
    //   toast.error(error.response.data.message);
    return error;
  }
);

export default request;
export { baseURL };
