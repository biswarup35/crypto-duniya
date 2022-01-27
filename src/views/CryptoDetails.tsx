import * as React from "react";
import {
  Avatar,
  Box,
  Container,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Sparklines, SparklinesCurve, SparklinesSpots } from "react-sparklines";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/criptoApi";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import ShopTwoOutlinedIcon from "@mui/icons-material/ShopTwoOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import ThumbsUpDownOutlinedIcon from "@mui/icons-material/ThumbsUpDownOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";

const getSign = (number: number) =>
  number > 0 ? (
    <ArrowDropUpOutlinedIcon fontSize="small" htmlColor="green" />
  ) : (
    <ArrowDropDownOutlinedIcon fontSize="small" htmlColor="red" />
  );

const time = [
  { value: "3h", title: "3 Hours" },
  { value: "24h", title: "24 Hours" },
  { value: "7d", title: "7 Days" },
  { value: "30d", title: "30 Days" },
  { value: "3m", title: "3 Months" },
  { value: "1y", title: "1 Year" },
  { value: "3y", title: "3 Years" },
  { value: "5y", title: "5 Years" },
];

interface CriptoDetailsProps {}

const CriptoDetails: React.FunctionComponent<CriptoDetailsProps> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();

  const [timeperiod, setTimeperiod] = React.useState("24h");

  const { id } = useParams();
  const { isFetching, data: { data: { coin = {} } = {} } = {} } =
    useGetCryptoDetailsQuery(id);

  const { data: { data: { history = [] } = {} } = {} } =
    useGetCryptoHistoryQuery({
      timeperiod,
      id,
    });

  const sparklineData = history
    ?.map((data: { price: string }) => data.price)
    .reverse();

  const iconColor = coin?.color ?? theme.palette.primary.main;

  const stats = [
    {
      title: "Price to USD",
      value: `${millify(coin?.price ?? 0, { precision: 3 })}`,
      icon: <MonetizationOnOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Rank",
      value: `${coin?.rank}`,
      icon: <BarChartOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "24h Volume",
      value: `${millify(coin?.[`24hVolume`] ?? 0)}`,
      icon: <OfflineBoltOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Market Cap",
      value: `${millify(coin?.marketCap ?? 0)}`,
      icon: <SecurityOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "All-time high",
      value: `${millify(coin?.allTimeHigh?.price ?? 0)}`,
      icon: <InsightsOutlinedIcon htmlColor={iconColor} />,
    },
  ];

  const generalStats = [
    {
      title: "Number of Markets",
      value: coin?.numberOfMarkets ?? 0,
      icon: <ShopTwoOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Number of Exchanges",
      value: coin?.numberOfExchanges ?? 0,
      icon: <ShopOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Approved Supply",
      value: coin?.supply?.confirmed ? (
        <ThumbUpAltOutlinedIcon htmlColor="green" fontSize="small" />
      ) : (
        <ThumbDownAltOutlinedIcon htmlColor="red" fontSize="small" />
      ),
      icon: <ThumbsUpDownOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Total Supply",
      value: millify(coin?.supply?.total ?? 0),
      icon: <InventoryOutlinedIcon htmlColor={iconColor} />,
    },
    {
      title: "Circulating Supply",
      value: millify(coin?.supply?.circulating ?? 0),
      icon: <InventoryOutlinedIcon htmlColor={iconColor} />,
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
            <Typography variant={sm ? "h6" : "h5"} component="h2">
              {`${coin.name} (${coin.symbol}) ${coin?.change}%`}
              {getSign(coin?.change)}
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
          <Paper sx={{ flexGrow: 1 }} variant="outlined">
            <Typography
              sx={{ py: 1 }}
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
          <Paper sx={{ flexGrow: 1 }} variant="outlined">
            <Typography
              sx={{ py: 1 }}
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
        <Paper sx={{ mt: 3 }} variant="outlined">
          <Stack sx={{ py: 1 }} direction="row" alignItems="center">
            <Typography sx={{ flexGrow: 1, pl: 1 }}>
              {`$${millify(coin.price, {
                precision: 5,
              })}`}
              <sup
                style={{ color: coin.change > 0 ? "green" : "red" }}
              >{`(${coin.change}%)`}</sup>
            </Typography>
            <FormControl sx={{ minWidth: 100, pr: 1 }}>
              <Select
                size="small"
                value={timeperiod}
                id="time-select"
                onChange={(event) => setTimeperiod(event.target.value)}
              >
                {time.map(({ value, title }) => (
                  <MenuItem key={value} value={value}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Sparklines data={sparklineData ?? coin?.sparkline}>
            <SparklinesCurve
              color={coin?.color ?? theme.palette.primary.main}
              style={{ strokeWidth: 0.5 }}
            />
            <SparklinesSpots size={1} />
          </Sparklines>
        </Paper>
        <Divider sx={{ mt: 4 }} />
        <Grid sx={{ my: 1 }} container spacing={4}>
          <Grid item xs={12} sm={7} md={8}>
            <Typography sx={{ fontWeight: 600 }} variant="h6" component="h2">
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
