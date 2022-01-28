import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  useMediaQuery,
  Theme,
  Stack,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useGetCryptoNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/criptoApi";
import { Loading } from "../components";
interface NewsProps {
  minimal?: boolean;
  fullWidth?: boolean;
}

const News: React.FunctionComponent<NewsProps> = ({ minimal, fullWidth }) => {
  const [newsCategory, setNewsCategory] = React.useState("cryptocurrency");
  const { isFetching, data: { value: newsList = [] } = {} } =
    useGetCryptoNewsQuery({
      newsCategory,
      count: 12,
    });
  const { data: { data: { coins = [] } = {} } = {} } = useGetCryptosQuery(100);

  const title = newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1);
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  if (isFetching) {
    return <Loading />;
  }
  return (
    <Container sx={{ my: 2 }} maxWidth="lg">
      {!minimal && (
        <Box
          sx={{ my: 2 }}
          display="flex"
          flexDirection={sm ? "column" : "row"}
          gap={2}
        >
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h6"
            component="h2"
            align={sm ? "center" : "left"}
          >
            News about {title}
          </Typography>
          <FormControl sx={{ minWidth: 240 }}>
            <Select
              size="small"
              id="coin-select"
              value={newsCategory}
              onChange={(event) => setNewsCategory(event.target.value)}
            >
              <MenuItem value="cryptocurrency">Cryptocurrency</MenuItem>
              {coins?.map((coin: { uuid: string; name: string }) => (
                <MenuItem key={coin.uuid} value={coin.name}>
                  {coin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Grid container spacing={2}>
        {newsList?.map((news: any) => (
          <Grid
            key={news?.datePublished}
            item
            xs={12}
            sm={6}
            md={4}
            lg={!minimal ? 3 : false}
          >
            <Card sx={{ height: `100%` }} variant="outlined">
              <CardActionArea
                component="a"
                href={news?.url}
                target="_blank"
                rel="noreferrer"
              >
                <CardMedia
                  sx={{ objectFit: "cover" }}
                  component="img"
                  src={news?.image?.thumbnail?.contentUrl}
                  height={240}
                  width={479}
                />
              </CardActionArea>
              <Stack sx={{ mt: 1, mx: 1 }} direction="row" gap={2}>
                <Avatar
                  sx={{ height: 24, width: 24 }}
                  src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                />
                <Box>
                  <Typography variant="body1">
                    {news?.provider[0]?.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {moment(news?.datePublished).startOf("seconds").fromNow()}
                  </Typography>
                </Box>
              </Stack>
              <CardContent>
                <Typography variant="body1" component="h2" gutterBottom>
                  {news?.name}
                </Typography>
                {news?.name.length <= 80 ? (
                  <Typography variant="body2" color="text.secondary">
                    {`${news?.description.substring(0, 80)}...`}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {`${news?.description.substring(0, 40)}...`}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
