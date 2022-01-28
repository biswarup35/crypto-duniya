import { Box, Typography, Stack, Link as MLink } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{ bgcolor: "background.paper", py: 2 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      component="footer"
    >
      <Stack sx={{ mb: 1 }} direction="row" gap={1}>
        <Link to="/cryptocurrencies">Cryptocurrencies</Link>
        <Link to="/exchanges">Exchanges</Link>
        <Link to="/news">News</Link>
      </Stack>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <MLink color="inherit" component={Link} to="/">
          Crypto Duniya
        </MLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
