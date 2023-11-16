import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function Preview() {
  const { watch } = useFormContext();

  return (
    <Paper
      elevation={4}
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "1rem",
        padding: "1rem",
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {"Preview"}
      </Typography>
      {watch("coffeeName") && (
        <Card
          sx={{
            margin: "1rem",
            width: `${
              watch("width") && watch("width") !== "100%"
                ? watch("custom") !== ""
                  ? `${watch("custom")}px`
                  : watch("width")
                : undefined
            }`,
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
              <Typography variant="h5">{watch("title")}</Typography>
            </Grid>
            <Grid item width="100%">
              <CardContent>
                <Grid
                  container
                  display="flex"
                  flexDirection="column"
                  spacing={2}
                >
                  <Grid item display="flex" flexDirection="row">
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      width={watch("showImage") ? "50%" : "100%"}
                      sx={{ wordBreak: "break-word" }}
                    >
                      {watch("description")}
                    </Typography>
                    {watch("showImage") && (
                      <CardMedia
                        component="img"
                        sx={{
                          height: 200,
                          width: "50%",
                        }}
                        image={watch("coffeeName.image")}
                        title={watch("title")}
                      />
                    )}
                  </Grid>
                  <Grid item>
                    {watch("coffeeName.ingredients")?.map((i: string) => (
                      <Chip key={i} label={i} sx={{ marginX: 0.5 }} />
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      )}
    </Paper>
  );
}
