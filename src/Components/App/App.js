import React from 'react';
import SelectionForm from '../SelectionForm/SelectionForm'
import logo from './Logo.png';


function App() {
  return (
    <div className="App">
     <div className="container">
       <header>
         <div className="logo">
           <img src={logo} alt=""/>
         </div>
         <div className="title">
          <h1>Oszczędź nawet <br/> 580 złotych na OC</h1>
         </div>
       </header>
       <div className="form">
         <SelectionForm />
       </div>
     </div>
    </div>
  );
}

export default App;
