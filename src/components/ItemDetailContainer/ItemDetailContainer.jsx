/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
// import { getUnProducto } from "../../Asyincmock"
import ItemDetail from "../ItemDetail/ItemDetail" 
import { useParams } from "react-router-dom"

import { db } from "../../services/config"
import { doc,  getDoc } from "firebase/firestore"


const ItemDetailContainer = () => {
  
           const [producto, setProducto] = useState(null)

           const {idItem} = useParams();
  
           useEffect(() => {
             const nuevoDoc = doc(db, "productos", idItem);
                         
             getDoc(nuevoDoc)     
                        .then(res=>{
                                   const data = res.data()             
                                   const nuevoProducto = {id: res.id,...data}
                                   setProducto(nuevoProducto)
                        })                      
                        .catch((e)=>console.log("Error al buscar el producto en la base de datos: ", e))           
             
           }, [idItem])
            
           

           return (
                      <div>
                                 <ItemDetail {...producto} />
                      </div>
           )
}


export default ItemDetailContainer