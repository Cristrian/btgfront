import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import User from "./User";
import Funds from "./Funds";
import MyFunds from "./Funds";
import Transaction from "./Transactions";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Main({userData, balance, setBalance}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  useEffect(function () {
    console.log(userData);
  }, [userData]);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Usuario" {...a11yProps(0)} />
        <Tab label="Fondos" {...a11yProps(1)} />
        <Tab label="Transacciones" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <User userData={userData} balance={balance} setBalance={setBalance} setTabValue={setValue} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Funds userData={userData} balance={balance} setBalance={setBalance}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Transaction userId={userData.id} />
      </TabPanel>
    </Box>
  );
}
