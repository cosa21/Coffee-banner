import { useFormContext, Controller } from "react-hook-form";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  RadioProps,
} from "@mui/material";

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  row?: boolean;
  options: (string | number)[];
}

export default function RHFRadioGroup({
  name,
  row = false,
  options,
  ...other
}: IProps & RadioProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Box>
          <RadioGroup row={row} {...field}>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio {...other} />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      )}
    />
  );
}
