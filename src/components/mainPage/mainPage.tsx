import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CalcStella from "../calcStella/CalcStella";
import CalcBox from "../calcBox/CalcBox";
import CalcShelf from "../calcShelf/CalcShelf";

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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Link to="/prices">ADMIN</Link>

      <div className="container">
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs"
              variant="scrollable"
            >
              <Tab label="Стела" {...a11yProps(0)} />
              <Tab label="Тумбочка" {...a11yProps(1)} />
              <Tab label="Полка" {...a11yProps(2)} />
              <Tab label="Надгробна плита" {...a11yProps(3)} />
              <Tab label="Квітник" {...a11yProps(4)} />
              <Tab label="Плитка горизонтальна" {...a11yProps(5)} />
              <Tab label="Плитка вертикальна" {...a11yProps(6)} />
              <Tab label="Вугли" {...a11yProps(7)} />
              <Tab label="Хрест" {...a11yProps(8)} />
              <Tab label="Точені вироби" {...a11yProps(9)} />
              <Tab label="Площадка" {...a11yProps(10)} />
              <Tab label="Стіл та лавки" {...a11yProps(11)} />
              <Tab label="Заборчик" {...a11yProps(12)} />
            </Tabs>
          </Box>
          <AdminPanel value={value} index={0}>
            <CalcStella/>
          </AdminPanel>
          <AdminPanel value={value} index={1}>
            <CalcBox />
          </AdminPanel>
          <AdminPanel value={value} index={2}>
            <CalcShelf />
          </AdminPanel>
          <AdminPanel value={value} index={3}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={4}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={5}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={6}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={7}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={8}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={9}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={10}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={11}>
            In progress...
          </AdminPanel>
          <AdminPanel value={value} index={12}>
            In progress...
          </AdminPanel>
        </Box>
      </div>
    </>
  );
}
