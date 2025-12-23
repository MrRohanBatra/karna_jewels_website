import { createContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavbarFinal from "./components/navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import Appname from "./components/NameContext";
import Home from "./components/Home";
import Search from "./components/Search";
export const themeContext = createContext(null);
export const cartContext = createContext([]);
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProductDisplay from "./components/ProductDisplay";
import Profile from "./components/Profile";
function App_home() {
  const [name, setName] = useState("My Karna Jewels");
  const location = useLocation();
  return (
    <Appname.Provider value={[name, setName]}>
      <NavbarFinal></NavbarFinal>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Home />
                    </motion.div>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <ProductDisplay />
                    </motion.div>
                  }
                />
                <Route
                  path="/profile/"
                  element={<Navigate to={"/profile/details"}></Navigate>}
                />
                <Route
                  path="/profile/:page"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Profile />
                    </motion.div>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Search />
                    </motion.div>
                  }
                />
                
              </Routes>
            </AnimatePresence>
          </Appname.Provider>
      );
}

export default App_home;
