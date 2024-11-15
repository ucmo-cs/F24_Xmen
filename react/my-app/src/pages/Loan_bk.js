
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Loan.css";
 



function Loan_bk() {

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/loans", { method: "GET", credentials: "include" })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to fetch loans");
          }
          return res.json();
        })
        .then(data => {
          setLoans(data);
        })
        .catch(error => {
          console.error("An error occurred while fetching loans:", error);
          setLoans([]); // Set loans to an empty array to avoid mapping over undefined
        });
  }, []);


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
          <td>{loan.loanId}</td>
          <td>{new Date(loan.created_at).toLocaleDateString()}</td>
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
