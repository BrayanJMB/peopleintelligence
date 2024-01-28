import Box from '@mui/material/Box';

import logo from './img/Bancolombia.jpeg';

export const Layout = ({ children }) => {
  return (
    <Box style={{ backgroundColor: 'white', border: '1rem' }}>
        <div style={{ backgroundColor: '#2A2424' }}>
        <img src={logo} alt="some" />
        </div>
        { children }
    </Box>
  );
};
