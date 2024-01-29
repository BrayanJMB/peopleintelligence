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
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '50px',
            backgroundColor: `${color}`,
            borderRadius: '50px',
            width: '100%',
          }}
        >
          <h2 style={{ fontSize: '20px' }}>{title}</h2>
        </div>
      </Grid>
      <Grid item sm={4} xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
        <img src={logo2} alt="ImagenBancolombia" style={{ padding: '1rem' }} />
      </Grid>
    </Grid>
  );
};
