/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react"


const ItemCount = ({ inicial ,stock, funcionAgregar }) => {
  
           const [contador, setContador] = useState(1);

           const incrementar = () => {
                      if(contador<stock){
                                 setContador(contador + 1)
                      }
           }

           const decrementar = () =>{
                      if(contador > inicial){
                                 setContador(contador - 1)
                      }
           }
  
           return (
                      <>
                      <div className="d-flex p-3 justify-content-evenly bg-light text-dark my-3">
                                 <button  onClick={()=>decrementar()} className="btn btn-danger mx-4">-</button>
                                            <p className="fs-3 ">{contador}</p>
                                 <button onClick={()=>incrementar()} className="btn btn-success mx-4">+</button>
                      </div>
                      <div className="d-grid gap-2">
                                 <button className="btn btn-dark btn-lg " onClick={()=> funcionAgregar(contador) } >Agregar al carrito</button>
                      </div>
                      </>
  )
}

export default ItemCount