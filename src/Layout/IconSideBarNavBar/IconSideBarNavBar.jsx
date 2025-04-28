import Grid from '@mui/material/Grid';
import { useMediaQuery } from '@mui/material';
import IconSidebarResponsive from '../IconSidebar/IconSidebarResponsive';
import NavbarResponsive from '../Navbar/NavbarResponsive';

export default function IconSidebarNavBar({ children, ...props }) {
  const isLargerThanXs = useMediaQuery('(min-width:600px)'); // 600px es el breakpoint de "sm"

  return (
    <Grid container style={{ height: '100vh' }}>
      {isLargerThanXs && props.hasIconSideBar && (
        <Grid item xs={2}>
          <IconSidebarResponsive />
        </Grid>
      )}
      <Grid item xs={12} sm={props.hasIconSideBar ? 10 : 12}>
        <NavbarResponsive />
        <div style={{ display: 'flex' }}>
          {children}
        </div>
      </Grid>
    </Grid>
  );
}
