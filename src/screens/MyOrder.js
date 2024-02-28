import { React, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

//Error as follows
//  await data.splice(0, 0, { order_date: req.body.order_date });
export default function MyOrder() {
  const [orderData, setorderData] = useState("");

  const fetchMyOrder = async () => {
    try {
        console.log(localStorage.getItem("userEmail"));
        let response = await fetch("http://localhost:5000/api/myOrderData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: localStorage.getItem("userEmail"),
            }),
        });

        if (response.ok) {
            let data = await response.json();
            setorderData(data);
        } else {
            console.error('Failed to fetch:', response.statusText);
        }
    } catch (error) {
        console.error('Error during fetch:', error.message);
    }
};


  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div>
            <div>
              <Navbar />
            </div>

            <div className="container">
              <div className="row">
                {orderData != [] ? Array(orderData).map((data) => {
                      return data.orderData
                        ? data.orderData.order_data
                            .slice(0)
                            .reverse()
                            .map((item) => {
                              return item.map((arrayData) => {
                                return (
                                  <div>
                                    {arrayData.Order_date ? (
                                      <div className="m-auto mt-5">
                                        {(data = arrayData.Order_date)}
                                        <hr />
                                      </div>
                                    ) : (
                                      <div className="col-12 col-md-6 col-lg-3">
                                        <div
                                          className="card mt-3"
                                          style={{
                                            width: "16rem",
                                            maxHeight: "360px",
                                          }}
                                        >
                                          {/* <img
                                            src={arrayData.img}
                                            className="card-img-top"
                                            alt="..."
                                            style={{
                                              height: "120px",
                                              objectFit: "fill",
                                            }}
                                          /> */}

                                          <div className="card-body">
                                            <h5 className="card-title">
                                              {arrayData.name}
                                            </h5>
                                            <div
                                              className="container w-100 p-0"
                                              style={{ height: "38px" }}
                                            >
                                              <span className="m-1">
                                                {arrayData.qty}
                                              </span>
                                              <span className="m-1">
                                                {arrayData.size}
                                              </span>
                                              <span className="m-1">
                                                {data}
                                              </span>
                                              <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                                ₹{arrayData.price}/-
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              });
                            })
                        : "";
                    })
                  : ""}
              </div>
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
