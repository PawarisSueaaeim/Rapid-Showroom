export function filteredModel(
  unfilteredCategoryDatas: any,
  selectedBrand: any
) {
  if (unfilteredCategoryDatas && unfilteredCategoryDatas.models) {
    const modelsForDropdown = unfilteredCategoryDatas.models
      .filter(
        (unfilteredCategoryData: { brand: any }) =>
          unfilteredCategoryData.brand === selectedBrand
      )
      .map(
        (filteredCategoryData: { model: any }) => filteredCategoryData.model
      );

    return modelsForDropdown;
  } else {
    return [];
  }
}

export function filteredModelMulti(
  unfilteredCategoryDatas: any,
  selectedBrands: any
) {
  if (unfilteredCategoryDatas && unfilteredCategoryDatas.models) {
    const modelsForDropdown = unfilteredCategoryDatas.models
      .filter((unfilteredCategoryData: { brand: any }) =>
        selectedBrands.includes(unfilteredCategoryData.brand)
      )
      .map(
        (filteredCategoryData: { model: any }) => filteredCategoryData.model
      );

    return modelsForDropdown;
  } else {
    return [];
  }
}

export function filteredYearArray(
  unfilteredCategoryDatas: any,
  selectedBrands: any,
  selectedModels: any
) {
  const yearsForDropdown = unfilteredCategoryDatas.years
    .filter((unfilteredCategoryData: { brand: any; model: any }) => {
      const brandMatch = selectedBrands.includes(unfilteredCategoryData.brand);
      const modelMatch = selectedModels.includes(unfilteredCategoryData.model);
      return brandMatch && modelMatch;
    })
    .map((filteredCategoryData: { year: any }) => filteredCategoryData.year);

  return yearsForDropdown;
}

export function filteredYear(
  unfilteredCategoryDatas: any,
  selectedBrand: any,
  selectedModel: any
) {
  if (unfilteredCategoryDatas && unfilteredCategoryDatas.years) {
    const yearForDropdown = unfilteredCategoryDatas.years
      .filter(
        (unfilteredCategoryData: { brand: any; model: any }) =>
          unfilteredCategoryData.brand === selectedBrand &&
          unfilteredCategoryData.model === selectedModel
      )
      .map((filteredCategoryData: { year: any }) => filteredCategoryData.year);

    return yearForDropdown;
  } else {
    return [];
  }
}

export const filteredDetails = (
  unfilteredCategoryDatas: any,
  selectedBrand?: any,
  selectedModel?: any,
  selectedYear?: any
) => {
  if (unfilteredCategoryDatas && unfilteredCategoryDatas.detail) {
    const descriptionForDropdown = unfilteredCategoryDatas.detail
      .filter(
        (unfilteredCategoryData: { brand: any; model: any; year: any }) => {
          return (
            (!selectedBrand ||
              unfilteredCategoryData.brand === selectedBrand) &&
            (!selectedModel ||
              unfilteredCategoryData.model === selectedModel) &&
            (!selectedYear || unfilteredCategoryData.year === selectedYear)
          );
        }
      )
      .map(
        (filteredCategoryData: { Description: any }) => filteredCategoryData
      );

    return descriptionForDropdown;
  } else {
    return [];
  }
};

export function filteredDescription(
  unfilteredCategoryDatas: any,
  selectedBrand: any,
  selectedModel: any,
  selectedYear: any
) {
  if (unfilteredCategoryDatas && unfilteredCategoryDatas.detail) {
    const descriptionForDropdown = unfilteredCategoryDatas.detail
      .filter(
        (unfilteredCategoryData: { brand: any; model: any; year: any }) =>
          unfilteredCategoryData.brand === selectedBrand &&
          unfilteredCategoryData.model === selectedModel &&
          unfilteredCategoryData.year === selectedYear
      )
      .map(
        (filteredCategoryData: { Description: any }) => filteredCategoryData
      );

    return descriptionForDropdown;
  } else {
    return [];
  }
}
