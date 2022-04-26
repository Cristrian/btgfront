import React, { useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Subscribe from "./Subscribe";

function createData(id, name, minimun, category) {
    return { id, name,  minimun, category };
  }

function FundTable({rows, userId}) {
  const handleSubscribe = function (event, rowPosition, useId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    
    fetch("api/v1/users/subscriptions?" 
      + new URLSearchParams({user_id: useId, position: rowPosition}),
       requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload(false)
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 850 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Fondo</TableCell>
            <TableCell align="right">Inversión Mínima&nbsp;(COP)</TableCell>
            <TableCell align="right">Categoría&nbsp;</TableCell>
            <TableCell>Suscribir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.minimun}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="center">
                <Subscribe />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const SubsFund = function ({userData, balance, setBalance}) {
  const userSubs = userData.subscriptions;
  const userId = userData.id
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  // Here we search each fund by its id

  useEffect(function() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("api/v1/funds/all", requestOptions)
      .then(response => response.json())
      .then(data => setRows(data))
      .catch(error => console.log('error', error));
  }, [])
  return (
  <Stack divider={<Divider variant="fullWidth" />} spacing={2} >
    <Typography variant="h4"> Oferta De Fondos </Typography>
    <Typography variant="subtitle1">
        A continuación encontrará los fondos a los que se puede suscribir.
    </Typography>
    <Stack direction={"row"} alignItems="center" spacing={2}>
      <Typography variant="h5"> <strong>Balance: </strong> </Typography>
      <Typography variant="h6">COP ${balance}</Typography>
    </Stack>
    <Stack direction={"row"} alignItems="flex-start" spacing={2}>
      <Box>
        <Typography variant="h5"><strong>Lista de fondos: </strong></Typography>
        <FundTable rows={rows} userId={userId}/>
      </Box>
    </Stack>
    
  </Stack>)
}

export default SubsFund