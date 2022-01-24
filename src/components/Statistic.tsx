import { Box, Typography } from "@mui/material";
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
    <Box>
      <Typography variant="h5" color="GrayText" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" component="h2">
        {value}
      </Typography>
    </Box>
  );
};

export default Statistic;
