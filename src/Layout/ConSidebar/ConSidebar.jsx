import { useNavigate } from 'react-router-dom';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';

import styles from './ConSidebar.module.css';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function ConSidebar(props) {
  const navigate = useNavigate();

  const handleRedirect = (type) => {
    navigate('/conversation/' + type);
  };

  return (
    <Box sx={{ width: '60px' }} aria-label="mailbox folders">
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: '60px',
            overflow: 'hidden',
            border: 'none',
          },
        }}
        open
      >
        <Toolbar style={{ padding: 0 }}>
          <img
            src="https://media.glassdoor.com/sqll/2135917/remesh-squarelogo-1547826220454.png"
            alt="profile"
            className={styles.photo}
          />
        </Toolbar>
        <Divider variant="middle" />
        <List>
          <ListItem disablePadding style={{ margin: '0.5rem 0' }}>
            <ListItemButton
              id={'demo-positioned-button'}
              onClick={() => handleRedirect('Build')}
              selected={props.type === 'Build' ? true : false}
            >
              <ListItemIcon style={{ position: 'relative' }}>
                <RateReviewOutlinedIcon
                  color={props.type === 'Build' ? 'blue' : 'inherit'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ margin: '1rem 0' }}>
            <ListItemButton
              id={'demo-positioned-button'}
              onClick={() => handleRedirect('Live')}
              selected={props.type === 'Live' ? true : false}
            >
              <ListItemIcon style={{ position: 'relative' }}>
                <ForumOutlinedIcon
                  color={props.type === 'Live' ? 'blue' : 'inherit'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ margin: '1rem 0' }}>
            <ListItemButton
              id={'demo-positioned-button'}
              onClick={() => handleRedirect('Analysis')}
              selected={props.type === 'Analysis' ? true : false}
            >
              <ListItemIcon style={{ position: 'relative' }}>
                <DonutSmallRoundedIcon
                  color={props.type === 'Analysis' ? 'blue' : 'inherit'}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ marginTop: '45vh' }}>
            <ListItemButton
              id={'demo-positioned-button'}
              style={{ margin: '0 auto', padding: 0 }}
            >
              <ListItemAvatar style={{ margin: '0 auto' }}>
                <Avatar
                  alt="Remy Sharp"
                  {...stringAvatar('Cii Baa')}
                  style={{ margin: '0 auto' }}
                />
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding style={{ margin: '1rem 0' }}>
            <ListItemButton id={'demo-positioned-button'}>
              <ListItemIcon style={{ position: 'relative' }}>
                <HelpOutlineOutlinedIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
