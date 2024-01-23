/* eslint-disable react/prop-types */
import Item  from "../Item/Item"

const ItemList = ({productos}) => {
  return (

               <div className="row row-cols-1 row-cols-md-3 g-4 ">

                      { productos.map( prod => <Item key={prod.id} {...prod} /> )  }

               </div>

  )
}

export default ItemList