import { Container, Nav, Navbar } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import './assets/Header.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartCount = useSelector(state => state.cart.items.reduce( (total, item) => total + item.quantity, 0));
  
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
        <Nav className="ms-auto">
          <Link to="/" className="nav-link">Products</Link>
          <Link to="/cart" className="nav-link cart">
            <BsCart size={18} />
            <span className="cart-badge">{cartCount ? cartCount : 0}</span>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;