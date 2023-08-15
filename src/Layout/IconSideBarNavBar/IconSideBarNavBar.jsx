import NavbarResponsive from "../Navbar/NavbarResponsive";
import IconSidebarResponsive from "../IconSidebar/IconSidebarResponsive";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";

export default function IconSidebarNavBar({ children, ...props }) {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Hidden xsDown>
      {props.hasIconSideBar && (
        <Grid item xs={2}>
          <IconSidebarResponsive />
        </Grid>
      )}
      </Hidden>
        <Grid item xs={12} sm={props.hasIconSideBar ? 10: 12}>
        <NavbarResponsive />
        <div style={{display:"flex"}}>
            {children}     
        </div>
      </Grid>
    </Grid>
  );
}