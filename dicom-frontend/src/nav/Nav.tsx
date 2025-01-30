import { NavLink } from "react-router"
import "./Nav.css"
import { useEffect } from "react"
import {selectAll, easeElasticOut} from "d3";

function Nav() {

  useEffect(() => {
    selectAll('nav span')
      .style('opacity', 0)
      .style('transform', 'translateX(20px)scale(2)rotate(30deg)')
      .transition()
      .ease(easeElasticOut)
      .delay((_,i) => i * 50)
      .duration(2000)
      .style('transform', null)
      .style('opacity', null);
  }, []);

  return (
    <>
      <header>
        <nav>
          <h1>
            <span>D</span>
            <span>I</span>
            <span>C</span>
            <span>O</span>
            <span>M</span>
            <span>-</span>
            <span>V</span>
            <span>I</span>
            <span>E</span>
            <span>W</span>
            <span>E</span>
            <span>R</span>
          </h1>
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
