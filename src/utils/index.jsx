import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils.js";

export const addressShortener = (address) => {
  return address.slice(0, 3) + " ... " + address.slice(-4);
};

export const fromBn = (num) => {
  return ethers.utils.formatUnits(num, 0);
};
