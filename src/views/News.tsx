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
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useGetCryptoNewsQuery } from "../services/newsApi";
interface NewsProps {
  minimal?: boolean;
  fullWidth?: boolean;
}

const News: React.FunctionComponent<NewsProps> = ({ minimal, fullWidth }) => {
  const { isFetching, data: { value = [] } = {} } = useGetCryptoNewsQuery({
    newsCategory: "cryptocurrency",
    count: 10,
  });
  const [newsList, setNewsList] = React.useState<[]>(value);

  React.useEffect(() => {
    setNewsList(value);
  }, [value]);

  if (isFetching) {
    return <p>Loading...</p>;
  }
  return (
    <Container sx={{ my: 2 }} maxWidth="xl">
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
                  {news?.description.length > 100
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
