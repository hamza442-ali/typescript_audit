import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const TSDashboardGridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
  borderRadius: 25,
}));

const TSTransparentDashboardGridItem = styled(TSDashboardGridItem)(
  ({ theme }) => ({
    backgroundColor: "transparent",
    backgroundImage: "none",
    boxShadow: "none",
  })
);

export { TSDashboardGridItem as default, TSTransparentDashboardGridItem };
