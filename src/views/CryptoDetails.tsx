import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useGetCryptoDetailsQuery } from "../services/criptoApi";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import ShopTwoOutlinedIcon from "@mui/icons-material/ShopTwoOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

interface CriptoDetailsProps {}

const CriptoDetails: React.FunctionComponent<CriptoDetailsProps> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { isFetching, data: { data: { coin = {} } = {} } = {} } =
    useGetCryptoDetailsQuery(id);

  const stats = [
    {
      title: "Price to USD",
      value: `${millify(coin?.price ?? 0)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "Rank",
      value: `${coin?.rank}`,
      icon: <BarChartOutlinedIcon />,
    },
    {
      title: "24h Volume",
      value: `${millify(coin?.[`24hVolume`] ?? 0)}`,
      icon: <OfflineBoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `${millify(coin?.marketCap ?? 0)}`,
      icon: <SecurityOutlinedIcon />,
    },
    {
      title: "All-time high(daily avg.)",
      value: `${millify(coin?.allTimeHigh?.price ?? 0)}`,
      icon: <InsightsOutlinedIcon />,
    },
  ];

  const generalStats = [
    {
      title: "Number of Markets",
      value: coin?.numberOfMarkets ?? 0,
      icon: <ShopTwoOutlinedIcon />,
    },
    {
      title: "Number of Exchanges",
      value: coin?.numberOfExchanges ?? 0,
      icon: <ShopOutlinedIcon />,
    },
    {
      title: "Approved Supply",
      value: coin?.supply?.confirmed ?? false,
      icon: <ThumbsUpDownOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: millify(coin?.supply?.total ?? 0),
      icon: <InventoryOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: millify(coin?.supply?.circulating ?? 0),
      icon: <InventoryOutlinedIcon />,
    },
  ];

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <Stack sx={{ my: 2 }} direction="column" alignItems="center">
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar src={coin.iconUrl} />
            <Typography variant="h5" component="h2">
              {`${coin.name} (${coin.symbol})`}
            </Typography>
          </Box>
          <Typography
            sx={{ mt: 2 }}
            variant="body2"
            color="text.secondary"
            align="center"
          >
            {coin.name} live price in US dollars (USD). View value statistics,
            market cap and supply
          </Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" component="h2" gutterBottom>
          Statistics
        </Typography>
        <Stack
          justifyContent="center"
          gap={sm ? 2 : 4}
          direction={sm ? "column" : "row"}
        >
          <Paper variant="outlined">
            <Typography
              sx={{ my: 1 }}
              align="center"
            >{`${coin.name} value Stats`}</Typography>
            <Divider />
            <List>
              {stats.map(({ title, value, icon }) => (
                <ListItem key={title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Stack
                    sx={{ flexGrow: 1 }}
                    direction="row"
                    gap={3}
                    justifyContent="space-between"
                  >
                    <Typography>{title}</Typography>
                    <Typography>{value}</Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Paper>
          <Paper variant="outlined">
            <Typography
              sx={{ my: 1 }}
              align="center"
            >{`${coin.name} other Stats`}</Typography>
            <Divider />
            <List>
              {generalStats.map(({ title, value, icon }) => (
                <ListItem key={title}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <Stack
                    sx={{ flexGrow: 1 }}
                    direction="row"
                    gap={3}
                    justifyContent="space-between"
                  >
                    <Typography>{title}</Typography>
                    <Typography>{value}</Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Stack>
        <Divider sx={{ mt: 4 }} />
        <Grid sx={{ my: 1 }} container spacing={4}>
          <Grid item xs={12} sm={7} md={8}>
            <Typography variant="h6" component="h2">
              What is {coin.name}?
            </Typography>
            <Typography>{HTMLReactParser(coin.description)}</Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={4} component="section">
            <Typography variant="h6" component="h2">
              {coin.name} Links
            </Typography>
            <List>
              {coin?.links?.map(
                ({
                  name,
                  type,
                  url,
                }: {
                  name: string;
                  type: string;
                  url: string;
                }) => (
                  <li key={name}>
                    <ListItem
                      disablePadding
                      component="a"
                      href={url}
                      target="_blank"
                      rel="noreffer"
                    >
                      <ListItemText primary={name} secondary={type} />
                    </ListItem>
                  </li>
                )
              )}
            </List>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default CriptoDetails;
