import Logger from '../Helpers/Logger';
import { md, util, Encoding, pki } from 'node-forge';
/**
 * Hashes a string using sha256
 * @param {string} string
 * @param {string} encoding = "raw"
 * @returns {Promise<string>}
 */
export const stringToHash = async (string: string, encoding: Encoding = 'raw') => {
    const messageDigest = md.sha256.create();
    messageDigest.update(string, encoding);
    return messageDigest.digest().toHex();
};

/**
 * Encrypts a string using a publicKey
 * @param {string} data
 * @param publicKey
 * @returns {Promise<string>}
 */
export const encryptString = async (data: string, publicKey: pki.rsa.PublicKey, raw: boolean = false): Promise<string | any> => {
    // sign it with a server's public key
    const signatureBytes = publicKey.encrypt(data);

    if (raw) return signatureBytes;

    // encode to base 64 and return it
    return util.encode64(signatureBytes);
};

/**
 * Signs a string using a privateKey
 * @param {string} data
 * @param privateKey
 * @param {string} encoding = "raw"
 * @returns {Promise<string>}
 */
export const signString = async (data: string, privateKey: pki.rsa.PrivateKey, encoding: Encoding = 'raw') => {
    // create a new message digest for our string
    const messageDigest = md.sha256.create();
    messageDigest.update(data, encoding);

    // sign it with a private key
    const signatureBytes = privateKey.sign(messageDigest);
    // encode to base 64 and return it
    return util.encode64(signatureBytes);
};

/**
 * Verifies if a string was signed by a public key
 * @param {string} data
 * @param publicKey
 * @param {string} signature
 * @param {string} encoding = "raw"
 * @returns {Promise<string>}
 */
export const verifyString = async (data: string, publicKey: pki.rsa.PublicKey, signature: string, encoding: Encoding = 'raw') => {
    // create a new message digest for our string
    const messageDigest = md.sha256.create();
    messageDigest.update(data, encoding);

    try {
        // decode the base64 signature
        const rawSignature = util.decode64(signature);

        // verify the signature with the public key
        const verified = publicKey.verify(messageDigest.digest().getBytes(), rawSignature);
        return verified;
    } catch (ex) {
        Logger.debug(ex);
        return false;
    }
};
