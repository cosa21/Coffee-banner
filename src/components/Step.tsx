import { Paper, Grid, Typography, Button } from "@mui/material";
import { ReactNode } from "react";
import CodeIcon from "@mui/icons-material/Code";
import UndoIcon from "@mui/icons-material/Undo";

interface IProps {
  children: ReactNode;
  disabled?: boolean;
  name: string;
  onNext: () => void;
  onReset?: () => void;
}

enum STEP {
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
}

export default function Step({
  children,
  disabled,
  name,
  onNext,
  onReset,
}: IProps) {
  const title =
    name === STEP.FIRST
      ? "Select your coffee"
      : name === STEP.SECOND
      ? "Chose your width"
      : "Customize title and description";

  return (
    <Paper
      elevation={4}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
      }}
    >
      <Grid container>
        <Grid
          item
          width="100%"
          sx={{
            background: "#1976d2",
            borderTopLeftRadius: "0.25rem",
            borderTopRightRadius: "0.25rem",
            paddingY: 1,
            paddingX: 2,
          }}
        >
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item width="100%" p={2}>
          {children}
        </Grid>
        <Grid
          item
          width="100%"
          display="flex"
          justifyContent={name === STEP.THIRD ? "space-between" : "flex-end"}
          pb={1}
          px={2}
        >
          {name === STEP.THIRD && (
            <Button
              variant="contained"
              color="primary"
              disabled={disabled}
              onClick={onReset}
              endIcon={<UndoIcon />}
            >
              Start over
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            disabled={disabled}
            onClick={onNext}
            endIcon={name === STEP.THIRD && <CodeIcon />}
          >
            {name === STEP.THIRD ? "View and copy code" : "Next"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
