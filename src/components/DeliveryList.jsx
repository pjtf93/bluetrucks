import React from 'react';

const DeliveryList = ({ data }) => {
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.phone}</td>
      <td>{data.address}</td>
      <td>{data.date}</td>
      <td>{data.status}</td>
    </tr>
  );
};

export default DeliveryList;
