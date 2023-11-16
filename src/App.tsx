import "./App.css";
import { Stack, Grid, FormControlLabel, Radio, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  Preview,
  RHFCheckbox,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
  Step,
} from "./components";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { CoffeeDto } from "./dto/coffee.dto";

enum STEP {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

const coffeeTypeOptions = ["Hot coffee", "Ice coffee"];
const widthOptions = ["160px", "300px", "100%"];

export default function App() {
  const [activeStep, setActiveStep] = useState<STEP>(STEP.FIRST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const methods = useForm({
    defaultValues: {
      coffeeType: "",
      coffeeName: null,
      width: "100%",
      custom: "",
      showImage: true,
      title: "",
      description: "",
    },
  });

  const { setValue, reset, watch } = methods;

  const onChangeStep = () => {
    if (activeStep === STEP.FIRST) {
      setActiveStep(STEP.SECOND);
    } else if (activeStep === STEP.SECOND) {
      setActiveStep(STEP.THIRD);
    } else {
      setIsModalOpen(true);
    }
  };

  console.log(isModalOpen);

  const onReset = () => {
    reset();
    setActiveStep(STEP.FIRST);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <FormProvider {...methods}>
        <form style={{ width: "100%" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              p={2}
              display="flex"
              flexDirection="column"
            >
              <Step
                name={STEP.FIRST}
                disabled={activeStep !== STEP.FIRST || !watch("coffeeName")}
                onNext={onChangeStep}
              >
                <Stack spacing={1}>
                  <RHFRadioGroup
                    name="coffeeType"
                    options={coffeeTypeOptions}
                    disabled={activeStep !== STEP.FIRST}
                  />
                  <RHFSelect
                    name="coffeeName"
                    onValueChange={(value: CoffeeDto | null) => {
                      if (value) {
                        setValue("title", value.title);
                        setValue("description", value.description);
                      } else {
                        setValue("title", "");
                        setValue("description", "");
                      }
                    }}
                    disabled={activeStep !== STEP.FIRST}
                  />
                </Stack>
              </Step>

              <Step
                name={STEP.SECOND}
                disabled={activeStep !== STEP.SECOND || !watch("width")}
                onNext={onChangeStep}
              >
                <Stack spacing={2}>
                  <RHFRadioGroup
                    name="width"
                    row
                    options={widthOptions}
                    disabled={activeStep !== STEP.SECOND}
                    onChange={() => setValue("custom", "")}
                  />
                  <Box display="flex" flexDirection="row">
                    <FormControlLabel
                      value="custom"
                      control={<Radio disabled={activeStep !== STEP.SECOND} />}
                      label="Custom"
                      checked={watch("width") === "custom"}
                      onChange={() => {
                        setValue("width", "custom");
                      }}
                    />
                    {watch("width") === "custom" && (
                      <RHFTextField
                        name="custom"
                        label="Custom Width"
                        disabled={activeStep !== STEP.SECOND}
                      />
                    )}
                  </Box>
                  <RHFCheckbox
                    name="showImage"
                    disabled={activeStep !== STEP.SECOND}
                  />
                </Stack>
              </Step>

              <Step
                name={STEP.THIRD}
                disabled={activeStep !== STEP.THIRD}
                onNext={onChangeStep}
                onReset={onReset}
              >
                <Stack spacing={2}>
                  <RHFTextField
                    label="Title"
                    name="title"
                    disabled={activeStep !== STEP.THIRD}
                  />
                  <RHFTextField
                    multiline
                    maxRows={5}
                    label="Description"
                    name="description"
                    disabled={activeStep !== STEP.THIRD}
                  />
                </Stack>
              </Step>
            </Grid>
            <Grid item xs={12} md={6} p={2}>
              <Preview />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Stack>
  );
}
