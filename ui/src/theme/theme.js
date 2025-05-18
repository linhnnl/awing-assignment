import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root:{
          size: 'small'
        },
        input: {
          fontSize: '16px', // size chữ trong ô
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px', // size chữ của label
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '14px',         // Set cỡ chữ cho toàn bộ Button
          textTransform: 'none',    // Giữ nguyên chữ thường
        },
      },
    },
    MuiGrid: {
      defaultProps: {
        container: true,
      },
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
        stickyHeader: {
          fontSize: '15px !important',
          fontWeight: 700,
          padding: '12px',
          backgroundColor: '#cfcfcf',
        },
      },
    },
  },
});

export default theme;
