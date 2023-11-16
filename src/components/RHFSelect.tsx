import { useFormContext, Controller } from "react-hook-form";
import { Autocomplete, TextField, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CoffeeDto } from "../dto/coffee.dto";

interface IProps {
  name: string;
  onValueChange?: (value: CoffeeDto | null) => void;
}

export default function RHFSelect({
  name,
  onValueChange,
  ...other
}: IProps & TextFieldProps) {
  const { control, watch } = useFormContext();
  const [options, setOptions] = useState<CoffeeDto[]>([]);
  const coffeeType = watch("coffeeType");

  useEffect(() => {
    coffeeType
      ? axios
          .get(
            `https://api.sampleapis.com/coffee/${
              coffeeType === "Hot coffee" ? "hot" : "iced"
            }`
          )
          .then((response) => {
            setOptions(response.data);
          })
          .catch((error) => {
            console.error(error);
          })
      : setOptions([]);
  }, [coffeeType]);

  const hasValue = (value: any) => ![undefined, null].includes(value);
  const getId = (value: any) => (hasValue(value) ? value?.id : value);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          onChange={(event, item: CoffeeDto | null) => {
            event.preventDefault();
            onChange?.(item);
            onValueChange?.(item);
          }}
          value={value}
          options={options}
          getOptionLabel={(option) => option.title}
          isOptionEqualToValue={(option, value) =>
            getId(option) === getId(value)
          }
          filterOptions={(options) => options}
          loading={options.length === 0}
          fullWidth
          renderInput={(params) => (
            <TextField {...params} value={value} label="Address" />
          )}
          disabled={other.disabled}
        />
      )}
    />
  );
}
