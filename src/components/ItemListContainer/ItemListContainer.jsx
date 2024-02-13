/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList"
// import { getProductos, getProductosPorCategoria } from "../../Asyincmock"
import { useParams } from "react-router-dom"

 import { db } from "../../services/config"
 import { collection, getDocs, where, query } from "firebase/firestore"


const ItemListContainer = () => {

  const [productos, setProductos] = useState([]);
  const {idCategoria} = useParams();
             

   useEffect(() => {
      const misProductos = idCategoria? query(collection(db,"productos"), where("idCat", "==", idCategoria)):collection(db,"productos")
   
      getDocs(misProductos) 
      .then(res =>{
        const nuevosProductos = res.docs.map(doc=>{
            const data = doc.data()  
            return {id: doc.id, ...data}
        })
        setProductos(nuevosProductos)
      })
      .catch(error => console.log(error))

   }, [idCategoria])
    



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