import dynamic from "next/dynamic";

import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import tradeshareTheme from "../lib/tradeshareTheme";
import Divider from "@mui/material/Divider";

const DataGrid = dynamic(() =>
  import("@mui/x-data-grid").then((mod) => mod.DataGrid)
);

const GridToolbarFilterButton = dynamic(() =>
  import("@mui/x-data-grid").then((mod) => mod.GridToolbarFilterButton)
);

const GridToolbarContainer = dynamic(() =>
  import("@mui/x-data-grid").then((mod) => mod.GridToolbarContainer)
);


export function TSCustomToolbarFilterOnly() {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

export const TSGridNoRowsOverlay = () => (
  <Divider />
  // <Typography
  //   variant="h6"
  //   sx={{
  //     mt: 3,
  //     textAlign: "center",
  //   }}
  // >
  //   No Data
  // </Typography>
);

export const GridBox = styled(Box)<BoxProps>(({ theme }) => ({
  sx: { mt: 2 },
}));

export const GridIcon = styled(Image)(({ theme }) => ({
  border: "none",
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnSeparator": {
    visibility: "hidden",
  },
  "& .MuiDataGrid-sortIcon": {
    color: tradeshareTheme.palette.primary.main,
  },
  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
  "& .MuiDataGrid-columnHeader:focus-within": {
    outline: "none",
  },
}));

export default StyledDataGrid;
