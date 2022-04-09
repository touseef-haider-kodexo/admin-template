import { CLAIM_STATUS_ARRAY } from "./constants";

const makeStatus = (value) => {
  return CLAIM_STATUS_ARRAY.find((status) => status?.value == value);
};

export default makeStatus;
