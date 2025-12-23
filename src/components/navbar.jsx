import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Image,
  Badge,
  InputGroup,
  Dropdown,
  Offcanvas,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Appname from "./NameContext";
import logo from "../assets/react.svg";

import {
  Search,
  Cart3,
  Truck,
  Sun,
  Moon,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router";

function NavbarFinal() {
  const [name] = useContext(Appname);
  const [theme, setTheme] = useState("light");
    return (<>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg={theme}
        variant={theme}
        className="shadow-sm py-3"
        sticky="top"
      >
        <Container fluid className="px-4">
          {/* Brand/Logo */}
          <Navbar.Brand
            as={Link}
            to={"/"}
            className="d-flex align-items-center fw-bold fs-4 me-lg-4"
          >
            <Image
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top me-2"
              alt="Logo"
            />
            {name}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            {/* Centered navigation links */}
            <Nav className="ms-5 gap-3">
              <Nav.Link
                as={Link}
                to="/collections"
                className="fw-semibold text-uppercase "
              >
                Collections
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/services"
                className="fw-semibold text-uppercase "
              >
                Services
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contactus"
                className="fw-semibold text-uppercase "
              >
                Contact Us
              </Nav.Link>
            </Nav>
            {/* Right-aligned content */}
            <Nav className="ms-auto align-items-center gap-3 flex-row">
              <Button
                variant="success"
                href="tel:+919818002047"
              >
                Call Now
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default NavbarFinal;
