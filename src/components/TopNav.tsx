import { FC } from "react";
import { Nav, Navbar, NavItem, NavLink } from "reactstrap";

const TopNav: FC = () => {
  return (
    <Navbar color="dark" expand="md" fixed="top">
      <Nav className="me-auto" navbar>
        <NavItem>
          <NavLink href="/">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/contacts">Contacts</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/about">About</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default TopNav;
