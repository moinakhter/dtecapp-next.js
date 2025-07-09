import { importPKCS8 } from 'jose';

// Load RSA Private Key (PEM) to jose-compatible key
async function importPrivateKey(pemKey: string) {
  return await importPKCS8(pemKey, 'RS256');
}
export default importPrivateKey;