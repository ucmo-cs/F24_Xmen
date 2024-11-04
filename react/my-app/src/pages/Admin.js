import { Button, Table } from 'react-bootstrap';
import React from 'react';
import "./Admin.css";
/*TODO ON THIS PAGE-----
add function like in loan_bk.js to populate
the table with data from the database.
*/
function Admin(){

    return(
        <div>
        <Button variant="primary" id="create-loan-button" href="/loanform">
        Create A Loan  
      </Button>
        <Table striped bordered hover id="loan-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Loan ID</th>
          <th>Date Created</th>
          <th>Remaining Balance</th>
          <th>Principle</th>
          <th>Interest Rate</th>
        </tr>
      </thead>
      <tbody>
        </tbody>
    </Table>

    </div>
    );
}

export default Admin;