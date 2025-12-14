import { TRAFFIC_AB_STATUS } from "@/enums";
import { FILTER_UPDATE_ENUM, SPECIAL_CITY } from "@/enums/filter";
import { identity, isEqual, isNil, omit, pickBy } from "lodash-es";

import { components } from "@/services/schema";

import {
  COMPANY_STAGE_2_DISPLAY,
  DATE_POSTED_OPTIONS,
  EXPERIENCE_LEVELS_OPTIONS,
  JOB_TITLE_JOIN_SEPARATOR,
  JOB_TYPE_OPTIONS,
  WORK_MODE_OPTIONS,
} from "@/constants";

import { isEmpty } from "./lang";

const PREFERENCE_KEY_VALUE_MAP: Record<
  string,
  {
    label: string;
    value: number;
  }[]
> = {
  jobTypes: JOB_TYPE_OPTIONS,
  seniority: EXPERIENCE_LEVELS_OPTIONS,
  workModel: WORK_MODE_OPTIONS,
};

const ONE_GRAND = 1000;

const FILTER_SORTER: (keyof components["schemas"]["FilterResult"])[] = [
  // basic
  "jobTitle",
  "jobTaxonomyList",
  "locations",
  "jobTypes",
  "workModel",
  "city",
  "radiusRange",
  "seniority",
  "excludedTitle",
  "minYearsOfExperienceRange",
  "daysAgo",

  // Compensation & Sponsorship
  "annualSalaryMinimum",
  "isH1BOnly",

  // Areas of Interests
  "companyCategory",
  "skills",
  "excludedSkills",
  "roleType",

  // Company Insights
  "companies",
  "companyStages",
  "excludedCompanies",
  "excludeStaffingAgency",
];

export const getFormatFilters = ({
  dataSource,
  taxonomyABStatus,
}: {
  dataSource?: components["schemas"]["FilterResult"];
  taxonomyABStatus?: string;
}) => {
  let updatedDataSource = dataSource as components["schemas"]["FilterResult"];

  if (isEmpty(dataSource?.locations)) {
    updatedDataSource = {
      ...dataSource,
      locations: [
        {
          city: dataSource?.city,
          radiusRange: dataSource?.radiusRange,
        },
      ],
    };
  }

  updatedDataSource = omit(updatedDataSource, ["city", "radiusRange"]);

  const preferenceKeyFilter = (key: string) => {
    return ["suggestSeniority"].indexOf(key) === -1;
  };

  return FILTER_SORTER.filter(preferenceKey => {
    const preferenceValue = updatedDataSource?.[preferenceKey];
    if (!isEmpty(updatedDataSource?.locations) && ["city", "radiusRange"].includes(preferenceKey)) {
      return false;
    }

    return preferenceKeyFilter(preferenceKey) && !isEmpty(preferenceValue);
  })
    .reduce<(string | undefined)[]>(
      (allTags, preferenceKey) => {
        const preferenceValue = updatedDataSource?.[preferenceKey];

        // special handler for excludedTitle, excludedSkills
        if (preferenceKey === "excludedTitle" || preferenceKey === "excludedSkills") {
          return [...allTags, ...(preferenceValue as string[]).map(val => `No ${val}`)];
        }

        if (preferenceKey === "excludedCompanies") {
          return [
            ...allTags,
            ...(preferenceValue as components["schemas"]["CompanyBO"][]).map(
              val => `No ${val?.companyName}`
            ),
          ];
        }

        if (preferenceKey === "companies") {
          return [
            ...allTags,
            ...(preferenceValue as components["schemas"]["CompanyBO"][]).map(
              val => val?.companyName as string
            ),
          ];
        }

        // minYearsOfExperienceRange
        if (preferenceKey === "minYearsOfExperienceRange") {
          return [
            ...allTags,
            `${(
              preferenceValue as components["schemas"]["FilterRequest"]["minYearsOfExperienceRange"]
            )?.join("-")} Years`,
          ];
        }

        // daysAgo
        if (preferenceKey === "daysAgo") {
          return [
            ...allTags,
            DATE_POSTED_OPTIONS.filter(val => val.value === Number(preferenceValue))[0]?.label,
          ];
        }

        // special handler for companyStages
        if (preferenceKey === "companyStages") {
          return [
            ...allTags,
            ...(preferenceValue as string[]).map(val => COMPANY_STAGE_2_DISPLAY[val]),
          ];
        }

        if (preferenceKey === "locations" && !isEmpty(preferenceValue)) {
          return [
            ...allTags,
            ...(preferenceValue as components["schemas"]["LocationBO"][])
              ?.filter(val => !!val?.city || !isNil(val?.radiusRange))
              ?.map(val =>
                val.city && !isNil(val.radiusRange)
                  ? `${val?.city}${
                      val.city !== SPECIAL_CITY.within_us ? ` (${val?.radiusRange} mi)` : ""
                    }`
                  : `${val?.radiusRange} mi`
              ),
          ];
        }

        if (Array.isArray(preferenceValue) && preferenceKey !== "jobTaxonomyList") {
          if (PREFERENCE_KEY_VALUE_MAP[preferenceKey]) {
            const valueLabelMap = Object.values(PREFERENCE_KEY_VALUE_MAP[preferenceKey]).reduce(
              (current, record) => {
                return {
                  ...current,
                  [record?.value]: record?.label,
                };
              },
              {} as Record<number, string>
            );

            return [...allTags, ...preferenceValue?.map(value => valueLabelMap[value as number])];
          }
          // companyCategory
          return [...allTags, ...(preferenceValue as string[])];
        }

        // annualSalaryMinimum
        if (preferenceKey === "annualSalaryMinimum") {
          return [...allTags, `Min ${salaryFormatter(preferenceValue as number)}`];
        }

        // isH1BOnly
        if (preferenceKey === "isH1BOnly") {
          return preferenceValue ? [...allTags, "H1B Only"] : allTags;
        }
        // excludeStaffingAgency
        if (preferenceKey === "excludeStaffingAgency") {
          return preferenceValue ? [...allTags, "Exclude Staffing Agency"] : allTags;
        }

        // radiusRange
        if (preferenceKey === "radiusRange" && isEmpty(dataSource?.locations)) {
          return [...allTags, `${preferenceValue} miles`];
        }

        if (preferenceKey === "jobTitle" && !isEmpty(preferenceValue)) {
          if (taxonomyABStatus === TRAFFIC_AB_STATUS.on && !isEmpty(dataSource?.jobTaxonomyList)) {
            return [...allTags]; // skip jobTitle when taxonomyABStatus is on and jobTaxonomyList is not empty
          } else if (
            taxonomyABStatus === TRAFFIC_AB_STATUS.off ||
            !taxonomyABStatus ||
            isEmpty(dataSource?.jobTaxonomyList)
          ) {
            return [
              ...allTags,
              ...(preferenceValue + "")
                ?.split(JOB_TITLE_JOIN_SEPARATOR)
                ?.map(tag => tag?.trim())
                ?.filter(tag => !!tag),
            ];
          }
        }

        if (preferenceKey === "jobTaxonomyList" && !isEmpty(dataSource?.jobTaxonomyList)) {
          if (taxonomyABStatus === TRAFFIC_AB_STATUS.on) {
            return [
              ...allTags,
              ...(dataSource?.jobTaxonomyList as components["schemas"]["JobTaxonomyBO"][])?.map(
                taxonomy => taxonomy?.title
              ),
            ];
          } else {
            return allTags;
          }
        }

        return [...allTags, preferenceValue as string];
      },
      [] as (string | undefined)[]
    )
    .filter((tag): tag is string => tag !== undefined);
};

