import { Stack, CircularProgress } from "@mui/material";
import * as React from "react";
interface LoadingProps {}

const Loading: React.FunctionComponent<LoadingProps> = () => {
  return (
    <Stack
      sx={{ height: `80vh` }}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress color="primary" />
    </Stack>
  );
};

export default Loading;
