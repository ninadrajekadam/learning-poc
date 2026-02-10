import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Card, Button, InputGroup, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getProducts } from './redux/slice';
import { addCart, removeCart } from './redux/product-slice';
import './assets/product.css';

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(s => s.products.items);
  const cart = useSelector(s => s.cart.items);
  // temp qty before add to cart
  const [tempQty, setTempQty] = useState({});

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const cartQty = id => cart.find(i => i.id === id)?.quantity || 0;
  const isInCart = id => cart.some(i => i.id === id);
  const getQty = id => {
    if (isInCart(id)) return cartQty(id);
    return tempQty[id] ?? 1;
  }
  const incTemp = id => { setTempQty(q => ({ ...q, [id]: Math.min((q[id] ?? 1) + 1, 10), })) }
  const decTemp = id => { setTempQty(q => ({ ...q, [id]: Math.max((q[id] ?? 1) - 1, 1), })) }

  return (
    <Container className="product-container">
      <h4>Product List</h4>
      <Row>
        {products?.map(p => {
          const qty = getQty(p.id);
          const inCart = isInCart(p.id);
          
          return (
            <Col md={3} key={p.id} className="mb-4">
              <Card className="h-100">
                <Card.Img src={p.thumbnail} />
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text className="text-truncate">
                    {p.description}
                  </Card.Text>
                  <Card.Title>₹ {p.price}</Card.Title>
                  <Row>
                    <Col md={6}>
                      <InputGroup className="border rounded">
                        <Button
                          variant="light"
                          disabled={getQty(p.id) === 1}
                          onClick={() => {
                            if (inCart) {
                              dispatch(removeCart(p));
                            } else {
                              decTemp(p.id);
                            }
                          }}
                        >
                          {" "}
                          -{" "}
                        </Button>
                        <Form.Control
                          value={qty}
                          className="border-0 text-center"
                          readOnly
                        />
                        <Button
                          variant="light"
                          disabled={getQty(p.id) === 10}
                          onClick={() => {
                            if (inCart) {
                              dispatch(addCart(p));
                            } else {
                              incTemp(p.id);
                            }
                          }}
                        >
                          {" "}
                          +{" "}
                        </Button>
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <Button
                        className="w-100"
                        variant="outline-primary"
                        onClick={() => {
                          dispatch(addCart({ ...p, qty: getQty(p.id) }));
                        }}
                      > Add to Cart </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
export default Product;