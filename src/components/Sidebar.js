import React, { useState } from 'react';
import '../style.css';
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faChartBar,  faChartLine, faDatabase } from '@fortawesome/free-solid-svg-icons';


  

const Sidebar = ({ activeItem, handleItemClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav className="sidebar">
      <div className="logo">
        <img src="/logopHSync.png" alt="Logo" />pHSync
      </div>
      <ul>
        <li className={activeItem === 'Beranda' ? 'active' : ''} onClick={() => handleItemClick('Beranda')}>
        <NavLink to="/beranda" activeClassName="active">
            <FontAwesomeIcon icon={faHome} /> Beranda
            </NavLink>
        </li>
            <li className="dropdown" onClick={() => setShowDropdown(!showDropdown)} activeClassName="active">
            <Dropdown show={showDropdown} onToggle={() => {}}>
              <Dropdown.Toggle as="a" variant="secondary" id="dropdown-basic">
                <FontAwesomeIcon icon={faDatabase} /> Data Pengukuran
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                  <NavLink to="/datapengukuran" className={activeItem === 'DataPengukuran' ? 'active' : ''} onClick={() => handleItemClick('DataPengukuran')}>
                    <FontAwesomeIcon icon={faChartBar} /> Data Tabel
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                  <NavLink to="/grafikpengukuran" className={activeItem === 'GrafikPengukuran' ? 'active' : ''} onClick={() => handleItemClick('GrafikPengukuran')}>
                    <FontAwesomeIcon icon={faChartLine} /> Data Grafik
                  </NavLink>
                </Dropdown.Item>
                {/* <Dropdown.Item onClick={(e) => e.stopPropagation()}>
                  <NavLink to="/dataThings" className={activeItem === 'DataThings' ? 'active' : ''} onClick={() => handleItemClick('DataThings')}>
                    <FontAwesomeIcon icon={faChartLine} /> Data Thingspeak
                  </NavLink>
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;