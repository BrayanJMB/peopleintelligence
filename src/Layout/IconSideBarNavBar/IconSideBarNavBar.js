import Navbar from "../Navbar/Navbar";
import IconSidebar from "../IconSidebar/IconSidebar";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";

export default function IconSidebarNavBar({ children }) {
  return (
    <Grid container style={{ height: "100vh" }}>
      <Hidden xsDown>
        <Grid item xs={2}>
          <IconSidebar />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={10}>
        <Navbar />
        {children}
      </Grid>
    </Grid>
  );
}
