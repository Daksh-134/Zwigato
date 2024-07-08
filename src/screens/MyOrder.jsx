import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Nav';

export default function MyOrder() {

    const [orderData, setorderData] = useState({})
    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://zwigato-4ipy.onrender.com/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            setorderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData.size!==0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                            // Reverse the array because we want latest data at the top
                                data.orderData.order_data.slice(0).reverse().map((item,idx) => {
                                    return (
                                        item.map((arrayData,key) => {
                                            return (
                                                <div key={`${idx}-${key}`}>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5' key={`${idx}-${key}-date`}> 
                                                        {data = arrayData.Order_date}
                                                        {/*If date exists then return the date else return the data*/}
                                                        <hr />
                                                    </div> :
                                                        <div className='col-12 col-md-6 col-lg-3' key={`${idx}-${key}-card`}>
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>
            </div>
            <Footer />
        </div>
    )
}