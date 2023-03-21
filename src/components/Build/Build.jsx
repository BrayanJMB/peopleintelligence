import { useCallback,useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import Basic from './Basic/Basic';
import Discussion from './Discussion/Discussion';
import Quota from './Quota/Quota';
import Segment from './Segment/Segment';

import styles from './Build.module.css';

const list = [
  'Basic Details',
  'Schedule',
  'Audience',
  'Discussion Guide',
  'Segments',
  ' Quota Targeting',
];

const root = [
  'basic',
  'schedule',
  'audience',
  'discussion',
  'segments',
  'quota',
];

export default function Build() {
  const [stage, setStage] = useState('basic');
  const [info, setInfo] = useState({
    open: false,
    title: '',
    language: '',
    name: '',
    avatar: '',
    cover: '',
    introduction: '',
    segments: [{ gender: 'Female', range: '31-40' }],
    quotas: [
      {
        type: 'gender',
        gender: { male: '40', female: '40', nothing: '20' },
      },
    ],
  });

  const handlephoto = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setInfo({ ...info, [event.target.name]: reader.result });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handlemove = (val) => {
    setStage(val);
  };

  const handlereset = (name) => {
    setInfo({ ...info, [name]: '' });
  };

  const handlechange = useCallback(
    (event) => {
      setInfo({ ...info, [event.target.name]: event.target.value });
    },
    [info]
  );

  const handlesave = () => {
    setInfo({ ...info, open: true });
  };

  const renderSwitch = (type) => {
    switch (type) {
      case 'basic':
        return (
          <Basic
            info={info}
            handleChange={handlechange}
            handlePhoto={handlephoto}
            handleReset={handlereset}
            handleMove={handlemove}
            handleSave={handlesave}
          />
        );
      case 'schedule':
        return null;
      case 'audience':
        return null;
      case 'discussion':
        return <Discussion />;
      case 'segments':
        return <Segment info={info} />;
      case 'quota':
        return <Quota info={info} />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.build}>
      <Box
        sx={{
          height: '100vh',
          width: '200px',
        }}
        style={{
          backgroundColor: 'rgb(233, 229, 229)',
          borderRight: '2px solid grey',
          borderLeft: '2px solid grey',
        }}
        aria-label="mailbox folders"
      >
        <List>
          <ListItem
            disablePadding
            style={{
              marginTop: '1rem ',
              marginBottom: '1.5rem ',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: '70%',
                margin: '0 auto',
              }}
            >
              Lorem ipsum dolor sit, amet
            </p>
          </ListItem>

          {list.map((val, index) => {
            return (
              <ListItem onClick={() => handlemove(root[index])} key={index}>
                <ListItemButton
                  style={{
                    color: stage === root[index] ? '#00b0f0' : 'grey',
                    fontWeight: 'bold',
                  }}
                >
                  {val}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <div className={styles.content}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '0.5rem',
          }}
        >
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-start',
              marginLeft: '2rem',
            }}
          >
            {info.open ? <p>{info.title}</p> : null}
          </div>
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              marginRight: '2rem',
            }}
          >
            <Button
              variant="text"
              style={{ marginRight: '1.5rem' }}
              disabled={!info.open}
              size="small"
            >
              Share
            </Button>
            {stage === 'discussion' ? (
              <Button
                size="small"
                variant="text"
                style={{ marginRight: '1.5rem' }}
                disabled={!info.open}
              >
                Practice
              </Button>
            ) : null}
            <Button size="small" variant="outlined" disabled={!info.open}>
              Publish
            </Button>
          </div>
        </div>
        {renderSwitch(stage)}
      </div>
    </div>
  );
}
