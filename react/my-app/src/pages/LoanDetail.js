import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import "./Loan.css";
import "./LoanDetail.css"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

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
    }, [loanId]);

    // Prevent loan details for loading before everything is loaded
    if (!loan) {
        return <div>Loading...</div>;
    }

    // Calculate pay off date
    const calculatePayOff = (loan) => {
        let amountOfMonths = 0;
        let current_loan_amount = parseFloat(loan.loan_current_amount);
        let interest = 0;

        // Loop until the current_loan_amount is 0 or less
        // Each loop is monthly interest being added and auto-pay amount taken out
        while (current_loan_amount > 0) {
            interest = current_loan_amount * (parseFloat(loan.interest_rate) / 100);
            current_loan_amount += interest - loan.loan_auto_pay;
            amountOfMonths += 1;

            // Prevent infinite loop for invalid input
            if (amountOfMonths > 1000) {
                console.error("Loan cannot be paid off within 1000 months.");
                return "N/A";
            }
        }

        // Create currentMonth and add amount of months calculated in while loop a return
        const currentMonth = new Date(loan.created_at);
        currentMonth.setMonth(new Date().getMonth() + amountOfMonths);
        return currentMonth.toLocaleDateString();
    }

    return (
        <div id="card-parent">
            <Card id="card">
                <Card.Header>
                    <strong>Loan Details</strong>
                </Card.Header>
                <ListGroup variant='flush'>
                    <ListGroup.Item><strong>Loan ID:</strong> {loan.loanId}</ListGroup.Item>
                    <ListGroup.Item><strong>Created At:</strong> {new Date(loan.created_at).toLocaleDateString()}</ListGroup.Item>
                    <ListGroup.Item><strong>Remaining Balance:</strong> ${loan.loan_current_amount}</ListGroup.Item>
                    <ListGroup.Item><strong>Principle: </strong> ${loan.loan_origin_amount}</ListGroup.Item>
                    <ListGroup.Item><strong>Interest Rate:</strong> {loan.interest_rate}%</ListGroup.Item>
                    <ListGroup.Item><strong>Auto Pay Amount:</strong>{ loan.loan_auto_pay === null ? (<td>$0</td>) : (<td>${loan.loan_auto_pay}</td>) }</ListGroup.Item>
                    <ListGroup.Item><strong>Pay Off Date:</strong>{ parseFloat(loan.loan_auto_pay) === 0 || loan.loan_auto_pay === null ? (<td>N/A</td>) : (<td>{calculatePayOff(loan)}</td>) }</ListGroup.Item>
                </ListGroup>
            </Card>
            <Card id="card">
                <Card.Header>
                    <strong>Customer Details</strong>
                </Card.Header>
                <ListGroup variant='flush'>
                    <ListGroup.Item><strong>Customer Name:</strong> {loan.userAccount.name}</ListGroup.Item>
                    <ListGroup.Item><strong>Customer Email:</strong> {loan.userAccount.email}</ListGroup.Item>
                    <ListGroup.Item><strong>Customer Phone Number:</strong> {loan.userAccount.phone_number}</ListGroup.Item>
                    <ListGroup.Item><strong>Customer Bank Routing Number:</strong> {loan.userAccount.bank_routing}</ListGroup.Item>
                    <ListGroup.Item><strong>Customer Bank Account Number:</strong> {loan.userAccount.bank_account_number}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default LoanDetail;
