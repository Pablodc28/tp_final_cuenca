/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
import { getProductos, getProductosPorCategoria } from "../../Asyincmock"
import { useParams } from "react-router-dom"


const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const {idCategoria} = useParams();
            

  useEffect( () => {          
      const funcionProductos = idCategoria ? getProductosPorCategoria: getProductos;
        
        funcionProductos(idCategoria)
              .then(res => setProductos(res))
              .catch(err => console.log(err));

  }, [idCategoria] ) 



  return (
    <>
        <div className="mx-3  mb-2 p-2 fs-3 text-black-50"> 
            Productos:
        </div>

          <div className="m-3">
              <ItemList productos={productos}/>
            </div>
            
     
      </>

  )
}

export default ItemListContainer