/* eslint-disable react/prop-types */

const ItemDetail = ({id,nombre,precio,img}) => {
  return (    
           <>
           <div className="col-6 m-3">
                      <div className="card  h-100">
                                            <div className="card-header"> Detalle de: {nombre},  ID: {id} </div>
                                            <img src={img}  className="card-img-top img-fluid rounded mx-auto " alt={nombre} />
                                 <div className="card-body h-100 d-grid gap-2">                      
                                            <h3 className="card-title">Nombre:  {nombre}</h3>
                                            <p className="card-text fs-1"> Precio: ${precio}.</p>
                                            <p className="card-text fs-6 text-muted">ID: {id}</p>
                                            <p className="card-text fs-3 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                            Eius vel iusto laboriosam accusantium sint nam sunt quidem, beatae inventore iure qui minus neque 
                                            temporibus suscipit tempore dolores facere quos voluptatibus!</p>
                                            
                                 </div>         

                      </div>
           </div>
           </>
  )
}

export default ItemDetail