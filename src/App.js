import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import './App.css';
import Main from './views/Main';

function App() {
  const [userData, setUserData] = React.useState({
    name: "",
    balance: 0,
    id: "",
    subscriptions: []
  });
  const [balance, setBalance] = React.useState(0)
  // By default we're going to use an User with id 101, a unique client
  // Since we don't have a login system yet.
  useEffect(function () {
    fetch("api/v1/users?user_id=101",
    {method: "GET"})
    .then(resp => resp.json())
    .then(data => setUserData(data[0]))
  }, []);

  useEffect(function () {
    setBalance(userData.balance)
  }, [userData]);


  return (
    <Box>
      <AppBar position='static' color="primary">
        <Toolbar >
          <Typography variant='h4'>BTGPACTUAL --- Fondo Voluntario de Pensiones</Typography>
        </Toolbar>
      </AppBar>
      <Main userData={userData} balance={balance} setBalance={setBalance}/>
    </Box>
    );
}

export default App;
