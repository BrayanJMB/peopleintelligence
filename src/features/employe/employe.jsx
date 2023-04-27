// employeeReducer.js

const initialState = {
    employees: [],
    persons: [],
    documentTypes: [],
    genders: [],
    cities: [],
    // ... Y así sucesivamente para todos los estados
  };
  
  export const employeeReducer = (state, action) => {
    switch (action.type) {
      case 'SET_EMPLOYEES':
        return { ...state, employees: action.payload };
      case 'SET_PERSONS':
        return { ...state, persons: action.payload };
      default:
        return state;
    }
  };
  
  export default initialState;