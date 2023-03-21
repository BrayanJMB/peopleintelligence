import { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import styles from './Quota.module.css';

export default function Quota(props) {
  const [empty, setEmpty] = useState(true);
  const [quota, setQuota] = useState({
    type: 'range',
    gender: { male: '', female: '', nothing: '' },
    range: {
      under21: '',
      r21_30: '',
      r31_40: '',
      r41_50: '',
      r51_60: '',
    },
  });

  const handletype = (event) => {
    setQuota({ ...quota, [event.target.name]: event.target.value });
  };

  const handlechange = (event) => {
    let holder = quota[quota.type];
    holder[event.target.name] = event.target.value;
    setQuota({ ...quota, [quota.type]: holder });
  };

  const handlecancel = () => {
    setEmpty(true);
  };
  const handleempty = () => {
    setEmpty(false);
  };

  return (
    <div className={styles.quota}>
      <span
        style={{
          marginLeft: '2rem',
          fontWeight: 'bold',
          fontSize: '1.2rem',
        }}
      >
        Quota Targeting
      </span>
      <div className={styles.info}>
        <div className={styles.left}>
          <Alert severity="info">You can create up to 2 quotas</Alert>
          {props.info.quotas.length === 0
            ? null
            : props.info.quotas.map((val, key) => {
                return (
                  <div key={key} className={styles.options}>
                    {val.type === 'gender' ? (
                      <>
                        <p style={{ margin: ' 1rem 0' }}>What's your gender?</p>
                        <div className={styles.option}>
                          <p>Male</p>
                          <p>{val.gender.male}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>Female</p>
                          <p>{val.gender.female}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>Prefer not to say</p>
                          <p>{val.gender.nothing}%</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p style={{ margin: ' 0.5rem 0' }}>
                          What's your age range?
                        </p>
                        <div className={styles.option}>
                          <p>Under 21</p>
                          <p>{val.range.under21}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>21-30</p>
                          <p>{val.range.r21_30}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>31-40</p>
                          <p>{val.range.r31_40}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>41-50</p>
                          <p>{val.range.r41_50}%</p>
                        </div>
                        <div className={styles.option}>
                          <p>51-60</p>
                          <p>{val.range.r51_60}%</p>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
          <div>
            <Button
              variant="text"
              startIcon={<AddCircleIcon />}
              style={{ marginTop: '1rem' }}
              onClick={handleempty}
              disabled={props.info.quotas.length > 1}
            >
              Create Quota
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          {empty ? (
            <div className={styles.empty}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                alt="profile"
                className={styles.photo}
              />
              <h4>What is Quota Targeting and how does it work?</h4>
              <p>
                Quota Targeting admits participants to your conversation based
                on their onboarding polls responses. Quotas are only available
                on single select onboarding polls
              </p>
              <p>
                Remesh's quota algorithm ensures that participants who show up
                and who meet your specified quotas are able to join the
                conversation. Read more about how the algorithm works.
              </p>
              <p>
                Note: in order to reach your specified quota, we recommend that
                you recruit over your preferred total size of audience to
                account for show rate
              </p>
            </div>
          ) : (
            <div className={styles.notempty}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Single Select - Onboarding Polls
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={quota.type}
                  label="Language"
                  onChange={handletype}
                  name="type"
                >
                  <MenuItem value={''}></MenuItem>
                  <MenuItem value={'range'}>What's your age range?</MenuItem>
                  <MenuItem value={'gender'}>What's your gender?</MenuItem>
                </Select>
              </FormControl>
              {quota.type === 'gender' ? (
                <div className={styles.forms}>
                  <div className={styles.form}>
                    <p>Poll Options (5)</p>
                    <p>Desired Ratios</p>
                    <p>Participants</p>
                  </div>
                  <div className={styles.form}>
                    <p style={{ width: '12%' }}>Male</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.gender.male}
                        name="male"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p style={{ width: '12%' }}>Female</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.gender.female}
                        name="female"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p style={{ width: '12%' }}>Prefer not to say</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.gender.nothing}
                        name="nothing"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                </div>
              ) : (
                <div className={styles.forms}>
                  <div className={styles.form}>
                    <p>Poll Options (5)</p>
                    <p>Desired Ratios</p>
                    <p>Participants</p>
                  </div>
                  <div className={styles.form}>
                    <p style={{ width: '12%' }}>Under 21</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.range.under21}
                        name="under21"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p>21 - 30</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.range.r21_30}
                        name="r21_30"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p>31 - 40</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.range.r31_40}
                        name="r31_40"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p>41 - 50</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.range.r41_50}
                        name="r41_50"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                  <div className={styles.form}>
                    <p>51 - 60</p>
                    <div className={styles.ratio}>
                      <TextField
                        id="outlined-name"
                        value={quota.range.r51_60}
                        name="r51_60"
                        onChange={handlechange}
                        size="small"
                        type="number"
                        style={{ width: '50%' }}
                      />
                      %
                    </div>
                    <p>0</p>
                  </div>
                </div>
              )}

              <div className={styles.impexp}>
                <Button variant="text" size="small" onClick={handlecancel}>
                  Cancel
                </Button>
                <Button variant="contained" size="small">
                  Save Quota
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
