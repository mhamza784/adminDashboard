export const BASE_URL_API =
  process.env.NEXT_PUBLIC_BASE_API_URL || "https://api.mylatinlove.com";

console.log("BASE API ====", `${BASE_URL_API}`);

const baseConfig = {
  baseURL: `${BASE_URL_API}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export default baseConfig;
