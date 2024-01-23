import ItemListContainer from './components/ItemListContainer/ItemListContainer'
import NavBar from './components/NavBar/NavBar'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />      
          <p className='fs-2 m-4 mt-5 p-4'>Hola Bienvenido, gracias por visitar la Tienda El Ramblón</p>
        <Routes>
          <Route path="/" element={<ItemListContainer  />} />
          <Route path="/categoria/:idCategoria" element={<ItemListContainer/>} />
          <Route path="/item/:idItem" element={< ItemDetailContainer />} />        
          <Route path="*" element={<h2>Pagina no encontrada </h2>} />        
        </Routes>        
        </BrowserRouter>
    </>
  )
}

export default App