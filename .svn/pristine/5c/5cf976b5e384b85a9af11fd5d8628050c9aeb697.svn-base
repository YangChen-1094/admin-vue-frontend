import CryptoJS from 'crypto-js';

export const AES = {
	defaultKey(){
		return "1234567890123456";
	},
	//加密
	encrypt(word) {
		let key = CryptoJS.enc.Utf8.parse(this.defaultKey());
		let iv = CryptoJS.enc.Utf8.parse(this.defaultKey());
		let src = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(src, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	},
	//解密
	decrypt(word) {
		let key = CryptoJS.enc.Utf8.parse(this.defaultKey());
		let iv = CryptoJS.enc.Utf8.parse(this.defaultKey());
		let base64 = CryptoJS.enc.Base64.parse(word);
		let src = CryptoJS.enc.Base64.stringify(base64);
		let decrypt = CryptoJS.AES.decrypt(src, key, {
			iv: iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding
		});
		return CryptoJS.enc.Utf8.stringify(decrypt).toString().trim();
	}
}