import { Grid } from '@mui/material';

import logo2 from './img/Logotipo.png';
export const LayoutQuestions = ({ title, color }) => {
  return (
    <Grid container>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: `${color}`,
          borderRadius: '20px',
          textAlign:'center',
          marginBottom:'10px',
        }}
      >
        <h2 style={{ fontSize: '30px' }}>{title}</h2>
      </Grid>
      <Grid item sm={4} xs={12}>
        <img src={logo2} alt="some" style={{ padding: '1rem' }} />
      </Grid>
    </Grid>
  );
};
