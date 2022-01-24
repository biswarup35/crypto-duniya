import { Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import millify from "millify";
import { Statistic } from "../components";
import { useGetCryptosQuery } from "../services/criptoApi";
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
  const { isFetching, data } = useGetCryptosQuery(null);
  const [stats, setStats] = React.useState(data?.data?.stats);

  React.useEffect(() => {
    setStats(data?.data?.stats);
  }, [data, stats]);

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <React.Fragment>
      <Container sx={{ my: 2 }} maxWidth="lg">
        <Typography variant="h4" component="h2">
          Global Crypto Stats
        </Typography>
        <Grid sx={{ my: 2 }} container spacing={4}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Statistic
              title="Total Cryptocurrencies"
              value={stats?.totalCoins ?? 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Statistic
              title="Total Exchanges"
              value={stats?.totalExchanges ?? 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Statistic
              title="Total Market Cap"
              value={millify(stats?.totalMarketCap ?? 0)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Statistic
              title="Total 24h Volume"
              value={millify(stats?.total24hVolume ?? 0)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Statistic
              title="Total Markets"
              value={millify(stats?.totalMarkets ?? 0)}
            />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Typography variant="h4" component="h2">
          Top 10 Cryptocurrencies
        </Typography>
      </Container>
      <Container sx={{ my: 4 }} maxWidth="lg">
        <Typography variant="h4" component="h2">
          Top News
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default Home;