import React, { useState } from 'react';
import { createMap } from '../services/mapApi'

import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ForwardIcon from '@mui/icons-material/Forward';

const CreateMap = () => {
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');
  const [types, setTypes] = useState('');
  const [matrix, setMatrix] = useState(Array(0).fill().map(() => Array(0).fill('')));
  
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [severity, setSeverity] = useState('');
  
  const [errorRows, setErrorRows] = useState(false);
  const [errorCols, setErrorCols] = useState(false);
  const [errorTypes, setErrorTypes] = useState(false);
  const [errorCells, setErrorCells] = useState(false);
  
  //Update the value of a matrix input cell
  const handleMatrixChange = (row, col, value) => {
    const updated = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setMatrix(updated);
  };

  //Update number of rows when the input changes
  const GenerateRows = (e) => {
    setResponse('');
    setErrorMessage('');
    const newRows = Number(e.target.value);
    const currentCols = Number(cols);
    if (cols > 0 && newRows > 0) {
      const newMatrix = Array.from({ length: newRows }, () => Array(currentCols).fill(''));
    setMatrix(newMatrix);
    }
    if(newRows<=0) {
      setErrorRows(true);
    }
    else{
      setErrorRows(false);
    }
  };

  //Update number of cols when the input changes
  const GenerateCols = (e) => {
    setResponse('');
    setErrorMessage('');
    const newCols = Number(e.target.value);
    const currentRows = Number(rows);
    if (rows > 0 && newCols > 0) {
      const newMatrix = Array.from({ length: currentRows }, () => Array(newCols).fill(''));
    setMatrix(newMatrix);
    }
    if(newCols<=0) {
      setErrorCols(true);
    }
    else{
      setErrorCols(false);
    }
  };

  //Validate textfield when press button submit
  const handleSubmit = async () => {
    let hasError = false;

    if (rows === '') {
        setErrorRows(true);
        hasError = true;
    } else {
        setErrorRows(false);
    }

    if (cols === '') {
        setErrorCols(true);
        hasError = true;
    } else {
        setErrorCols(false);
    }

    if (types === '') {
        setErrorTypes(true);
        hasError = true;
    } else {
        setErrorTypes(false);
    }

    //Validate matrix input when press button submit
    const hasEmpty = matrix.some(row => row.some(cell => cell === '' || Number(cell) < 1));
      if (hasEmpty) {
        setErrorCells(true);
        hasError = true;
      } 
      else {
          setErrorCells(false);
      }
      if (hasError) {
          return;
      } 

      const intMatrix = matrix.map(row => row.map(cell => parseInt(cell, 10)));
      const flatMatrix = intMatrix.flat();
      const expected = Array.from({ length: types}, (_, i) => i + 1);
      let isValid = true;
      let maxValue = Number(types);
      let countTypes = 0;
      for (let x of expected) {
        if (!flatMatrix.includes(x)) {
          isValid = false;
          break;
        }
      }
    
      for (let x of flatMatrix) {
        if (x === maxValue) {
          countTypes++;
        }
        if(x > types){
          isValid = false;
          break;
        }
      }

      if(countTypes > 1){
        setErrorCells(true);
        setSeverity('error');
        setErrorMessage('Matrix must only contain values between 1 and '+ types);
        return;  
      }

      if (!isValid) {
        setErrorCells(true);
        setSeverity('error');
        setErrorMessage('Only one treasure chest of type ' + types + ' is allowed on the map.');
        return;
      }
      setErrorCells(false);

      const data = {
        RowCount: rows,
        ColumnCount: cols,
        ChestTypeCount: types,
        MapData: intMatrix
      };

      try {
        const result = await createMap(data);
        setResponse(result);
        setSeverity('success')
        setErrorMessage('Success');
      } catch (error) {
        setSeverity('error')
        setErrorMessage(error.message);
      }
    };

  return (
    <Box>
      <Typography 
        variant="h4" 
        align = "center" 
        sx={{ fontWeight: 'bold' , margin: 3}}
        >
          Create Map
      </Typography>
      <Container> 
        <Grid spacing={2} sx={{ margin: 2}}>
          <Grid item xs={4}>
            <TextField className="input-field"
              required error={errorRows} 
              id="outlined-required" 
              label="Total rows" 
              size="small" 
              value={rows} 
              type="number"
              onChange={(e) => setRows(e.target.value)}
              onBlur={GenerateRows}/>
          </Grid>
          <Grid item xs={4}>
            <TextField className="input-field"
              required error={errorCols} 
              id="outlined-required" 
              label="Total columns" 
              size="small" 
              value={cols} 
              type="number"
              onChange={(e) => setCols(e.target.value)}
              onBlur={GenerateCols}/>
          </Grid>
          <Grid item xs={4}>
            <TextField className="input-field"
              required error={errorTypes} 
              id="outlined-required" 
              label="Chest Types" 
              size="small" 
              value={types} 
              type="number"
              onChange={(e) => {
                setTypes(e.target.value);
                setResponse('');
                setErrorMessage('');
            }}/>
          </Grid>
          <Grid item xs={4}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSubmit}
              >
                Find Treasure
            </Button>
          </Grid>
          <Grid item xs={8}>
            <ForwardIcon sx={{ fontSize: 50 }} />
          </Grid>
          <Grid item xs={4}>
            <TextField className="output-field"
              id="outlined" 
              label="Min Fuel" 
              size="small" 
              value={response && response.minFuel} 
              defaultValue="..."
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Container style={{ maxWidth: "600px"}}>
        {errorMessage && (
        <Alert
          severity={severity} 
          onClose={() => {setErrorMessage('')}}
          >
            {errorMessage}
        </Alert>
        )}
      </Container>
      <Container className='scrollable-matrix-box'>
        {matrix.map((row, rowIndex) => (
          <Grid className='scrollable-x-matrix' spacing={1} key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Grid item key={colIndex}>
                <TextField className = 'input-matrix' error={errorCells} type="number" value={cell} size="small"
                  onChange={(e) => {
                    handleMatrixChange(rowIndex, colIndex, e.target.value);
                    setResponse('')
                    setErrorMessage('');
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Container>
    </Box>
  );
};

export default CreateMap;
