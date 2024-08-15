import { Box, Divider, Grid,Typography } from '@mui/material';

export const HeaderCMI = ({title}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          display: 'flex',
          flexDirection:'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h6" color="orange" fontWeight="bold">
          PULSO LIDERAZGO 2023
        </Typography>
        <Divider
          sx={{
            width: '100%',
            marginTop: '8px',
            backgroundColor: 'orange',
            height: '8px',
          }}
        />
        {title && (
        <Typography variant="h6" color="orange" fontWeight="bold">
            {title}
        </Typography>)}
      </Grid>
      <Grid item xs={4}>
        <Box
          component="img"
          src="/path-to-your-logo.png"
          alt="CMI Logo"
          height="50px"
        />
      </Grid>
    </Grid>
  );
};
