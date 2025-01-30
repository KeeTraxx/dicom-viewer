import { NavLink } from "react-router"
import "./Nav.css"

function Nav() {

  return (
    <>
      <header>
        <nav>
          <svg width="64" height="64" viewBox="-32 -32 64 64">
            <text>DICOM DEMO</text>
          </svg>
          <ul>
            <li>
              <NavLink to="/">Patients</NavLink>
            </li>
            <li>
              <NavLink to="/upload">Upload</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Nav
