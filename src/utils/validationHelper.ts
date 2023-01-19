import { Principal } from '@dfinity/principal';

export function sanitizeDecimalInput(amount: string, callback: (value: string) => void) {
	if (!amount || amount.match(/^\d{1,}(\.\d{0,8})?$/)) {
		callback(amount);
	}
}

export function disableDecimals(amount: string, callback: (value: string) => void) {
	if (!amount || amount.match(/^\d{1,}?$/)) {
		callback(amount);
	}
}

export const decimals = 100000000;

export function validatePrincipal(principal: string, callback: (principal: string, isValid: boolean) => void) {
	try {
		Principal.fromText(principal);
		callback(principal, true);
	} catch (error) {
		callback(principal, false);
	}
}
