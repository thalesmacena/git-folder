import { CheckoutOptions } from "../commands/command"

export const getCheckoutStringOption = (option: CheckoutOptions) => {
  return option.orphan ? "--orphan" : option.B ? "-B" : option.b ? "-b" : "";
}