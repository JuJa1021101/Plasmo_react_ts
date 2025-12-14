import { RuleObject } from "antd/es/form";
import { Dayjs } from "dayjs";

import { PROFILE_FORM_ITEM_TYPE_ENUM } from "@/components/Profile/FormFactory";

import { components } from "@/services/schema";

import { isEmpty } from "./lang";

export const registrationPasswordValidator = (rule: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject("Please input your password!");
  }

  let count = 0;

  if (8 <= value.length && value.length <= 32) {
    if (value.match(".*\\d.*")) count++;
    if (value.match(".*[A-Za-z].*")) count++;
  }

  if (count < 2) {
    return Promise.reject(
      "Your password should contain both numbers and letters with 8 minimum length"
    );
  }

  return Promise.resolve();
};

export const jobTitleValidator = (rule: RuleObject, value: Array<string>) => {
  const error = "Please input at least one job title.";

  if (isEmpty(value)) {
    return Promise.reject(error);
  }
  if (Array.isArray(value) && !value.join("").trim()) {
    return Promise.reject(error);
  }

  return Promise.resolve();
};

export const cityValidator = (rule: RuleObject, value: Array<string>) => {
  const error = "Please select one city at least.";

  if (isEmpty(value) || !value[0]) {
    return Promise.reject(error);
  }

  return Promise.resolve();
};

export const jobTitleV2Validator = (
  rule: RuleObject,
  value: components["schemas"]["JobTaxonomyBO"][]
) => {
  const error = "Please select at least one job title.";

  if (isEmpty(value) || !value[0]?.taxonomyId || !value[0]?.title) {
    return Promise.reject(error);
  }

  return Promise.resolve();
};

export const multipleLocationValidator = (
  rule: RuleObject,
  value: Array<components["schemas"]["LocationBO"]>
) => {
  const error = "Please select one city at least.";

  if (isEmpty(value) || !value[0]?.city) {
    return Promise.reject(error);
  }

  return Promise.resolve();
};

export const endlessMonthlyRangePickerValidator = (
  rule: RuleObject,
  value: {
    date: string | Dayjs | null;
    isCurrent: boolean;
  }
) => {
  if (value?.date && value?.isCurrent) {
    return Promise.reject("Please select either date or current.");
  } else if (!value?.date && !value?.isCurrent) {
    return Promise.reject("Please select either date or current.");
  }

  return Promise.resolve();
};

export const VALIDATOR_GROUP: Record<string, (rule: RuleObject, value: any) => Promise<any>> = {
  "job-title": jobTitleValidator,
  city: cityValidator,
  locations: multipleLocationValidator,
  "job-taxonomy": jobTitleV2Validator,
  [PROFILE_FORM_ITEM_TYPE_ENUM.ENDLESS_MONTHLY_RANGE_PICKER]: endlessMonthlyRangePickerValidator,
};
