/* eslint-disable react/prop-types */
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import Swal from "sweetalert2";
import "./CarItemStyle.css"  
import { Link  } from "react-router-dom"

const CartItem = ({item, cantidad}) => {
  const { eliminarProducto } = useContext(CarritoContext);
    

  return (

    <div className="card cardItem m-2 my-2" >
      <div className="card-body">
      <Link to={`/item/${item.id}`} >  <img src={item.img}  className="card-img-top img-fluid rounded mx-auto w-75" alt={item.nombre} /> </Link>
        <h3 className="card-title"> {item.nombre}  </h3>
        <p className="card-text"> Cantidad: {cantidad} </p>
        <p className="fw-bold"> Precio: {item.precio} </p>                
        </div>
        <div className="card-footer text-body-secondary">          
          <button className="btn btn-outline-danger" onClick={()=>                           
              Swal.fire({
                title: `Eliminar el producto ${item.nombre}? `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar!"                
              }).then((result) => {                            
                if (result.isConfirmed) {
                    eliminarProducto(item.id)                             
                    Swal.fire({
                        title: `Producto ${item.nombre} Eliminado!`,
                        text: "el Producto ha sido eliminado ",
                        icon: "success",
                        timer: 1400,
                        timerProgressBar: true,
                      });
                }
              })   
            }
            > Eliminar Producto </button>
        </div>
    </div>  

  )
}


export default CartItem