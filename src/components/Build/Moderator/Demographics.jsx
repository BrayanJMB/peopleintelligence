import { useCallback, useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import styles from './ChatBox.module.css';
export const Demographics = ({ demographics, responseDemographic})=> {
  
    return (
      <div className={styles.chatApp__convMessageValue}>
        {demographics && demographics.map((demovalue, index) => (
          <div key={index} >
            <div >
              <p className="small mb-0">{demovalue.name}</p>
            </div>
            {demovalue.demographicDetails && demovalue.demographicDetails.map((option, index2)=>(
                <div key={option.id} style={{ display: 'flex', alignItems:'center' }}>
                    <p style={{ marginRight:'5px'}}  key={index2}>{option.value}</p>
                    <PersonOutlineIcon/>
                    <p className="me-5 mb-1">{responseDemographic[option.id] || 0}</p>
                </div>

            ))}
          </div>
        ))}
      </div>
    );
  };