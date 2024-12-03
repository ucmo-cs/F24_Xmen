import './App.css';
import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan from './pages/Loan_bk';
import Login from './pages/Login';
import Admin from './pages/Admin';
import LoanDetail from './pages/LoanDetail';
import { useEffect, useState } from "react";

function App() {
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch user authentication status
        fetch("http://localhost:8081/user/account", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    setIsAuthenticated(false); // User not authenticated
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (data) {
                    setIsAuthenticated(true); // User authenticated
                }
            })
            .catch((error) => {
                console.error("Error fetching authentication data:", error);
                setIsAuthenticated(false); // Handle fetch error
            });
    }, []);

    useEffect(() => {
        // Fetch admin status if authenticated
        fetch("http://localhost:8081/user/checkAdmin", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (!res.ok) {
                    setIsAdmin(false);
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                console.log("Admin Data:", data);
                if (data !== null) {
                    setIsAdmin(data); // true or false based on admin status
                }
                else{
                    setIsAdmin(false);
                }
            })
            .catch((error) => console.error("Error fetching admin data:", error));
        setIsLoading(false);
        console.log("User Authenticated: ", isAuthenticated);
        console.log("User is Admin: ", isAdmin);
    }, [isAuthenticated, isAdmin]);

    // Prevent page from loading before the authentication is validated
    if(isLoading){
        return <div>Loading...</div>;
    }

    if(isAuthenticated != null && isAdmin != null)
    return (
        <div>
            <Header />
            <Routes>
                {!isAuthenticated ? (
                    <>
                        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </>
                ) : isAdmin ? (
                    <>
                        <Route path="/loanForm" element={<SaveLoan />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/loan/:loanId" element={<LoanDetail />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/loan" element={<Loan />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="*" element={<Navigate to="/loan" replace />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
