import { TypeWithKey } from "@models/type-with-key";

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERROR_NETWORK: "error network",
  };
  return codeMatcher[errorCode];
};
