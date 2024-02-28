
// import React, { useState,useRef, useEffect } from "react";
// import { useDispatchCart, useCart } from "./ContextReducer";

// export default function Card(props) {

//     let data = useCart
//     const priceRef = useRef();
//     let dispatch=useDispatchCart()
//     let options= props.options
//     let priceOptions =Object.keys(options)
//     const [ qty,setQty]=useState(1)
//     const [size,setSize]=useState("")
  
  
//     const handleAddToCart= async ()=>{
//         if (!Array.isArray(data)) {
//             console.error('Cart data is not iterable or is not defined.');
//             return;
//         }
        
//         let food = []
//         for (const item of data) {
//           if (item.id ===  props.foodItem._id) {
//             food = item;
    
//             break;
//           }
//         }
//         if (food !== []) {
//             if (food.size === size) {
//               await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
//               return
//             }
//             else if (food.size !== size) {
//               await dispatch({ type:"ADD",id:props.foodItem._id,name:props.foodItem.name,
//               price:finalPrice,qty:qty,size:size })
//               console.log("Size different so simply ADD one more to the list")
//               return
//             }
//             return
//         }
//     await dispatch({type:"ADD", id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,
// qty:qty,
//         size:size
//     })
//     // await console.log(data)
//     }
//     let finalPrice = qty * parseInt(options[size])
//     useEffect(() => {
//         setSize(priceRef.current.value)
//       }, [])
    
//     return (
//         <div>
//             <div>
//                 <div
//                     className="card mt-3"
//                     style={{ width: " 18rem", maxHeight: "360px" }} >
//                     <img src={props.foodItem.img} className="card-img-top" alt="..."  style={{height:"140px", objectFit:"fill"}}/>
//                     <div className="card-body">
//                         <h5 className="card-title">{props.foodItem.name}</h5>
//                         {/* <p className="card-text">THIS IS SOME IMPORTANT TEXT</p> */}
//                         <div className="container w-100"></div>
//                         <select className="m-2 h-100  bg-success rounded" onChange={(e)=> setQty(e.target.value)}>
//                             {Array.from(Array(6), (e, i) => {
//                                 return (
//                                     <option key={i + 1} value={i + 1}> {i + 1}
//                                     </option>
//                                 );
//                             })}
//                         </select>
//                         <select className="m-2 h-100 bg-success rounded"  ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
//                             {/* <option key="half">Half</option>
//                             <option key="full">Full</option> */}

//                             {priceOptions.map((i)=>{
//                                 return <option key={i} value={i}>{i}</option>

//                             }
//                             )}
//                         </select>
//                         <div className="d-inline h-100 fs-5">
//                          ₹{finalPrice}/-
//                         </div>
//                         </div>
//                         <hr></hr>
//                         <button  className={`btn btn-success justify-centre ms-2`} onClick={handleAddToCart}>Add to cart</button>

//                 </div>
//             </div>
//         </div>
        
//     );
// }


import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
    const data = useCart(); // Use parentheses to call the hook function
    const priceRef = useRef();
    const dispatch = useDispatchCart();
    const options = props.options;
    const priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        // Check if data is iterable (an array), otherwise handle it appropriately
        if (!Array.isArray(data)) {
            console.error('Cart data is not iterable or is not defined.');
            return;
        }
    
        let food = []; 
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
    
        // Check if food is found and set correctly
        if (food !==0) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id:props.foodItem._id, price: finalPrice, qty: qty })
              return
            }
            else if (food.size !== size) {
              await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
              console.log("Size different so simply ADD one more to the list")
              return
            }
            return
        }
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
      
        }

        useEffect(() => {
            setSize(priceRef.current.value);
        }, []);
        
    let finalPrice = qty * parseInt(options[size]); // Ensure options[size] is defined

   

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: " 16rem", maxHeight: "360px" }}>
                    <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "fill" }} />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <div className="container w-100"></div>
                 
                        <select className="m-2 h-100 w-20 bg-success text-black rounded"   onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select className="m-2 h-100 bg-success text-black rounded "  ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((i) => (
                                <option key={i} value={i}>{i}</option>
                            ))}
                        </select>
                        <div className="d-inline  ms-2 h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                      
                        <hr />
                        <button className={`btn btn-success justify-centre ms-2`} onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
