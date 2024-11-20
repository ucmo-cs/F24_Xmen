import { Button, Table } from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import "./Admin.css";
import {Link, useNavigate} from "react-router-dom";
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
    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8081/allLoans?page=${currentPage}&size=${itemsPerPage}`, { method: "GET", credentials: "include" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch loans");
                }
                return res.json();
            })
            .then(data => {
                setLoans(data.content);
                setTotalPages(data.totalPages);
            })
            .catch(error => {
                console.error("An error occurred while fetching loans:", error);
                setLoans([]); // Set loans to an empty array to avoid mapping over undefined
            });
    }, [currentPage]);

    // Handle row click to navigate to loan details page
    const handleRowClick = (loanId) => {
        navigate(`/loan/${loanId}`);
    };

    // Navigate to the next page
    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Navigate to the previous page
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

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
                {loans.map(loan =>

                    <tr key={loan.loanId} onClick={() => handleRowClick(loan.loanId)} style={{ cursor: 'pointer' }}>
                        <td>{loan.userAccount.name}</td>
                        <td>{loan.userAccount.accountId}</td>
                        <td>{loan.loanId}</td>
                        <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                        <td>{loan.loan_current_amount}</td>
                        <td>{loan.loan_origin_amount}</td>
                        <td>{loan.interest_rate}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div id="flex-parent">
                <Button
                    variant="primary"
                    id="back-button"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                >
                    Previous Page
                </Button>
                <Button
                    variant="primary"
                    id="next-button"
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                >
                    Next Page
                </Button>
            </div>
        </div>
    );
}

export default Admin;