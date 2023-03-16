export const BASE_URL_API =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://70.35.201.48:5001";

console.log("BASE API ====", `${BASE_URL_API}`);

const baseConfig = {
  baseURL: `${BASE_URL_API}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export default baseConfig;
