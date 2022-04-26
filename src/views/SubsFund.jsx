import React, { useEffect, useState } from "react";
import { Box, Button, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,
  DialogTitle,DialogContentText, DialogContent, DialogActions, Dialog, TextField } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BalanceRounded } from "@mui/icons-material";

function createData(id, name, minimun, category) {
    return { id, name,  minimun, category };
  }

function FundTable({rows, userId, balance}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [amount, setAmount] = useState(0);
  const handleSubscribe = function (event, rowPosition, useId, fundId) {
    event.preventDefault();
    console.log(balance)
    console.log(amount)
    if (amount > parseInt(balance)) {
      alert("Su balance es insuficiente para suscribirse con esta cantidad");
    } else if (amount == 0) {
      console.log(0);
    } else if (amount < 0) {
      alert("No puede ingresar números negativos");
    } else {
          var requestOptions = {
          method: 'PUT',
          redirect: 'follow'
        };
        fetch("api/v1/users/subscribe?" 
          + new URLSearchParams({
          user_id: useId, 
          amount: amount,
          transaction_type: "subscribe",
          fund_id: fundId
        }), requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        window.location.reload(false);
    
    }
    setOpen(false);
    setAmount(0)
  };

  const handleTextChange = function (event) {
    
  }
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
              <div>
                  <IconButton variant="outlined" onClick={handleClickOpen}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirmación de Suscripción</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Por favor ingrese el monto con el cuál desea suscribirse al fondo {row.name}
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="COP $"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(event)=>setAmount(event.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancelar</Button>
                      <Button onClick={(event) => handleSubscribe(event, index, userId, row.id)}>
                        Suscribirme
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const SubsFund = function ({userData, balance, setBalance}) {
  const userId = userData.id
  const [rows, setRows] = useState([]);
  

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
        <FundTable rows={rows} userId={userId} balance={balance}/>
      </Box>
    </Stack>
    
  </Stack>)
}

export default SubsFund