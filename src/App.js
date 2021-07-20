import { useState, useEffect } from 'react';
import DeliveryList from './components/DeliveryList';
import Filters from './components/Filters';
import './App.css';

function App() {
  const [deliveries, setDeliveries] = useState([]);
  const [status, setStatus] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showToday, setShowToday] = useState(false);
  const [count, setCount] = useState({});

  const today = '2021-07-16';

  const filterByStatus = () => {
    if (showToday && status.length > 0) {
      const data = deliveries?.filter((item) => {
        return status?.includes(item.status) & (item.date === today);
      });

      setFilteredData(data);
    } else if (showToday) {
      const data = deliveries?.filter((item) => {
        return item.date === today;
      });

      setFilteredData(data);
    } else {
      const data = deliveries?.filter((item) => {
        return status?.includes(item.status);
      });

      setFilteredData(data);
    }
  };

  const countEntries = (array) => {
    const statusCount = array.map((item) => item.status);
    const counter = statusCount.reduce(function (previous, current) {
      previous[current] = (previous[current] || 0) + 1;
      return previous;
    }, {});
    setCount(counter);
  };

  const options = deliveries?.map((delivery) => delivery.status);
  // Because using Set deletes the dupliaces of an array and returns an object
  // We need to turn it back to an array
  // const uniqueOptions = new Set(options);
  // const transformOptions = [...uniqueOptions];
  //
  // This is a simpler way to do the same that is above
  const uniqueOptions = [...new Set(options)];

  const onCheckedValue = (e) => {
    if (e.target.checked === true) {
      const newStatus = status?.concat(e.target.value);
      setStatus(newStatus);
    } else {
      const newStatus = status?.filter((item) => item !== e.target.value);
      setStatus(newStatus);
    }
  };

  const getData = async () => {
    const res = await fetch('./data/deliveries.json');
    const data = await res.json();
    setDeliveries(data.deliveries);
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  useEffect(() => {
    filterByStatus();

    return () => {};
  }, [showToday, status]);

  useEffect(() => {
    if (showToday === true || status.length > 0) {
      countEntries(filteredData);
    } else {
      countEntries(deliveries);
    }
    return () => {};
  }, [showToday, status, filteredData, deliveries]);

  return (
    <div className='home-container'>
      <Filters
        data={uniqueOptions}
        showToday={showToday}
        setShowToday={setShowToday}
        onCheckedValue={onCheckedValue}
      />

      <table className='padding-container'>
        <caption>List of deliveries</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {status.length > 0 || showToday
            ? filteredData?.map((delivery, index) => {
                return <DeliveryList key={index} data={delivery} />;
              })
            : deliveries?.map((delivery, index) => {
                return <DeliveryList key={index} data={delivery} />;
              })}
        </tbody>
      </table>
      <div className='padding-container'>
        <h3>Values count</h3>
        <div>
          {Object?.entries(count)?.map((item, index) => {
            return (
              <div key={index}>
                <span>{item[0]}: </span>
                <span>{item[1]}</span>
              </div>
            );
          })}
          <span>
            Total:{' '}
            {showToday === true || status.length > 0
              ? filteredData.length
              : deliveries.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
