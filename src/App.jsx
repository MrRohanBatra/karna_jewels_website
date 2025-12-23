import { createContext, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavbarFinal from "./components/navbar";
import "bootstrap-icons/font/bootstrap-icons.css";
import Appname from "./components/NameContext";
import Home from "./components/Home";

export const themeContext = createContext(null);
export const cartContext = createContext([]);
import { AnimatePresence, motion } from "framer-motion";
import Collections from "./components/Collection";
import { Routes, Route } from "react-router-dom";
import CollectionItem from "./components/Display";
import Seller from "./components/Seller";
import Under from "./components/UnderDevelopment";
function App_home() {
  const [name, setName] = useState("Ear Studio");
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
                  path="/display/:id"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <CollectionItem></CollectionItem>
                    </motion.div>
                  }
                />
                <Route path="/admin" element={<Seller></Seller>}></Route>
                {/* <Route
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
                /> */}
                <Route
                  path="/collections"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                    <Collections></Collections>
                    </motion.div>
                  }
                />
                <Route path="*" element={<Under></Under>}></Route>
        </Routes>
            </AnimatePresence>
          </Appname.Provider>
      );
}

export default App_home;
