import DatePicker, { DateObject } from "react-multi-date-picker";

interface IProps {
  value?: DateObject;
  onChange?: (value: DateObject | null) => void;
}
const DateSelector: React.FC<IProps> = ({ onChange, value }) => {
  return (
    <DatePicker
      format="MMMM DD, YYYY"
      title="Date Range"
      className="!bg-white/10 backdrop-blur-2xl"
      value={value}
      onChange={onChange}
      containerClassName="outline-none bg-brand-2/10 border-[1px] border-white/10 py-3 px-4 w-full rounded-2xl"
      inputClass="border-none w-full outline-none"
    />
  );
};

export default DateSelector;
