import LinearProgress from "@mui/material/LinearProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import useTSLatestNews from "../hooks/useTSLatestNews";
import TSAlertLoadingError from "./TSAlertLoadingError";

const SHOW_MAX_TITLES = 6;

function TSWidgetsNews() {
  const { data, isLoading, error } = useTSLatestNews();

  if (error) return <TSAlertLoadingError message={error.message} />;
  if (isLoading) return <LinearProgress color="primary" />;

  return (
    <>
      <Typography variant={"h6"}>Industry Latest</Typography>
      <List>
        {data &&
          Array.isArray(data.results) &&
          data.results.map(
            ({ title, url }: { title: string; url: string }, idx: number) => {
              if (idx >= SHOW_MAX_TITLES) return;
              return (
                <ListItem key={idx} disablePadding disableGutters>
                  <ListItemButton component={NextLink} href={url}>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </ListItem>
              );
            }
          )}
      </List>
    </>
  );
}

export default TSWidgetsNews;
