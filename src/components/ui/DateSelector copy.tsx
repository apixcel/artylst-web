import DatePicker, { DateObject } from "react-multi-date-picker";

interface IProps {
  value?: DateObject[];
  onChange?: (value?: DateObject[] | null) => void;
}
const DateSelector: React.FC<IProps> = ({ onChange, value }) => {
  return (
    <DatePicker
      format="MMM DD, YYYY"
      title="Date Range"
      range
      className="!bg-white/10 backdrop-blur-2xl white"
      value={value}
      onChange={onChange}
      placeholder="MM/DD/YYYY - MM/DD/YYYY"
      containerClassName="outline-none bg-white/10 border-[1px] border-white/10 py-[6px] rounded-lg pl-[8px]"
    />
  );
};

export default DateSelector;
