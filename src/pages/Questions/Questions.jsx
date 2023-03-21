import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import styles from './Questions.module.css';

export default function Questions() {
  const [data, setData] = useState([
    {
      type: 'simple',
      title: 'Question 1',
      description: 'description of question',
      answer: '',
      key: 0,
    },
    {
      type: 'escala',
      title: 'Question 2',
      description: 'description of question',
      options: [
        'Muy en desacuerdo',
        'Discrepar',
        'Neutral',
        'Estar de acuerdo',
        'Totalmente de acuerdo',
      ],
      answer: '',
      key: 1,
    },
    {
      type: 'multiple',
      title: 'Question 3',
      description: 'description of question',
      options: ['a', 'b', 'c', 'd', 'e'],
      answer: '',
      key: 2,
    },
    {
      type: 'stars',
      title: 'Question 4',
      description: 'description of question',
      stars: Array(5).fill(0),
      answer: '',
      key: 3,
    },
    {
      type: 'stars',
      title: 'Question 5',
      description: 'description of question',
      answer: '',
      stars: Array(7).fill(0),
      key: 4,
    },
    {
      type: 'simple',
      title: 'Question6',
      description: 'description of question',
      answer: '',
      key: 5,
    },
    {
      type: 'escala',
      title: 'Question 7',
      description: 'description of question',
      options: ['1', '2', '3', '4', '5'],
      answer: '',
      key: 6,
    },
    {
      type: 'multiple',
      title: 'Question 8',
      description: 'description of question',
      options: ['a', 'b', 'c', 'd', 'e'],
      answer: '',
      key: 7,
    },
    {
      type: 'stars',
      title: 'Question 9',
      description: 'description of question',
      stars: Array(5).fill(0),
      answer: '',
      key: 8,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quesPerPage, setQuesPerPage] = useState(5);
  const [revision, setRevision] = useState(false);
  const lastIndex = currentPage * quesPerPage;
  const firstIndex = lastIndex - quesPerPage;
  const questions = data.slice(firstIndex, lastIndex);

  const handleText = (key, event) => {
    let tmp = [...data];
    tmp[key].answer = event.target.value;
    setData(tmp);
  };

  const handleAtras = () => {
    if (revision) {
      setRevision(false);
    }
    setCurrentPage((val) => val - 1);
  };
  const handleContinuar = () => {
    if (lastIndex > data.length) {
      setRevision(true);
    } else {
      setCurrentPage((val) => val + 1);
    }
  };
  const handleRadio = (key, event) => {
    let tmp = [...data];
    tmp[key].answer = event.target.value;
    setData(tmp);
  };

  const handleStars = (key, index) => {
    let tmp = [...data];
    let stars = tmp[key].stars.map((_val, i) => {
      if (i <= index) {
        return 1;
      } else {
        return 0;
      }
    });
    tmp[key].stars = stars;
    setData(tmp);
  };

  const renderForm = (type, key, options) => {
    switch (type) {
      case 'simple':
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
            }}
          >
            <TextField
              id="outlined-name"
              variant="outlined"
              value={data[key].answer}
              name="name"
              fullWidth
              onChange={(event) => handleText(key, event)}
              size="small"
            />
          </div>
        );
      case 'escala':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
              >
                {options.map((val, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={val}
                      control={<Radio />}
                      label={val}
                      onChange={(event) => handleRadio(key, event)}
                      style={{ margin: '0 1rem' }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 'multiple':
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
              >
                {options.map((val, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={val}
                      control={<Radio />}
                      label={val}
                      onChange={(event) => handleRadio(key, event)}
                      style={{ margin: '0 1rem' }}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 'stars':
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              width: '100%',
            }}
          >
            {data[key].stars.map((val, index) => {
              return (
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  key={index}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleStars(key, index)}
                >
                  <path
                    d="M12.978 15.544L8.00001 11.8854L3.02201 15.544L4.93334 9.63536L-0.0419922 6.00003H6.10067L8.00001 0.0813599L9.89934 6.00003H16.0413L11.0667 9.63536L12.978 15.544Z"
                    fill={val === 0 ? '#ddd' : '#03aae4'}
                  ></path>
                </svg>
              );
            })}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw' }}>
      <div
        style={{
          backgroundColor: 'white',
          flex: 1,
          height: '100vh',
        }}
      >
        <header className={styles.header}>
          <h1>la primera encuesta</h1>
          <h4>esta es la primera encuesta</h4>
        </header>
        {revision ? (
          <div className={styles.answer}>
            {data.map((val, index) => {
              return (
                <div className={styles.question} key={val.key}>
                  <div className={styles.info}>
                    <p>{val.title}</p>
                    <p>{val.description}</p>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div className={styles.form}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                      }}
                    >
                      <div>
                        <p>{data[index].answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.wrapper}>
            {questions.map((val) => {
              return (
                <div className={styles.question} key={val.key}>
                  <div className={styles.info}>
                    <p>{val.title}</p>
                    <p>{val.description}</p>
                  </div>
                  <Divider orientation="vertical" flexItem />
                  <div className={styles.form}>
                    {renderForm(val.type, val.key, val?.options)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className={styles.stepper}>
          <Button
            variant="text"
            onClick={handleAtras}
            disabled={currentPage === 1}
          >
            atrás
          </Button>
          <Button
            variant="contained"
            onClick={handleContinuar}
            style={{ marginRight: '1em' }}
          >
            {lastIndex > data.length ? 'Revision' : 'Continuar'}
          </Button>
        </div>
      </div>
    </Box>
  );
}
