
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';

import './App.css';
import Add from './Add';
import FormDataTable from './FormDataTable';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Add />}></Route> 
      <Route path='/getFormData' element={<FormDataTable />}></Route> 
      
     
      </Routes>
    </Router>
  );
}

export default App;
