/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
 
 import { Link } from "react-router-dom"

import { useState, useContext } from "react"
import ItemCount from "../ItemCount/ItemCount"

import { CarritoContext } from "../../context/CarritoContext"
import Swal from "sweetalert2";



const ItemDetail = ({id,nombre,precio,img, stock}) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0)
  const {agregarAlCarrito} = useContext(CarritoContext)


  const manejadorCantidad = (cantidad) =>{
        setAgregarCantidad(cantidad)          

          const item = {id, nombre, precio, img}
            
          agregarAlCarrito(item, cantidad)

          Swal.fire({
            position: "center-end",
            icon: "success",
            title: `${cantidad} ${nombre} Agregado al carrito`,
            showConfirmButton: false,
            timer: 1500
          });
         

  }


  return (    
           <>
           <div className=" mb-3 mx-3 p-5 ">
                                <div className="row g-0">
                                            <div className="col-md-6">
                                              <img src={img}  className="img-fluid rounded-start mx-auto w-50" alt={nombre} />                                              
                                            </div>
                                              <div className="col-md-6">                     
                                                    <div className="card-header"> ID: {id} </div>
                                                    <h3 className="card-title">Nombre:  {nombre}</h3>
                                                    <p className="card-text fs-1"> Precio: ${precio}.</p>                                            
                                                    <p>Stock:  {stock} </p>
                                                    <p className="card-text fs-6 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                                    Eius vel iusto laboriosam accusantium sint nam sunt quidem!</p>
                                                    
                                                {
                                                  agregarCantidad > 0 ? (<Link className="btn btn-warning fw-bold fs-3 p-2" to="/cart"> Terminar compra</Link>): (<ItemCount  inicial = {1}  stock={stock} funcionAgregar = {manejadorCantidad} /> )
                                                }

                                          </div>    
                            </div>
           </div>
           </>
  )
}

export default ItemDetail