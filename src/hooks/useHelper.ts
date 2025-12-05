import CryptoES from "crypto-es";
import type { GenericObject } from "../interface/composable.interface";
import day from "../lib/day";

export const useEncrypt = (plaintext: string) => {
  if (!plaintext) {
    return null;
  }
  const apiKey = import.meta.env.VITE_PUBLIC_API_KEY as string;
  const iv = CryptoES.lib.WordArray.random(16);
  const encrypted = CryptoES.AES.encrypt(
    plaintext,
    CryptoES.enc.Hex.parse(apiKey),
    {
      iv: iv,
      padding: CryptoES.pad.Pkcs7,
      mode: CryptoES.mode.CBC,
    },
  );
  const encryptedBase64 = CryptoES.enc.Base64.stringify(
    iv.concat(encrypted.ciphertext!),
  );

  return encryptedBase64;
};

export const useDecrypt = (encryptedText: string) => {
  try {
    const fullCipher = CryptoES.enc.Base64.parse(encryptedText);

    const iv = CryptoES.lib.WordArray.create(fullCipher.words.slice(0, 4), 16);
    const ciphertext = CryptoES.lib.WordArray.create(fullCipher.words.slice(4));

    const cipherParams = CryptoES.lib.CipherParams.create({
      ciphertext: ciphertext,
    });

    const apiKey = import.meta.env.VITE_PUBLIC_API_KEY as string;

    const decrypted = CryptoES.AES.decrypt(
      cipherParams,
      CryptoES.enc.Hex.parse(apiKey),
      {
        iv: iv,
        padding: CryptoES.pad.Pkcs7,
        mode: CryptoES.mode.CBC,
      },
    );

    return decrypted.toString(CryptoES.enc.Utf8);
  } catch (error) {
    console.error(error);
    return;
  }
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
