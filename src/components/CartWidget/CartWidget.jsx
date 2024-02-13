/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from 'react-router-dom';


const CartWidget = () => {
        
        const { cantidadTotal } = useContext(CarritoContext);
        
        // console.log( cantidadTotal )
           return (
                        <div className="mx-5 position-relative">
                               <Link to="/cart">
                                    <i className="bi bi-basket2 fs-3">
                                        </i>
                                            {                                                
                                                cantidadTotal==0 ?"":                                                 
                                                <strong className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-dark"> {cantidadTotal} </strong>
                                            }
                                                
                                  </Link>
                        </div>  
    )

}

export default CartWidget