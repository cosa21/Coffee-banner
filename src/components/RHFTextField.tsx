import { useFormContext, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

interface IProps {
  name: string;
}

export default function RHFTextField({
  name,
  ...other
}: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          onChange={(event) => {
            field.onChange(event);
          }}
          value={field.value}
          {...other}
        />
      )}
    />
  );
}
