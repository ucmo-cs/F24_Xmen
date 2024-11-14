import { Button, Table } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import "./Admin.css";
/*TODO ON THIS PAGE-----
add function like in loan_bk.js to populate
the table with data from the database.
By clicking into one of the loans, the admin should be taken to a page dedicated to that loan
where they see the following:
o All data listed on the table above.
o The email address of the customer who owns the loan.
o The phone number of the customer who owns the loan.
o Bank and account details for automatic payments.
o The customer’s scheduled automatic payments.
o A calculated pay-off date for the loan based on interest rate and scheduled payments.

*/
function Admin(){

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if the user is an admin
        fetch("http://localhost:8081/user/checkAdmin", {
            method: "GET",
            credentials: "include" // Send cookies with the request
        })
            .then(response => response.json())
            .then(data => setIsAdmin(data)) // Assuming the response is true or false
            .catch(error => console.error("Error checking admin status:", error));
    }, []);

    if (!isAdmin) {
        return <p>You do not have access to this page.</p>;
    }

    else{
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
}

export default Admin;