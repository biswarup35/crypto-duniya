import * as React from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { useGetCryptosQuery } from "../services/criptoApi";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
interface CryptocurrenciesProps {
  minimal?: boolean;
  fullWidth?: boolean;
}

const Cryptocurrencies: React.FunctionComponent<CryptocurrenciesProps> = ({
  minimal,
  fullWidth,
}) => {
  const count = minimal ? 10 : 100;
  const { data: { data: { coins = [] } = {} } = {}, isFetching } =
    useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState<[]>(coins);
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    const filtered = coins.filter((coin: { name: string }) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filtered);
  }, [coins, searchTerm]);
  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <Container sx={{ my: 2 }} maxWidth={!fullWidth ? "lg" : false}>
      {!minimal && (
        <Stack sx={{ my: 4 }}>
          <TextField
            size="small"
            placeholder="Search coin..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Stack>
      )}
      <Grid container spacing={2}>
        {cryptos?.map((crypto: any) => (
          <Grid key={crypto.uuid} item xs={12} sm={6} md={4} lg={3}>
            <Card variant="outlined">
              <CardActionArea
                component={Link}
                to={`/cryptocurrencies/${crypto.uuid}`}
              >
                <CardHeader
                  title={crypto.name}
                  subheader={`Rank #${crypto.rank}`}
                  avatar={
                    <Avatar
                      sx={{ height: 28, width: 28 }}
                      src={crypto.iconUrl}
                      alt={crypto.name}
                    />
                  }
                />
                <Divider />
                <CardContent>
                  <List>
                    <Stack sx={{ mx: 2 }} direction="row" component="li">
                      <Typography sx={{ flexGrow: 1 }}>Price</Typography>
                      <Typography>{`${millify(crypto.price ?? 0, {
                        precision: 3,
                      })}`}</Typography>
                    </Stack>
                    <Stack sx={{ mx: 2, my: 1 }} direction="row" component="li">
                      <Typography sx={{ flexGrow: 1 }}>Market Cap</Typography>
                      <Typography>{millify(crypto.marketCap ?? 0)}</Typography>
                    </Stack>
                    <Stack sx={{ mx: 2 }} direction="row" component="li">
                      <Typography sx={{ flexGrow: 1 }}>Daily change</Typography>
                      <Typography>{`${millify(
                        crypto.change ?? 0
                      )}%`}</Typography>
                    </Stack>
                  </List>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cryptocurrencies;
