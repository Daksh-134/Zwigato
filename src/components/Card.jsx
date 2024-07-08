import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
  let data = useCart();
  const dispatch = useDispatchCart();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let foodItem = props.item;
  let options = props.options;
  let priceOptions = Object.keys(options);
  // const navigate = useNavigate()
  // const handleClick = () => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    let food = []
    console.log(size)
    console.log(foodItem)
    console.log(data)
    for (const item of data) {
      if (item.id==foodItem._id && item.size==size) {
          food = item;
          break;
      }
    }
    if (food.length!==0) {
      if (food.size==size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty,size:size})
        console.log("update")
        return
      }
      else if (food.size!=foodItem.size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    console.log("Add")
    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  let finalPrice = qty * parseInt(options[size]);
  return (
    <div className="card mt-3" style={{ width: "16rem", height: "360px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.foodName}</h5>
        <div className='container w-100 p-0' style={{ height: "38px" }}>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange={handleQty}>
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              );
            })}
          </select>
          <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange={handleOptions}>
            {priceOptions.map((i) => {
              return <option key={i} value={i}>{i}</option>;
            })}
          </select>
          <div className='fs-6'>
            ₹{finalPrice}/-
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <hr />
          <button className="btn btn-success w-100" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}