/* eslint-disable react/prop-types */
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import Swal from "sweetalert2";


const CartItem = ({item, cantidad}) => {
  const { eliminarProducto } = useContext(CarritoContext);

    // console.log(item.id)
    // console.log(typeof(item.id))

  return (

    <div className="card w-25 m-3 my-2" >
      <div className="card-body">
      <img src={item.img}  className="card-img-top img-fluid rounded mx-auto w-75" alt={item.nombre} />
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