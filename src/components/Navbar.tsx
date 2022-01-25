import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Theme,
  Toolbar,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";

import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MobileNav from "./navigation/MobileNav";
interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const openToggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  return (
    <React.Fragment>
      <AppBar color="default">
        <Toolbar variant="dense">
          {sm && (
            <IconButton onClick={openToggle}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Box flexGrow={1}>
            <Button sx={{ textTransform: "none" }} component={Link} to="/">
              Crypto Duniya
            </Button>
          </Box>
          {!sm && (
            <Stack direction="row" alignItems="center" gap={2}>
              <Button
                endIcon={<CurrencyRupeeOutlinedIcon />}
                sx={{ textTransform: "none" }}
                component={Link}
                to="/cryptocurrencies"
              >
                Cryptocurrencies
              </Button>
              <Button
                endIcon={<CurrencyExchangeOutlinedIcon />}
                sx={{ textTransform: "none" }}
                component={Link}
                to="/exchanges"
              >
                Exchanges
              </Button>
              <Button
                endIcon={<NewspaperOutlinedIcon />}
                sx={{ textTransform: "none" }}
                component={Link}
                to="/news"
              >
                News
              </Button>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
      <MobileNav open={open} close={openToggle} />
    </React.Fragment>
  );
};

export default Navbar;
