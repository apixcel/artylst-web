import { Info } from "lucide-react";

type FormErrorMessageProps = {
  message: string;
  icon?: React.ReactNode;
};

const FormErrorMessage = ({
  message,
  icon = <Info className="inline-block h-4 w-4 text-red-400" />,
}: FormErrorMessageProps) => {
  return (
    <p className="form-error-message flex items-center gap-1">
      {message && icon}
      {message}
    </p>
  );
};

export default FormErrorMessage;
