import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CalcStella from "../calcStella/CalcStella";
import CalcBox from "../calcBox/CalcBox";
import CalcShelf from "../calcShelf/CalcShelf";
import CalcFlower from "../calcFlower/CalcFlower";
import CalcCrossSolid from "../calcCrossSolid/CalcCrossSolid";
import CalcCrossGlued from "../calcCrossGlued/CalcCrossGlued";
import CalcVaseTurned from "../calcVaseTurned/CalcVaseTurned";
import CalcVaseSquare from "../calcVaseSquare/CalcVaseSquare";
import CalcTombstone from "../calcTombstone/CalcTombstone";
import CalcTileGor1 from "../calcTileGor1/CalcTileGor1";
import CalcTileGor2 from "../calcTileGor2/CalcTileGor2";
import CalcTileVert1 from "../calcTileVert1/CalcTileVert1";
import CalcTileVert2 from "../calcTileVert2/CalcTileVert2";
import CalcAngleSquare from "../calcAngleSquare/CalcAngleSquare";
import CalcAngleTurned from "../calcAngleTurned/CalcAngleTurned";
import CalcColumn from "../calcColumn/CalcColumn";
import CalcSphere from "../calcSphere/CalcSphere";
import CalcLampTurned from "../calcLampTurned/CalcLampTurned";
import CalcLampSquare from "../calcLampSquare/CalcLampSquare";

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
              <Tab label="Квітник" {...a11yProps(2)} />
              <Tab label="Хрест суцільний" {...a11yProps(3)} />
              <Tab label="Хрест клеєний" {...a11yProps(4)} />
              <Tab label="Ваза точена" {...a11yProps(5)} />
              <Tab label="Ваза квадратна" {...a11yProps(6)} />
              <Tab label="Лампадка точена" {...a11yProps(7)} />
              <Tab label="Лампадка квадратна" {...a11yProps(8)} />
              <Tab label="Надгробна плита" {...a11yProps(9)} />
              <Tab label="Плитка горизонтальна 1" {...a11yProps(10)} />
              <Tab label="Плитка вертикальна 1" {...a11yProps(11)} />
              <Tab label="Плитка горизонтальна 2" {...a11yProps(12)} />
              <Tab label="Плитка вертикальна 2" {...a11yProps(13)} />

              <Tab label="Полка" {...a11yProps(14)} />

              <Tab label="Вугли квадратні" {...a11yProps(15)} />
              <Tab label="Вугли точені" {...a11yProps(16)} />
              <Tab label="Колони" {...a11yProps(17)} />
              <Tab label="Шар" {...a11yProps(18)} />

              {/* <Tab label="Площадка" {...a11yProps(19)} />
              <Tab label="Стіл" {...a11yProps(20)} />
              <Tab label="Лавка" {...a11yProps(21)} />
              <Tab label="Заборчик" {...a11yProps(22)} /> */}
            </Tabs>
          </Box>
          <AdminPanel value={value} index={0}>
            <CalcStella />
          </AdminPanel>
          <AdminPanel value={value} index={1}>
            <CalcBox />
          </AdminPanel>
          <AdminPanel value={value} index={2}>
            <CalcFlower />
          </AdminPanel>
          <AdminPanel value={value} index={3}>
            <CalcCrossSolid />
          </AdminPanel>
          <AdminPanel value={value} index={4}>
            <CalcCrossGlued />
          </AdminPanel>
          <AdminPanel value={value} index={5}>
            <CalcVaseTurned />
          </AdminPanel>
          <AdminPanel value={value} index={6}>
            <CalcVaseSquare />
          </AdminPanel>
          <AdminPanel value={value} index={7}>
            <CalcLampTurned />
          </AdminPanel>
          <AdminPanel value={value} index={8}>
            <CalcLampSquare />
          </AdminPanel>
          <AdminPanel value={value} index={9}>
            <CalcTombstone />
          </AdminPanel>
          <AdminPanel value={value} index={10}>
            <CalcTileGor1 />
          </AdminPanel>
          <AdminPanel value={value} index={11}>
            <CalcTileVert1 />
          </AdminPanel>
          <AdminPanel value={value} index={12}>
          <CalcTileGor2 />
          </AdminPanel>
          <AdminPanel value={value} index={13}>
          <CalcTileVert2 />
          </AdminPanel>
          <AdminPanel value={value} index={14}>
            <CalcShelf />
          </AdminPanel>
          <AdminPanel value={value} index={15}>
            <CalcAngleSquare />
          </AdminPanel>
          <AdminPanel value={value} index={16}>
            <CalcAngleTurned />
          </AdminPanel>
          <AdminPanel value={value} index={17}>
            <CalcColumn />
          </AdminPanel>
          <AdminPanel value={value} index={18}>
            <CalcSphere />
          </AdminPanel>
        </Box>
      </div>
    </>
  );
}