export const getFormatFiltersFromQuery = (
  query: any
): components["schemas"]["VisitorJobListRequest"] => {
  return Object.keys(query).reduce(
    (
      newQuery: {
        [key: string]: any;
      },
      key: string
    ) => {
      if ((["visit"] as string[]).includes(key)) {
        return newQuery as components["schemas"]["VisitorJobListRequest"];
      }

      if (query[key] === "undefined" || query[key] === undefined || query[key] === "false") {
        newQuery[key] = null;
      } else if (["companies", "locations"].includes(key)) {
        try {
          newQuery[key] = JSON.parse(query[key]);
        } catch (e) {
          console.log("Error parsing companies", e);
        }
      } else if (
        [
          "jobTypes",
          "seniority",
          "workModel",
          "companyCategory",
          "skills",
          "companyStages",
          "excludedTitle",
          "excludedCompanies",
          "excludedSkills",
          "minYearsOfExperienceRange",
        ].includes(key) &&
        typeof query[key] === "string"
      ) {
        newQuery[key] = query[key]
          .split(",")
          .map((value: string) => (/^\d+$/.test(value) ? parseInt(value) : value));
      } else if (/^\d+$/.test(query[key])) {
        newQuery[key] = parseInt(query[key]);
      } else if (query[key] === "true") {
        newQuery[key] = true;
      } else {
        newQuery[key] = query[key];
      }

      return newQuery as components["schemas"]["VisitorJobListRequest"];
    },
    {}
  );
};

export const salaryFormatter = (value: number) => {
  return `$${Math.round(value / ONE_GRAND)}k/yr`;
};

export function clearNullOrUndefined(obj: Record<string, any>): Record<string, any> {
  return pickBy(obj, identity);
}

export const checkFilterValueChanged = (newFilter: any, oldFilter: any) => {
  if (!newFilter && oldFilter) {
    return FILTER_UPDATE_ENUM.SELECTED_TO_UNSELECTED;
  }

  if (newFilter && !oldFilter) {
    return FILTER_UPDATE_ENUM.NON_TO_SELECTED;
  }

  if (!isEqual(newFilter, oldFilter)) {
    return FILTER_UPDATE_ENUM.SELECTED_CHANGED;
  }

  return undefined;
};
