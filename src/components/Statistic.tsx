import { Box, Typography, Paper } from "@mui/material";
import * as React from "react";
interface StatisticProps {
  title: string;
  value: string | number;
}

const Statistic: React.FunctionComponent<StatisticProps> = ({
  title,
  value,
}) => {
  return (
    <Box sx={{ p: 1 }} component={Paper} variant="outlined">
      <Typography
        align="center"
        variant="h5"
        color="text.secondary"
        component="h2"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography align="center" variant="h6" component="h2">
        {value}
      </Typography>
    </Box>
  );
};

export default Statistic;
