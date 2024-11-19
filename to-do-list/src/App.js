import Home from './Page/Home';
import Signin from './Page/Signin';
import Signup from './Page/Signup';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './routes/PrivateRoute';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                    path="/" 
                    element={
                    <PrivateRoute>
                        <Home/>
                    </PrivateRoute>
                    } 
                />
                {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </BrowserRouter>
    );
}

export default App;
