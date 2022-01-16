import { FC, useEffect, useState } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";

const MobileMenu: FC = () => {
  const [show, setShow] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  function setActive(s: string) {
    if (s === activeLink) return "text-danger";
    else return "text-black";
  }

  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path);
  }, [window.location.pathname]);

  return (
    <div id="mobile-menu">
      <Navbar color="warning" light>
        <NavbarToggler className="me-2" onClick={() => setShow(!show)} />
        <NavbarBrand className="me-auto" href="/">
          Home
        </NavbarBrand>
      </Navbar>
      <Navbar color="warning" light>
        {show && (
          <Nav navbar>
            <NavItem>
              <NavLink href="/" className={`h4 ${setActive("/")}`}>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/contacts"
                className={`h4 ${setActive("/contacts")}`}
              >
                Contacts
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about" className={`h4 ${setActive("/about")}`}>
                About
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};

export default MobileMenu;
