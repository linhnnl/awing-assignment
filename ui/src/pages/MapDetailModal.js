import React, { useState, useEffect } from 'react';
import { updateMinFuel } from '../services/mapApi';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


const MapDetailModal = ({ open, onClose, map }) => {
  const [matrix, setMatrix] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [severity, setSeverity] = useState('');
  
  useEffect(() => {
    if (map) {
      setMatrix(JSON.parse(map.mapData));
    }
  }, [map]);

  const Recalculate = async (id) =>{
    try {
        const result = await updateMinFuel(id);
        map.minFuel = result;
        setSeverity('success')
        setErrorMessage('Success! Min Fuel now stands at ' + result);
      } catch (error) {
        setSeverity('error')
        setErrorMessage(error.message);
      }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        Chi tiết bản đồ
      </DialogTitle>
      <DialogContent>
        <Stack 
          spacing={2} 
          direction="row"
          sx={{margin: 3}}>
          <TextField
            disabled
            label="Total Rows"
            type="number"
            size="small"
            value={map.rowCount}
          />
          <TextField
            disabled
            label="Total Columns"
            type="number"
            size="small"
            value={map.columnCount}
          />
          <TextField
            disabled
            label="Chest Type Count"
            type="number"
            size="small"
            value={map.chestTypeCount}
          />
        </Stack>
        {/* Matrix */}
        <Container className='scrollable-matrix-box'>
          {matrix.map((row, rowIndex) => (
            <Grid className='scrollable-x-matrix' spacing={1} key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Grid item key={colIndex}>
                  <TextField disabled className = 'input-matrix' type="number" value={cell} size="small"
                  />
                </Grid>
              ))}
            </Grid>
          ))}
        </Container>
        <Stack 
          spacing={2} 
          direction="row"
          sx={{margin: 3}}>
          <Typography sx={{ fontWeight: 'bold', width: 'fit-content'}}>Min Fuel:</Typography >
          <Typography>{map && map.minFuel}</Typography >
        </Stack>
        <Box>
          {errorMessage && (
            <Alert
              severity={severity} 
              onClose={() => {setErrorMessage('')}}
              >
                {errorMessage}
            </Alert>
          )}
        </Box>  
      </DialogContent>
      <DialogActions sx={{ marginBottom: 1.5 }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => Recalculate (map.mapId)}
        >
          Recalculate
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
export default MapDetailModal;
