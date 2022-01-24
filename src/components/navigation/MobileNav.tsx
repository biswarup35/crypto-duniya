import * as React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
interface MobileNavProps {
  open: boolean;
  close: () => void;
}

const MobileNav: React.FunctionComponent<MobileNavProps> = ({
  open,
  close,
}) => {
  return (
    <Drawer open={open} onClose={close}>
      <Box sx={{ width: 240 }} component="nav">
        <List disablePadding>
          <ListItem disablePadding component="li">
            <ListItemButton onClick={close} component={Link} to="/">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component="li">
            <ListItemButton
              onClick={close}
              component={Link}
              to="/cryptocurrencies"
            >
              <ListItemIcon>
                <CurrencyRupeeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Criptocurrencies" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component="li">
            <ListItemButton onClick={close} component={Link} to="/exchanges">
              <ListItemIcon>
                <CurrencyExchangeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Exchanges" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding component="li">
            <ListItemButton onClick={close} component={Link} to="/news">
              <ListItemIcon>
                <NewspaperOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="News" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileNav;
