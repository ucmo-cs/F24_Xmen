import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SaveLoan.css";

function SaveLoan(props) {

  const[loan, setLoan] = useState({
        loan_origin_amount:"",
        interest_rate:"",
        user_email:""
          });

    const[user, setUser] = useState({
        email:"",
        name:"",
        phone_number:"",
        password:"password",
        admin:false
    });


    const changeValue=(e)=>{
        
        console.log(e);

            setLoan({
             ...loan, [e.target.name]:e.target.value  
            });
    
            console.log(e.target.name + " name "  );
            console.log(e.target.value + " value " );
    
    }

    const changeUserValue=(e)=>{

        console.log(e);

        setUser({
            ...user, [e.target.name]:e.target.value
        });

        console.log(e.target.name + " name "  );
        console.log(e.target.value + " value " );

    }

    const changeEmailValue=(e) =>{
        setUser({...user, email: e.target.value});
        setLoan({...loan, user_email: e.target.value});
    }

    const navigate = useNavigate();

    const submitLoan =(e)=>{
        e.preventDefault();


        fetch("http://localhost:8081/loan", {
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(loan)
          })
          .then(res=>{
              console.log(1,res);
              if(res.status === 201){
                return res.json();
              }else if(res.status === 404){
                createAccount(e)
                return 0;
              }else{
                return null;
              }
            })
          .then(res=>{
            console.log(res)
            if(res!==null){
                if(res === 1){}
                else
                    navigate('/Loan');
            }else{
              alert('fails');
            }
         
          });
       
    }

    const createAccount = (e) => {
        fetch("http://localhost:8081/user/add", {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res=>{
                console.log(1,res);
                if(res.status === 201){
                    submitLoan(e)
                    return res.json();
                }else{
                    return null;
                }
            })
            .then(res=>{
                console.log(res)
                if(res!==null){

                }else{
                    alert('user fails');
                }

            });
    }

  return (
    <div>

    <Form onSubmit = {submitLoan}>
      <Form.Group className="mb-3" controlId="formGroupEmail" id="floating-box">
        <Form.Label>Principle</Form.Label>
        <Form.Control name="loan_origin_amount" type="number" onChange = {changeValue}  placeholder="Enter Principle Here" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
        <Form.Label>Interest Rate</Form.Label>
        <Form.Control name="interest_rate" type="number" step="0.000001" onChange = {changeValue} placeholder="Enter Interest Rate Here" />
      </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" onChange = {changeUserValue} placeholder="Enter User's Name Here" />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
        <Form.Label>Email</Form.Label>
        <Form.Control name="user_email" type="email" onChange = {changeEmailValue} placeholder="Enter Email Here" />
      </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phone_number" type="number" onChange = {changeUserValue} placeholder="Enter Email Here" />
        </Form.Group>
      

      <Button
          variant="primary"
          type="submit"
          id="saveloan-button"
          disabled={loan.loan_origin_amount === "" || loan.interest_rate === "" || loan.user_email === ""
                    || user.name === "" || user.phone_number === "" }>
        Submit  
      </Button>

    </Form>

    </div>
  );
}

export default SaveLoan;
