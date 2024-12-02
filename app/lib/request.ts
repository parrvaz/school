import Cookies from 'js-cookie';
import { ApisauceInstance, create } from 'apisauce';
import { toast } from 'react-hot-toast';
import fa from 'app/lib/fa.json';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'https://pishkarserver.semimnet.ir/api';
const siteURL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pishkar.semimnet.ir';

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
    error.response.data.message &&
      toast.error(
        error.response.status === 500 ? fa.global.serverError : error.response.data.message
      );
    return error;
  }
);

export default request;
export { baseURL, siteURL };
