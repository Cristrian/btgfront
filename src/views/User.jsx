import { Box, Button, Divider, Stack, Typography } from "@mui/material";

import React from "react";

const User = function ({userData, setTabValue, balance, setBalance}) {
  const userName = userData.name;
  const userSubs = userData.subscriptions;
  

  return (
  <Stack divider={<Divider variant="fullWidth" />} spacing={2} >
    <Typography variant="h4"> ¡Bienvenido {userName}! </Typography>
    <Stack direction={"row"} alignItems="center" spacing={2}>
      <Typography variant="h5"> <strong>Balance: </strong> </Typography>
      <Typography variant="h6">COP ${balance}</Typography>
    </Stack>
    <Stack direction={"row"} alignItems="flex-start" spacing={2}>
      <Box>
        <Typography variant="h5"><strong>Nro. Fondos Suscrito: </strong></Typography>
        <Button variant="text" onClick={() => setTabValue(1)}><u>Ver detalles...</u></Button>
      </Box>
      <Typography variant="h6">{userSubs.length}</Typography>
    </Stack>
  </Stack>)
}

export default User