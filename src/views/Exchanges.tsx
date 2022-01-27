import * as React from "react";
import {
  Autocomplete,
  Box,
  Container,
  Stack,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Button,
  Avatar,
  Typography,
  useMediaQuery,
  Theme,
  Tooltip,
} from "@mui/material";
import millify from "millify";
import {
  useGetCryptosQuery,
  useGetCryptoExchangesQuery,
} from "../services/criptoApi";

import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import ShopOutlinedIcon from "@mui/icons-material/ShopOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import OfflineBoltOutlinedIcon from "@mui/icons-material/OfflineBoltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";

interface ExchangePageProps {}

const ExchangePage: React.FunctionComponent<ExchangePageProps> = () => {
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { data: { data: { coins = [] } = {} } = {} } = useGetCryptosQuery(100);
  const defaultCoin = "Qwsogvtv82FCd";
  const [coinId, setCoinId] = React.useState(defaultCoin);
  const [coinName, setCoinName] = React.useState("Bitcoin");
  const { data: { data: { exchanges = [] } = {} } = {} } =
    useGetCryptoExchangesQuery(coinId);

  const options = coins?.map((coin: { name: string; uuid: string }) => ({
    label: coin.name,
    uuid: coin.uuid,
  }));

  return (
    <Box>
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Stack>
          <Autocomplete
            disablePortal
            id="exchange-coin-select"
            options={options}
            onChange={(_, value: any) => {
              setCoinId(value.uuid);
              setCoinName(value.label);
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Search Coin..." />
            )}
          />
        </Stack>
      </Container>
      <Container maxWidth="lg">
        <Typography align="center" sx={{ my: 2 }} variant="h6" component="h2">
          Top 20 Exchanges for {coinName}
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Stack direction="row" justifyContent="center">
                    {sm && (
                      <Tooltip title="Market">
                        <ShopOutlinedIcon />
                      </Tooltip>
                    )}
                    {!sm && (
                      <Typography variant="h6" component="h2">
                        Market
                      </Typography>
                    )}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  {!sm && (
                    <Typography variant={sm ? "body2" : "h6"} component="h2">
                      Recomended?
                    </Typography>
                  )}
                  {sm && (
                    <Tooltip title="Recommended">
                      <ThumbUpAltOutlinedIcon />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="center">
                  {sm && (
                    <Tooltip title="Price">
                      <MonetizationOnOutlinedIcon />
                    </Tooltip>
                  )}
                  {!sm && (
                    <Typography variant={sm ? "body2" : "h6"} component="h2">
                      Price ($)
                    </Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  {!sm && (
                    <Typography variant={sm ? "body2" : "h6"} component="h2">
                      24h Volume
                    </Typography>
                  )}
                  {sm && (
                    <Tooltip title="24h Volume">
                      <OfflineBoltOutlinedIcon />
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="center">
                  {!sm && (
                    <Typography variant={sm ? "body2" : "h6"} component="h2">
                      Exchange
                    </Typography>
                  )}
                  {sm && (
                    <Tooltip title="Exchange">
                      <ShopOutlinedIcon />
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exchanges &&
                exchanges.map((market: any) => (
                  <TableRow key={market.uuid}>
                    <TableCell>
                      <Stack direction="row" gap={2} alignItems="center">
                        <Avatar
                          sx={{ width: sm ? 20 : 24, height: sm ? 20 : 24 }}
                          src={market.iconUrl}
                        />
                        <Typography>{market.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      {market.recommended ? (
                        <DoneOutlinedIcon />
                      ) : (
                        <ClearOutlinedIcon />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {millify(market.price, { precision: 3 })}
                    </TableCell>
                    <TableCell align="center">
                      {millify(market[`24hVolume`])}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        href={market.coinrankingUrl}
                        target="_blank"
                        rel="noreffer"
                        disableTouchRipple
                        disableFocusRipple
                        disableElevation
                        endIcon={<ShoppingBagOutlinedIcon />}
                        size="small"
                      >
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default ExchangePage;
