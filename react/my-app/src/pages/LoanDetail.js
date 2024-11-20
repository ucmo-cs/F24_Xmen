import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters

function LoanDetail() {
    const { loanId } = useParams(); // Get the loanId from the URL
    const [loan, setLoan] = useState(null);

    useEffect(() => {
        // Fetch the loan details based on the loanId from the URL
        fetch(`http://localhost:8081/loan/${loanId}`, { method: "GET", credentials: "include" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch loan details");
                }
                return res.json();
            })
            .then(data => {
                setLoan(data);
            })
            .catch(error => {
                console.error("Error fetching loan details:", error);
            });
    }, [loanId]); // Dependency on loanId, so it updates when the URL changes

    if (!loan) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Loan Details</h2>
            <p><strong>Loan ID:</strong> {loan.loanId}</p>
            <p><strong>Created At:</strong> {new Date(loan.created_at).toLocaleDateString()}</p>
            <p><strong>Remaining Balance:</strong> {loan.loan_current_amount}</p>
            <p><strong>Principle:</strong> {loan.loan_origin_amount}</p>
            <p><strong>Interest Rate:</strong> {loan.interest_rate}</p>
        </div>
    );
}

export default LoanDetail;
