import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function Preview() {
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

      <Card sx={{ margin: "1rem" }}>
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
            <Typography variant="h5">{"test"}</Typography>
          </Grid>
          <Grid item width="100%">
            <CardContent>
              <Grid container display="flex" flexDirection="column" spacing={2}>
                <Grid item display="flex" flexDirection="row">
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    width="50%"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {"test"}
                  </Typography>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      width: "50%",
                    }}
                    image={"test"}
                    title={"test"}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
}
