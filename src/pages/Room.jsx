import { useEffect, useState } from "react";
import { useRef } from "react";
import "./Room.css";

function Room() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const ordersContainerRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:9406/get_orders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);

        setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  },
[]);

    const handleStatusChange = async (order) => {
        order.status = !order.status;
        const response = await fetch("http://127.0.0.1:9406/update_order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
            updatedData: order.status,
          }),
        });
        if (!response.ok) {
          throw new Error("Failed to update order status");
        }
    }

  return (
    <>
      <div className="container">
        <h1>Fuddi da dhaba Orders Dashboard</h1>
        <div className="orders-container">
          <h2>Orders</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Items</th>
                <th>Time</th>
                <th>Amount</th>
                <th>C. Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                {/* <th>Status</th> */}
              </tr>
            </thead>
            <tbody ref={ordersContainerRef}>
            {isLoading && <tr><td colSpan="5">Loading Orders...</td></tr>}  
            {error && <tr><td colSpan="5">Error: {error.message}</td></tr>} 
            {!isLoading && !error && orders.map((order) => ( 
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.items}</td>
                <td>{order.time.substring(11, 16)}</td>
                <td>{order.price}</td> 
                <td>{order.name}</td>
                <td>{order.address}</td>
                <td>{order.phone_number}</td>

                {/* <td>
                    <input
                        type="checkbox"
                        checked={order.status}
                        onChange={() => handleStatusChange(order)}
                    />
                </td> */}
              </tr>
            ))} 
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Room;
