export default function processFilteredData(isMultiple, inputData, duration) {
  const durationMapping = {
    "24h": 24 * 60 * 60 * 1000,
    "7 days": 7 * 24 * 60 * 60 * 1000,
    "30 days": 30 * 24 * 60 * 60 * 1000,
    "3 months": 90 * 24 * 60 * 60 * 1000,
  };

  const cutoffTime = Date.now() - (durationMapping[duration] || durationMapping["24h"]);

  const filterData = (data) =>
    data.filter((entry) => new Date(entry[0]) >= cutoffTime);

  if (isMultiple) {
    return inputData.map((item) => ({
      ...item,
      data: filterData(item.data),
    }));
  }

  return filterData(inputData);
}
