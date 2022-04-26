import React, { useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function createData(name, amount, category, fundId) {
    return { name, amount, category, fundId };
  }

function FundTable({rows, userId}) {
  const handleDelete = function (event, rowPosition, useId, amount, fundId) {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    
    fetch("api/v1/users/unsubscribe?" 
      + new URLSearchParams({
        user_id: useId, 
        position: rowPosition,
        amount: amount,
        transaction_type: "unsubscribe",
        fund_id: fundId
      }),
       requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    window.location.reload(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell>Fondo</TableCell>
            <TableCell align="right">Inversión&nbsp;(COP)</TableCell>
            <TableCell align="right">Categoría&nbsp;</TableCell>
            <TableCell>Cancelar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleDelete(event, index, userId, row.amount, row.fundId)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const MyFunds = function ({userData, balance, setBalance}) {
  const userSubs = userData.subscriptions;
  const userId = userData.id
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  // Here we search each fund by its id

  useEffect(function() {
    userSubs.forEach((subs) => {
      
      let fundId = subs.M.fund_id.N;
      let fundAmount = subs.M.amount.N;
      setTotal((prev)=> prev + parseInt(fundAmount))
      fetch(
        "api/v1/funds?" + 
        new URLSearchParams({fund_id: fundId})
      ).then((resp) => resp.json())
      .then((data) => {
        const fundName = data[0].name;
        const fundCategory = data[0].category;
        const row = createData(fundName, fundAmount, fundCategory, fundId);
        setRows((prevRows)=>[...prevRows, row])
        
      });
      
    });
  }, [])
  return (
  <Stack divider={<Divider variant="fullWidth" />} spacing={2} >
    <Typography variant="h4"> Mis Fondos </Typography>
    <Typography variant="subtitle1">
        A continuación encontrará los fondos a los que está suscrito, 
        también puede cancelar su suscripcion a cualquiera de ellos.
    </Typography>
    <Stack direction={"row"} alignItems="center" spacing={2}>
      <Typography variant="h5"> <strong>Total Invertido: </strong> </Typography>
      <Typography variant="h6">COP <b>${total}</b> en <b>{rows.length}</b>  fondos</Typography>
    </Stack>
    <Stack direction={"row"} alignItems="flex-start" spacing={2}>
      <Box>
        <Typography variant="h5"><strong>Lista de fondos: </strong></Typography>
        <FundTable rows={rows} userId={userId}/>
      </Box>
    </Stack>

  </Stack>)
}

export default MyFunds