export const serverUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8626"
    : "https://cerberus-server2.herokuapp.com";
export const currencySymbolAfter = "Kč";
export const currencySymbolBefore = "";
export const version = "1.0";
export const dateFormat = "dd.MM.yyyy";
