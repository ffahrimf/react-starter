import CryptoES from "crypto-es";
import type {
  EncryptedData,
  GenericObject,
} from "../interface/composable.interface";
import day from "../lib/day";

export const useEncrypt = (plaintext: string): EncryptedData | null => {
  if (!plaintext) {
    return null;
  }
  const secretKey = import.meta.env.VITE_API_KEY as string;
  const iv = CryptoES.lib.WordArray.random(16);
  const encrypted = CryptoES.AES.encrypt(plaintext, secretKey, { iv: iv });
  return { iv: iv.toString(), ciphertext: encrypted.toString() };
};

export const useDecrypt = (data: string | null | undefined): string | null => {
  if (!data || data === "null") {
    return null;
  }
  const encrypted: EncryptedData = JSON.parse(data);
  const ciphertext = encrypted.ciphertext;
  const iv = encrypted.iv;
  const secretKey = import.meta.env.VITE_API_KEY as string;
  const decrypted = CryptoES.AES.decrypt(ciphertext, secretKey, {
    iv: CryptoES.enc.Hex.parse(iv),
  });
  return decrypted.toString(CryptoES.enc.Utf8);
};

export const useQuery = (obj: Record<string, any>): string => {
  const queryString = Object.entries(obj)
    .filter(([, value]) => value !== null && value !== "")
    .map(([key, value]) => key + "=" + encodeURIComponent(value))
    .join("&");

  return queryString.length > 0 ? "?" + queryString : "";
};

const validateDate = (str: string): boolean => {
  const formatStr = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ";
  const dateString = day(str).format(formatStr);
  const cleanDateString = str.replace(/\s*\([^)]*\)\s*/g, "");
  return cleanDateString === dateString;
};

export const useFilterProperties = (obj: GenericObject): GenericObject => {
  if (obj) {
    const condition = (value: any): boolean =>
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "string" && value.trim() === "");

    for (let key in obj) {
      const value = obj[key];
      if (condition(value)) {
        delete obj[key];
      }

      if (day(obj[key]).isValid()) {
        if (validateDate(`${obj[key]}`)) {
          obj[key] = day(obj[key]).format("YYYY-MM-DD");
        }
      }
    }
  }
  return obj;
};

export const useResetErr = (err: Record<string, any>): void => {
  for (let key in err) {
    err[key] = "";
  }
};

export const addLang = (path: string, lang: string): string => {
  return path.includes("?")
    ? `${path}&culture=${lang}`
    : `${path}?culture=${lang}`;
};
