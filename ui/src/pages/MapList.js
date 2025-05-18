import React, { useState, useEffect } from 'react';
import { getListMaps, getMapById} from '../services/mapApi'
import MapDetailModal from './MapDetailModal';

import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

//Define the Table header
const columns = [
  { 
    id: 'rowCount', 
    label: 'Total Rows', 
    align: 'center' 
  },
  { 
    id: 'columnCount', 
    label: 'Total Columns', 
    align: 'center' 
  },
  {
    id: 'chestTypeCount', 
    label: 'Chest Types', 
    align: 'center' 
  },
  {
    id: 'minFuel',
    label: 'Minimum Fuel',
    align: 'center',
    format: (value) => value.toFixed(10).toLocaleString('en-US')
  },
  {
    id: 'createdAt',
    label: 'Created At',
    align: 'center'
  }
];  

const MapList = () => {
  const [maps, setMaps] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [detailMap, setDetailMap] = useState('');


  const [searchRow, setSearchRow] = useState('');
  const [searchCol, setSearchCol] = useState('');
  const [searchTypeCount, setSearchTypeCount] = useState('');

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Call API get a list map
  const getMaps =  async () => {
    try {
      const response = await getListMaps(
        searchRow || null,
        searchCol || null,
        searchTypeCount || null);
      setMaps(response);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getMaps();
  }, []);

  // Call API detail map
  const handleDetail = async (id) => {
    try {
      const result = await getMapById(id);
      setDetailMap(result);
      setOpenModal(true);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  return (
    <Container className='centered-table'>
      <Typography 
        variant="h4" 
        align = "center" 
        sx={{ fontWeight: 'bold' }}
        > 
          Map List 
      </Typography>
      <Stack 
        spacing={2} 
        direction="row"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 3
        }}>
        <TextField
          className='input-field'
          label="Total Rows"
          type="number"
          size="small"
          value={searchRow}
          onChange={(e) => setSearchRow(e.target.value)}
        />
        <TextField
          className='input-field'
          label="Total Columns"
          type="number"
          size="small"
          value={searchCol}
          onChange={(e) => setSearchCol(e.target.value)}
        />
        <TextField
          className='input-field'
          label="Chest Types"
          type="number"
          size="small"
          value={searchTypeCount}
          onChange={(e) => setSearchTypeCount(e.target.value)}
        />
        <Button variant="contained" onClick={() => getMaps()}> 
          Search
        </Button>
      </Stack>
      <Container>
          {errorMessage && (
            <Alert
              severity = 'error' 
              onClose={() => {}}
              >
                {errorMessage}
            </Alert>
          )}
        </Container>  
      <Paper className='table-style'>
        <TableContainer sx={{ maxHeight: 550 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {maps
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.mapId}>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDetail(row.mapId)}
                        >
                          Detail
                        </Button>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              :value
                            }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={maps.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {openModal && (
        <MapDetailModal
          open = {openModal}
          onClose={() => setOpenModal(false)}
          map = {detailMap}
        />
      )}
    </Container>
  );
};

export default MapList;
