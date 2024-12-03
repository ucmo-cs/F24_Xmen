import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import "./Loan.css";

function Loan_bk() {

    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;

    // Get user loans on page load and every time the currentPage is changed
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

    // Calculate pay off date
    const calculatePayOff = (loan) => {
        let amountOfMonths = 0;
        let current_loan_amount = parseFloat(loan.loan_current_amount);
        let interest = 0;

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

        const currentMonth = new Date(loan.created_at);
        currentMonth.setMonth(new Date().getMonth() + amountOfMonths);
        return currentMonth.toLocaleDateString();
    }

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
                  <th>Auto Pay Amount</th>
                  <th>Pay Off Date</th>
              </tr>
              </thead>
              <tbody>
              {loans.map(loan =>

                  <tr>
                      <td>{loan.loanId}</td>
                      <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                      <td>${loan.loan_current_amount}</td>
                      <td>${loan.loan_origin_amount}</td>
                      <td>{loan.interest_rate}%</td>
                      { loan.loan_auto_pay === null ? (
                          <td>$0</td>
                      ) : (
                          <td>${loan.loan_auto_pay}</td>
                      )
                      }
                      { parseFloat(loan.loan_auto_pay) === 0 || loan.loan_auto_pay === null ? (
                            <td>N/A</td>
                        ) : (
                            <td>{calculatePayOff(loan)}</td>
                        )
                      }
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
