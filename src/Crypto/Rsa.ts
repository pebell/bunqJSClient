import { pki } from 'node-forge';
import { promisify } from 'util';

/**
 * Generates a new keypair
 * @param {number} bits
 * @param {number} workers
 * @returns {Promise<object>}
 */
export const createKeyPair = async (bits: number = 2048, workers: number = -1) => {
    return promisify(pki.rsa.generateKeyPair)({ bits, workers });
};

export const keyPairToPem = async (keypair: pki.rsa.KeyPair) => {
    return {
        publicKey: await publicKeyToPem(keypair.publicKey),
        privateKey: await privateKeyToPem(keypair.privateKey),
    };
};

export const publicKeyToPem = async (publicKey: pki.rsa.PublicKey) => {
    return pki.publicKeyToPem(publicKey);
};

export const privateKeyToPem = async (privateKey: pki.rsa.PrivateKey) => {
    return pki.privateKeyToPem(privateKey);
};

export const publicKeyFromPem = async (publicKeyPem: string) => {
    return pki.publicKeyFromPem(publicKeyPem);
};
export const privateKeyFromPem = async (privateKeyPem: string) => {
    return pki.privateKeyFromPem(privateKeyPem);
};
