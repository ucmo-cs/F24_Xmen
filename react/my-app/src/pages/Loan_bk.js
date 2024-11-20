import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Loan.css";
 



function Loan_bk() {

  const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8081/loans?page=${currentPage}&size=${itemsPerPage}`, { method: "GET", credentials: "include" })
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

    const areButtonsDisabled = currentPage === 0 && currentPage === totalPages - 1;

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
          {!areButtonsDisabled && (
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
          )}
      </div>
  );
}

export default Loan_bk;
