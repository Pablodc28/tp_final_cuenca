/* eslint-disable react/prop-types */
import { Link  } from "react-router-dom"

const Item = ({id, nombre, precio, img}) => {
  return (
    <>
           <div className="col">
                      <div className="card  h-100">
                                            <div className="card-header">  {nombre} ID: {id} </div>
                                            <img src={img}  className="card-img-top img-fluid rounded mx-auto " alt={nombre} />
                                 <div className="card-body h-100 d-grid gap-2">                      
                                            <h3 className="card-title">Nombre:  {nombre}</h3>
                                            <p className="card-text fs-1"> Precio: ${precio}.</p>
                                            <p className="card-text fs-6 text-muted">ID: {id}</p>

                                            <Link to={`/item/${id}`} > <button className="btn btn-primary btn-lg w-75 mx-auto mt-auto" >Ver detalle</button> </Link>
                                            
                                 </div>         

                      </div>
           </div>
    </>

  )
}

export default Item