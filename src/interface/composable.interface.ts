export interface EncryptedData {
  iv: string;
  ciphertext: string;
}

export interface GenericObject {
  [key: string]: any;
}
