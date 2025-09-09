type Unit = {
  value: number;
  suffix: string;
};

const units: Unit[] = [
  { value: 1_00_00_000, suffix: "Cr" },
  { value: 10_00_000, suffix: "M" },
  { value: 1_000, suffix: "K" },
];

const formatNumberWithSuffix = (value: number): string => {
  for (const unit of units) {
    if (value >= unit.value) {
      return `${(value / unit.value).toFixed(2)} ${unit.suffix}`;
    }
  }
  return value.toString();
};

const numberUtils = {
  formatNumberWithSuffix,
};

export default numberUtils;
