import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
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
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useGetCryptoNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/criptoApi";
interface NewsProps {
  minimal?: boolean;
  fullWidth?: boolean;
}

const News: React.FunctionComponent<NewsProps> = ({ minimal, fullWidth }) => {
  const [newsCategory, setNewsCategory] = React.useState("cryptocurrency");
  const { isFetching, data: { value = [] } = {} } = useGetCryptoNewsQuery({
    newsCategory,
    count: 12,
  });
  const { data: { data: { coins = [] } = {} } = {} } = useGetCryptosQuery(100);
  const [newsList, setNewsList] = React.useState<[]>(value);

  const title = newsCategory.charAt(0).toUpperCase() + newsCategory.slice(1);
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  React.useEffect(() => {
    setNewsList(value);
  }, [value]);

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <Container sx={{ my: 2 }} maxWidth="xl">
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
            <Card variant="outlined">
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
              <CardHeader
                avatar={
                  <Avatar
                    src={news?.provider[0]?.image?.thumbnail?.contentUrl}
                  />
                }
                title={news?.provider[0]?.name}
                subheader={moment(news?.datePublished)
                  .startOf("seconds")
                  .fromNow()}
              />
              <CardContent>
                <Typography variant="body1" component="h2" gutterBottom>
                  {news?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {news?.description.length > 80
                    ? `${news?.description.substring(0, 80)}...`
                    : news?.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default News;
