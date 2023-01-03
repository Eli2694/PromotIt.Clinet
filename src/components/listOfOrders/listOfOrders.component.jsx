import { useAuth0 } from '@auth0/auth0-react';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { RoleContext } from '../../context/role.context';
import {
  ConfirmOrder,
  getOrdersOfMyProduct,
} from '../../services/Business.services';
import { ListOfOrdersRow } from '../listOfOrdersRow/listOfOrdersRow.component';

export const ListOfOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth0();
  const { role } = useContext(RoleContext);

  const ListOfOrders = async () => {
    let Email = user.email;
    let orders = await getOrdersOfMyProduct(Email);
    setOrders(orders);
  };

  useEffect(() => {
    ListOfOrders();
  }, []);

  const handleConfirmations = async (orderId) => {
    let Email = user.email;
    await ConfirmOrder(orderId, Email);
    let listOfOrders = orders.filter((order) => order.orderID !== orderId);
    setOrders(listOfOrders);
  };

  if (role.find((role) => role.name === 'BusinessRepresentative')) {
    return (
      <>
        <h1>List Of Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Country</th>
              <th>City</th>
              <th>Home Address</th>
              <th>Postal Code</th>
              <th>Phone Number</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Units Left In Stock</th>
              <th>Confirm Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => {
                const {
                  orderID,
                  productId,
                  country,
                  city,
                  homeAddress,
                  postalCode,
                  phoneNumber,
                  productName,
                  unitPrice,
                  unitsInStock,
                } = order;

                return (
                  <ListOfOrdersRow
                    country={country}
                    city={city}
                    address={homeAddress}
                    postalCode={postalCode}
                    phoneNumber={phoneNumber}
                    productName={productName}
                    price={unitPrice}
                    stock={unitsInStock}
                    handleConfirm={() => handleConfirmations(orderID)}
                  ></ListOfOrdersRow>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  } else {
    <h1>User Not Authorized To Perform This Action</h1>;
  }
};
