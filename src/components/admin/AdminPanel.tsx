import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PricesPage from "./price/PricesPage";
import { Link } from "react-router-dom";
import MaterialManagement from "./material/MaterialManagement ";
import UserManagement from "./user/UserManagement";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function AdminPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Link to="/">STELLA</Link>
      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Прайси" {...a11yProps(0)} />
              <Tab label="Матеріали" {...a11yProps(1)} />
              <Tab label="Менеджери" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <AdminPanel value={value} index={0}>
            <PricesPage />
          </AdminPanel>
          <AdminPanel value={value} index={1}>
            <MaterialManagement />
          </AdminPanel>
          <AdminPanel value={value} index={2}>
            <UserManagement />
          </AdminPanel>
        </Box>
      </div>
    </>
  );
}
