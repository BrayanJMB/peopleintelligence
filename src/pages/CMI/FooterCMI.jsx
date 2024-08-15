import { Box, Typography, Divider } from '@mui/material';

export const FooterCMI = () => {
  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between" 
      padding="16px"
      sx={{ backgroundColor: 'white', marginTop: 'auto' }}
    >
      <Box component="img" src="/path-to-your-logo.png" alt="CMI Logo" height="50px" />
      <Divider sx={{ flexGrow: 1, marginLeft: '16px', marginRight: '16px', backgroundColor: 'orange' }} />
      <Typography variant="body2" color="textSecondary">
        www.somoscmi.com
      </Typography>
    </Box>
  );
};
