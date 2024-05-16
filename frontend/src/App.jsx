import { Routes, Route } from 'react-router-dom';
import Home from './pages/employees';
import Update from './pages/update'; // Corrected import statement
import Add from './pages/add'; // Corrected import statement

const App = () => {
 return (
    <>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/update/:id" element={<Update />} /> 
          <Route path="/add" element={<Add />} /> 
       </Routes>
    </>
 );
};

export default App;
