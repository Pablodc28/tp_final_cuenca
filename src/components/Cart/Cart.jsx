import CartItem from "../CartItem/CartItem";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import Swal from "sweetalert2";


const Cart = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);



    if (cantidadTotal === 0) {
        return (
            <>
            <div  className="container my-2 ">
                <h2>No hay productos en el carrito</h2>
                <Link className="btn btn-primary my-4" to="/"> Ver Productos... </Link>
            </div>
            </>
        )
    }
    return (

           <div  className="container my-2 row ">
               
               
               {
                   carrito.map(prod =>                         
                            <CartItem  key={prod.id} {...prod}                         
                    />)
               }
                
                
               <hr />
               <h3> Total:$ {total}  </h3>
               <hr />
               
               <div className="row justify-content-evenly">
                    <div className="col-8">                        
                        <Link className="btn btn-success w-75 btn-lg" to="/checkout"> Finalizar Compra </Link>
                    </div>
                    <div className="col-4">

                        <button className="btn btn-outline-danger" onClick={()=>                         
                            Swal.fire({
                            title: "Eliminar todo el carrito?",
                            // icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Si, Eliminar!"
                            
                          }).then((result) => {                            
                            if (result.isConfirmed) {
                                vaciarCarrito()                                                              
                                Swal.fire({
                                    title: "Carrito Eliminado!",
                                    text: "Su carrito ha sido eliminado ",
                                    icon: "success",
                                    timer: 1600,
                                    timerProgressBar: true,
                                  });
                            }
                          })                        
                        
                        }
                            
                            > Vaciar Carrito </button>

                    </div>
                </div>

           </div>
       )
}

export default Cart