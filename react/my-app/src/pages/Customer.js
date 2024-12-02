import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
 
import "./Customer.css";
import {Button, Form, Table} from 'react-bootstrap';
import loan from "./Loan";

function Customer() {
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [loans, setLoans] = useState([]);
    const [loanUpdates, setLoanUpdates] = useState({});
    const [user, setUser] = useState({ name: '', email: '', phone_number: '',
        bank_routing: '', bank_account_number: ''});
    const [editStatus, setEditStatus] = useState("")

    useEffect(() => {
        fetch("http://localhost:8081/user/account", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/loans?page=${0}&size=${99999}`, { method: "GET", credentials: "include" })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to fetch loans");
                }
                return res.json();
            })
            .then(data => {
                setLoans(data.content);
                validateAutoPayAmounts();
            })
            .catch(error => {
                console.error("An error occurred while fetching loans:", error);
                setLoans([]); // Set loans to an empty array to avoid mapping over undefined
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleLoanInputChange = (e, loanId) => {
        const { value } = e.target;
        setLoanUpdates(prev => ({ ...prev, [loanId]: value }));
        validateAutoPayAmounts(loanId, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update user details
            const userResponse = await fetch("http://localhost:8081/user/edit", {
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });
            if (!userResponse.ok) throw new Error("Failed to update user");

            // Update loans
            const loanPromises = Object.entries(loanUpdates).map(([loanId, autoPayAmount]) =>
                fetch(`http://localhost:8081/loanEdit?loanId=${loanId}&autoPayAmount=${autoPayAmount}`, {
                    method: "PUT",
                    credentials: "include",
                })
            );
            const loanResponses = await Promise.all(loanPromises);
            if (loanResponses.some(res => !res.ok)) throw new Error("Failed to update some loans");

            setEditStatus("Successfully Updated!");
        } catch (error) {
            console.error(error);
            setEditStatus("Failed to update user or loans");
        }
    };

    const validateAutoPayAmounts = (currentLoanId = null, currentValue = null) => {
        const allValid = loans.every(loan => {
            const autoPay = parseFloat(
                loan.loanId === currentLoanId
                    ? currentValue
                    : loanUpdates[loan.loanId] ?? loan.loan_auto_pay
            );
            const minAutoPay = Math.ceil(
                parseFloat(loan.loan_current_amount) *
                (parseFloat(loan.interest_rate) / 100.0)
            );
            const maxAutoPay = parseFloat(loan.loan_current_amount) + minAutoPay;

            return autoPay === 0 || (autoPay > 0 && autoPay >= minAutoPay && autoPay <= maxAutoPay);
        });

        setIsSaveDisabled(!allValid);
    };

  return (
    <div>
       <h2 id="welcome-customer">Welcome back, {user.name}!</h2>
       <Form onSubmit={handleSubmit}>
        <h5 id="edit-message">To edit your profile, enter your new information in the forms below and 
          hit submit.
        </h5>
        <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Name</Form.Label>
        <Form.Control  placeholder="CurrentNameHere" type="text"
                       name="name"
                       value={user.name}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Email</Form.Label>
        <Form.Control  placeholder="CurrentEmailHere" type="email"
                       name="email"
                       value={user.email}
                       onChange={handleInputChange}/>
      </Form.Group>
       <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Phone #</Form.Label>
        <Form.Control  placeholder="CurrentPhoneNumberHere" type="text"
                       name="phone_number"
                       value={user.phone_number}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Routing #</Form.Label>
        <Form.Control  placeholder="CurrentRoutingNumberHere" type="text"
                       name="bank_routing"
                       value={user.bank_routing}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Account #</Form.Label>
        <Form.Control  placeholder="CurrentAccountNumberHere" type="text"
                       name="bank_account_number"
                       value={user.bank_account_number}
                       onChange={handleInputChange}/>
      </Form.Group>
       <a>
           {loans.map(loan =>
                <Form.Group className="mb-3" id="floating-box">
                    <Form.Label>Loan #{loan.loanId} AutoPay Amount</Form.Label>
                    <Form.Control  placeholder="Loan Auto Pay Amount" type="text"
                                   value={loanUpdates[loan.loanId] ?? loan.loan_auto_pay}
                                   onChange={(e) => {
                                       handleLoanInputChange(e, loan.loanId);}
                                    }/>
                    <Form.Label>Must be a minimum of ${Math.ceil(parseFloat(loan.loan_current_amount) * (parseFloat(loan.interest_rate) / 100.0))} and a maximum of
                        ${parseFloat(loan.loan_current_amount) + Math.ceil(parseFloat(loan.loan_current_amount) * (parseFloat(loan.interest_rate) / 100.0))} or $0 for no auto pay</Form.Label>
                </Form.Group>
           )}
       </a>

      <Button variant="primary" type="submit" id="save-edits-button" disabled={isSaveDisabled}>
        Change My Information
      </Button>
       </Form>

        {editStatus && <p id="text-align-left">{editStatus}</p>}
    </div>

  );
}

export default Customer;
