import CartWidget from "../CartWidget/CartWidget"
import { Link , NavLink  } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
           <nav className="navbar navbar-expand-lg  bg-info border-bottom border-body fixed-top ">
           <div className="container-fluid">
           
                      <Link to="/" className="navbar-brand">
                          Tienda El Ramblón
                      </Link>

                      <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                      </button>

           <div className="collapse navbar-collapse " id="navbarNav">
                      <ul className="navbar-nav ms-auto ">

                                 <li className="nav-item">
                                          <NavLink to="/categoria/1" className="nav-link">
                                              Pantalones
                                          </NavLink>
                                 </li>

                                 <li className="nav-item">
                                        <NavLink to="/categoria/2" className="nav-link">
                                            Remeras y Camisas
                                         </NavLink>
                                 </li>
                                 <li className="nav-item">
                                      <NavLink to="/categoria/3" className="nav-link">
                                            Seguridad Ind
                                        </NavLink>
                                 </li>                      
                      </ul>
           </div>
                      <CartWidget />
           </div>
           </nav>
    </div>
  )
}

export default NavBar