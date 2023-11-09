export function filteredModel(
  unfilteredCategoryDatas: any,
  selectedBrand: any
) {
  const modelsForDropdown = unfilteredCategoryDatas.models
    .filter(
      (unfilteredCategoryData: { brand: any }) =>
        unfilteredCategoryData.brand === selectedBrand
    )
    .map((filteredCategoryData: { model: any }) => filteredCategoryData.model);

  return modelsForDropdown;
}

export function filteredModelMulti(
  unfilteredCategoryDatas: any,
  selectedBrands: any
) {
  const modelsForDropdown = unfilteredCategoryDatas.models
    .filter((unfilteredCategoryData: { brand: any }) =>
      selectedBrands.includes(unfilteredCategoryData.brand)
    )
    .map((filteredCategoryData: { model: any }) => filteredCategoryData.model);

  return modelsForDropdown;
}

export function filteredYear(
  unfilteredCategoryDatas: any,
  selectedBrand: any,
  selectedModel: any
) {
  const yearForDropdown = unfilteredCategoryDatas.years
    .filter(
      (unfilteredCategoryData: { brand: any; model: any }) =>
        unfilteredCategoryData.brand === selectedBrand &&
        unfilteredCategoryData.model === selectedModel
    )
    .map((filteredCategoryData: { year: any }) => filteredCategoryData.year);

  return yearForDropdown;
}

export function filteredDescription(
  unfilteredCategoryDatas: any,
  selectedBrand: any,
  selectedModel: any,
  selectedYear: any
) {
  const descriptionForDropdown = unfilteredCategoryDatas.detail
    .filter(
      (unfilteredCategoryData: { brand: any; model: any; year: any }) =>
        unfilteredCategoryData.brand === selectedBrand &&
        unfilteredCategoryData.model === selectedModel &&
        unfilteredCategoryData.year === selectedYear
    )
    .map((filteredCategoryData: { Description: any }) => filteredCategoryData);

  return descriptionForDropdown;
}
