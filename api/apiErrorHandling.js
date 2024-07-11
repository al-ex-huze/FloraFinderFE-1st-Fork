import axios from "axios";
import { useContext } from "react";
import { ErrContext } from "../contexts/Contexts";

const floraFinderApi = axios.create({
  baseURL: "http://16.170.228.135:3000/api",
});

floraFinderApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { setErr } = useContext(ErrContext);
    handleApiError(error, setErr);
    return Promise.reject(error);
  }
);

const handleApiError = (error, setErr) => {
  if (error.response) {
    console.error(
      `Server responded with status code ${error.response.status}:`,
      error.response.data
    );
    setErr({ status: error.response.status, msg: error.response.data.msg });
  } else if (error.request) {
    console.error("No response received:", error.request);
    setErr({ msg: "No response received" });
  } else {
    console.error("Error in request setup:", error.message);
    setErr({ msg: error.message });
  }
  throw new Error(`API request failed: ${error.message}`);
};

export default floraFinderApi;
