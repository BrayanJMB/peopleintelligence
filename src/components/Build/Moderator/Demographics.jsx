import { useCallback, useEffect, useState } from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
export const Demographics = ({ demographics, responseDemographic })=> {
    
    console.log(responseDemographic)
    return (
      <div id="preguntasRecibidas">
        {demographics && demographics.map((demovalue, index) => (
          <div key={index} className="d-flex flex-column justify-content-start mb-4">
            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)' }}>
              <p className="small mb-0">{demovalue.name}</p>
            </div>
            
            
            {demovalue.demographicDetails && demovalue.demographicDetails.map((option, index2)=>(
                <div key={option.id} style={{ display: 'flex', alignItems:"center" }}>
                    <p style={{ marginRight:"5px"}}  key={index2}>{option.value}</p>
                    <PersonOutlineIcon/>
                    <p className="me-5 mb-1">{responseDemographic[option.id] || 0}</p>
                </div>
                
            ))}
          </div>
        ))}
      </div>
    );
  }