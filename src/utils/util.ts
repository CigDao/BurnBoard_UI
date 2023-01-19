import bigDecimal from "js-big-decimal";

export type consumer<T> = (t:T) => void;
export const DECIMALS = 100000000;

export function bigIntToDecimal(big: BigInt | number) {
    var result = new bigDecimal(big?.toString() || 1);
    var decimal = new bigDecimal(DECIMALS);
    return result.divide(decimal, 8);
}

export function bigIntToDecimalPrettyString(big: BigInt | number) {
    return bigIntToDecimal(big).round(3).subtract(new bigDecimal(0.001)).getPrettyValue(3, ",");
}


export default {
    bigIntToDecimal,
    bigIntToDecimalPrettyString
}