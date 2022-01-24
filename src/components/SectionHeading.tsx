import { Button, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import * as React from "react";
interface SectionHeadingProps {
  title: string;
  message?: string;
  navigateTo?: string;
}

const SectionHeading: React.FunctionComponent<SectionHeadingProps> = ({
  title,
  navigateTo,
  message,
}) => {
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant={smUp ? "h4" : "h5"} component="h2">
        {title}
      </Typography>
      {navigateTo && smUp && (
        <Button
          component={Link}
          to={navigateTo}
          endIcon={<ArrowForwardOutlinedIcon />}
        >
          Show more {message ?? null}
        </Button>
      )}
    </Stack>
  );
};

export default SectionHeading;
