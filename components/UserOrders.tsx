"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {useSession } from "next-auth/react";
const UserOrders = () => {
  const { data: session }: any = useSession();

  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [userid, setUid] = useState<string>("");

  

  // const userEmail = "barrykage@gmail.com"//session?.user?.email; // Change this to the email you want to filter by
  // console.log(userEmail)
  useEffect(() => {
    if (session?.user?.email) {
      fetchUser();
    }
  }, [session]);
  
  const fetchUser = async () => {
    const userEmail = session?.user?.email;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
    const data = await response.json();
    const filtered = data.find((user: User) => user.email === userEmail);
    if (filtered) setUid(filtered.id);
  };

  useEffect(() => {
    // Only fetch orders if userid is available
    if (userid) {
      const fetchOrders = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`);
        const data = await response.json();
        setOrders(data);

        // Filter orders by the user ID
        const filtered = data.filter((order: Order) => order.userId === userid);
        console.log(userid)
        setFilteredOrders(filtered);
      };

      fetchOrders();
    }
  }, [userid]); // Trigger this effect when userid changes

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 ">
      <h1 className="text-3xl font-semibold text-center mb-5">User Orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-md table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Order ID</th>
              <th>Name and country</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order?.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>

                  <td>
                    <div>
                      <p className="font-bold">#{order?.id}</p>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center gap-5">
                      <div>
                        <div className="font-bold">{order?.name}</div>
                        <div className="text-sm opacity-50">{order?.country}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="badge badge-success text-white badge-sm">
                      {order?.status}
                    </span>
                  </td>

                  <td>
                    <p>${order?.total}</p>
                  </td>

                  <td>{new Date(Date.parse(order?.dateTime)).toDateString()}</td>
                  <th>
                    <Link
                      href={`/orders/${order?.id}`}
                      className="btn btn-ghost btn-xs"
                    >
                      details
                    </Link>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  No orders found for this user.
                </td>
              </tr>
            )}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>Name and country</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Date</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UserOrders;
    