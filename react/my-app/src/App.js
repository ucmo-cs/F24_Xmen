import logo from './components/logo.svg';
import './App.css';
import Header from './components/Header';
import { Route, Router, Routes } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
      <div>
        <Header/> 
        <Routes>
          <Route path="/loan" exact={true} element={<Loan_bk/>}/>
          <Route path="/loanForm" exact={true} element={<SaveLoan/>}/>
          <Route path="/customer" exact={true} element={<Customer/>}/>
          <Route path="/login" exact={true} element={<Login/>}/>
            <Route path="/" exact={true} element={<Login/>}/>
            <Route path="/admin" exact={true} element={<Admin/>}/>
        </Routes>
      </div>
  );
}

export default App;
