import { FC, useEffect, useState } from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

const TopNav: FC = () => {
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
    <Navbar color="warning" expand="md" fixed="top" id="main-menu">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href="/" className={`h4 ${setActive("/")}`}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contacts" className={`h4 ${setActive("/contacts")}`}>
            Contacts
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about" className={`h4 ${setActive("/about")}`}>
            About
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
