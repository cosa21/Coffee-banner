import "./App.css";
import {
  Stack,
  Grid,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Preview, Step } from "./components";
import { useState } from "react";

enum STEP {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

const coffeeTypeOptions = ["Hot coffee", "Ice coffee"];
const widthOptions = ["160px", "300px", "100%"];

export default function App() {
  const [activeStep, setActiveStep] = useState<STEP>(STEP.FIRST);
  const onChangeStep = () => {
    setActiveStep(
      activeStep === STEP.FIRST
        ? STEP.SECOND
        : activeStep === STEP.SECOND
        ? STEP.THIRD
        : STEP.FIRST
    );
  };

  const onReset = () => {
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
      <Grid container>
        <Grid item xs={12} md={6} p={2} display="flex" flexDirection="column">
          <Step
            name={STEP.FIRST}
            disabled={activeStep !== STEP.FIRST}
            onNext={onChangeStep}
            onReset={onReset}
          >
            <Stack spacing={1}>
              <RadioGroup>
                {coffeeTypeOptions.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio disabled={activeStep !== STEP.FIRST} />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Stack>
          </Step>

          <Step
            name={STEP.SECOND}
            disabled={activeStep !== STEP.SECOND}
            onNext={onChangeStep}
            onReset={onReset}
          >
            <RadioGroup row>
              {widthOptions.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio disabled={activeStep !== STEP.SECOND} />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Step>

          <Step
            name={STEP.THIRD}
            disabled={activeStep !== STEP.THIRD}
            onNext={onChangeStep}
            onReset={onReset}
          >
            <Stack spacing={2}>
              <TextField
                label="Title"
                name="title"
                disabled={activeStep !== STEP.THIRD}
              />
              <TextField
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
    </Stack>
  );
}
