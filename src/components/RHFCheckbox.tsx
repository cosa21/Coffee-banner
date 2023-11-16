import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

interface IProps {
  name: string;
}

export default function RHFCheckbox({
  name,
  ...other
}: IProps & CheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          sx={{ "& span": { padding: 0 } }}
          control={<Checkbox checked={!!field.value} {...other} />}
          label="Show image"
        />
      )}
    />
  );
}
