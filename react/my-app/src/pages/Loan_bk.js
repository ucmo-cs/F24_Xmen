
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Loan.css";
 



function Loan_bk() {

  const [loans, setLoans] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:8081/loans", {method:"GET"})
    .then(res => res.json())
    .then(res=> {setLoans(res);})
  },[])


  const navigate = useNavigate();

  const movePage = () => {
    navigate("/loanForm");  
  };

  // <Button variant="success" onClick={movePage}>Create</Button>{' '}

  return (
    <div>

        <Table striped bordered hover id="loan-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Date Created</th>
          <th>Remaining Balance</th>
          <th>Principle</th>
          <th>Interest Rate</th>
        </tr>
      </thead>
      <tbody>
      {loans.map(loan => 
       
       <tr>
          <td>{loan.loan_id}</td>
          <td>{loan.created_at}</td>
          <td>{loan.loan_current_amount}</td>
          <td>{loan.loan_origin_amount}</td>
          <td>{loan.interest_rate}</td>
        </tr>

       )}
        </tbody>
    </Table>

    </div>
  );
}

export default Loan_bk;
