import { useCallback, useEffect, useState } from 'react';
export const Demographics = ({ demographics, description })=> {
    console.log(demographics)
    return (
      <div id="preguntasRecibidas">
        {demographics && demographics.map((demovalue, index) => (
          <div key={index} className="d-flex flex-column justify-content-start mb-4">
            <div className="p-3 ms-3" style={{ borderRadius: '15px', backgroundColor: 'rgba(57, 192, 237,.2)' }}>
              <p className="small mb-0">{demovalue.name}</p>
            </div>
            
            {demovalue.demographicDetails && demovalue.demographicDetails.map((option, index2)=>(
                <>
                    <p key={index2}>{option.value}</p>
                </>
            ))}
          </div>
        ))}
      </div>
    );
  }