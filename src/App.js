import React from 'react';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import User from "./pages/User";
import NotFound from './pages/NotFound';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Alert from "./components/layout/Alert";
import {GithubProvider} from './context/github/GithubContext';
import {AlertProvider} from './context/alert/AlertContext';



function App() {

  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className='container mx-auto px-3 pb-12'>
              <Alert />
              <Routes>
                <Route path='/gihub-finder-plus/' element={<Home />} />
                <Route path='/gihub-finder-plus/about' element={<About />} />
                <Route path='/gihub-finder-plus/user/:login' element={<User />} />
                <Route path='/gihub-finder-plus/notfound' element={<NotFound />} />
                <Route path='/gihub-finder-plus/*' element={<NotFound />} />
              </Routes>  
            </main>
            <Footer />
          </div>
        </Router>
       </AlertProvider>
    </GithubProvider>
  );
}

export default App;
