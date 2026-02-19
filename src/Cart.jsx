import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "./redux/product-slice";

const Cart = () => {	
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  
  return (
    <>
      <Container>
        {
          cartItems && cartItems.map((item) => (
            <>
              <div className="d-flex justify-content-between border-bottom mb-2 px-3">
                <h4>Cart Items</h4>
                <h6 className="float-end">{cartItems.length} items</h6>
              </div>
              <Row className="align-items-center border-bottom py-3" key={item.id}>
                <Col md={1}>
                  <img src={item.thumbnail} alt={item.title} width="100" />
                </Col>
                <Col md={9}>
                  <h5>{item.title}</h5>
                  <p>{item.brand}</p>
                </Col>
                <Col md={2} className="text-end">
                  <h6>Qty: {item.quantity}</h6>
                  <h6 className="original-price">Price: {item.price}</h6>
                  <h6 className="total-price">Total: {(item.price * item.quantity).toFixed(2)}</h6>
                  <Button onClick={() => dispatch(removeCart(item))} variant="outline-danger">Remove</Button>
                </Col>
              </Row>
              <div className="text-end pt-3">
                <h4>Total:{" "}{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</h4>
              </div>
            </>
          ))
        }
        { cartItems.length === 0 && <h1 className="text-center mt-5">Your Cart is Empty</h1> }
      </Container>
    </>
  );
}
export default Cart;