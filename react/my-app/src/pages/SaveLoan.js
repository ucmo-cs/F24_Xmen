import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./SaveLoan.css";

function SaveLoan(props) {

  const[loan, setLoan] = useState({
        loan_origin_amount:"",
        interest_rate:"",
          });  
    

    const changeValue=(e)=>{
        
        console.log(e);

            setLoan({
             ...loan, [e.target.name]:e.target.value  
            });
    
            console.log(e.target.name + " name "  );
            console.log(e.target.value + " value " );
    
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
              }else{
                return null;
              }
            })
          .then(res=>{
            console.log(res)
            if(res!==null){
                navigate('/Loan');
            }else{
              alert('fails');
            }
         
          });
       
    }
   
            

  return (
    <div>

    <Form onSubmit = {submitLoan}>
      <Form.Group className="mb-3" controlId="formGroupEmail" id="floating-box">
        <Form.Label>Principle</Form.Label>
        <Form.Control name="loan_origin_amount"  onChange = {changeValue}  placeholder="Enter Principle Here" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
        <Form.Label>Interest Rate</Form.Label>
        <Form.Control name="interest_rate" onChange = {changeValue} placeholder="Enter Interest Rate Here" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Email Here" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword" id="floating-box">
        <Form.Label>Phone #</Form.Label>
        <Form.Control  placeholder="Enter Phone # Here" />
      </Form.Group>
      

      <Button variant="primary" type="submit" id="saveloan-button">
        Submit  
      </Button>

    </Form>

    </div>
  );
}

export default SaveLoan;
