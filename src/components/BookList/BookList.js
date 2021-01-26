import React, { useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookList } from '../../features/roomsSlice/roomsSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId = useSelector((state) => state.userId);
  const bookList = useSelector((state) => state.bookList);
  useEffect(() => {
    if (token) dispatch(getUserBookList(token, userId));
  }, [dispatch, token, userId]);
  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-5" md={10}>
          {!!bookList.length && (
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Room</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((book) => (
                  <tr key={book.id}>
                    <td>{book.name}</td>
                    <td>{book.phone}</td>
                    <td className="text-capitalize">{book.room.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;
