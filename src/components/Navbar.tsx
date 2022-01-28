import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Theme,
  Toolbar,
  Container,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";

import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MobileNav from "./navigation/MobileNav";
import Logo from "../icons/Logo";
interface NavbarProps {}

const Navbar: React.FunctionComponent<NavbarProps> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const openToggle = React.useCallback(() => {
    setOpen(!open);
  }, [open]);
  const props = {
    true: { display: "flex", justifyContent: "center" },
    false: {},
  };
  return (
    <React.Fragment>
      <AppBar color="inherit" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar variant="dense">
            {sm && (
              <IconButton onClick={openToggle}>
                <MenuOutlinedIcon />
              </IconButton>
            )}
            <Box {...props[`${sm}`]} flexGrow={1}>
              <Link to="/">
                <Logo />
              </Link>
            </Box>
            {!sm && (
              <Stack direction="row" alignItems="center" gap={2}>
                <Button
                  endIcon={<CurrencyRupeeOutlinedIcon />}
                  component={Link}
                  variant={
                    pathname === "/cryptocurrencies" ? "outlined" : "text"
                  }
                  to="/cryptocurrencies"
                >
                  Cryptocurrencies
                </Button>
                <Button
                  endIcon={<CurrencyExchangeOutlinedIcon />}
                  component={Link}
                  variant={pathname === "/exchanges" ? "outlined" : "text"}
                  to="/exchanges"
                >
                  Exchanges
                </Button>
                <Button
                  endIcon={<NewspaperOutlinedIcon />}
                  component={Link}
                  variant={pathname === "/news" ? "outlined" : "text"}
                  to="/news"
                >
                  News
                </Button>
              </Stack>
            )}
          </Toolbar>
        </Container>
        <Divider />
      </AppBar>
      <Toolbar variant="dense" />
      <MobileNav open={open} close={openToggle} />
    </React.Fragment>
  );
};

export default Navbar;
