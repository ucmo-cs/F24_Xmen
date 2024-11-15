import './App.css';
import Header from './components/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loan from './pages/Loan';
import Customer from './pages/Customer';
import SaveLoan from './pages/SaveLoan';
import Loan_bk from './pages/Loan_bk';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { useEffect, useState } from "react";

function App() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkUserAuth = async () => {
            try {
                const response = await fetch('/user/account', {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                console.log("Account Response:", response);

                if (response.ok) {
                    const user = await response.json();
                    console.log("User:", user);
                    if (user) {
                        setIsAuthenticated(true);

                        const adminResponse = await fetch('/user/checkAdmin', {
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                        });
                        console.log("Admin Response:", adminResponse);

                        if (adminResponse.ok) {
                            const isAdmin = await adminResponse.json();
                            setIsAdmin(isAdmin);
                        }
                    }
                } else {
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
        };

        checkUserAuth();
    }, []);

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
                        <Route path="/loan" element={<Loan_bk />} />
                        <Route path="/loanForm" element={<SaveLoan />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Navigate to="/admin" replace />} />
                        <Route path="*" element={<Navigate to="/admin" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/loan" element={<Loan_bk />} />
                        <Route path="/loanForm" element={<SaveLoan />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/admin" element={<Navigate to="/loan" replace />} />
                        <Route path="/login" element={<Navigate to="/loan" replace />} />
                        <Route path="*" element={<Navigate to="/loan" replace />} />
                    </>
                )}
            </Routes>
        </div>
    );
}

export default App;
