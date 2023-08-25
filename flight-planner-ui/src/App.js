import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/NavBar.js';
import Login from './Components/Login.js'

import AdminAirport from './Components/ViewComponents/Admin/Airport/Airport.js'
import AdminAddAirport from './Components/ViewComponents/Admin/Airport/AddAirport.js'
import DetailAirport from './Components/ViewComponents/Admin/Airport/DetailAirport.js';
import UpdateAirport from './Components/ViewComponents/Admin/Airport/UpdateAirport.js';

import AdminFlight from './Components/ViewComponents/Admin/Flight/Flight.js';
import AddFlight from './Components/ViewComponents/Admin/Flight/AddFlight.js';
import DetailFlight from './Components/ViewComponents/Admin/Flight/DetailFlight.js';
import UpdateFlight from './Components/ViewComponents/Admin/Flight/UpdateFlight.js';

import CustomerAirport from './Components/ViewComponents/Customer/Airport/Airport.js';
import CustumerFlight from './Components/ViewComponents/Customer/Flight/Flight.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/adminAirport" element={<AdminAirport />} />
          <Route path="/addAirport" element={<AdminAddAirport />}/>
          <Route path="/airport/:id" element={<DetailAirport />}/>
          <Route path="/updateAirport/:id" element={<UpdateAirport />}/>
           
          <Route path="/adminFlight" element={<AdminFlight />} />
          <Route path="/addFlight" element={<AddFlight />}/>
          <Route path="/flight/:id" element={<DetailFlight />}/>
          <Route path="/updateFlight/:id" element={<UpdateFlight />}/>
          
          <Route path="/customerAirport" element={<CustomerAirport />} />
          <Route path="/customerFlight" element={<CustumerFlight />} />
          
          <Route path="/login" element={<Login />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
