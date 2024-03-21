import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabProps {
  label: string;
  tabIndex: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

// TODO: Needs forwardRef to work with CustomTabPanel -- DO NOT USE
function CustomTab(props: TabProps) {
  const { label, tabIndex } = props;
  return (
    <Tab label={label} {...a11yProps(tabIndex)} />
  )
}

export { CustomTabPanel, CustomTab };