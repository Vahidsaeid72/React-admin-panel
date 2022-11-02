import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Leftcontent = () => {
  const [showMenu, setShowMenu] = useState(false);


  const handleShowMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }
  useEffect(() => {
    document.addEventListener('click', () => setShowMenu(false))
  }, [])




  return (
    <div className="left_content d-flex flex-row-reverse">
      <i
        className="fas fa-grip-vertical fa-2x me-3 pointer "
        onClick={(e) => handleShowMenu(e)}
      ></i>
      <ul
        className={` ${showMenu ? 'mini_menu toggle_myMenu' : "mini_menu"}`}
      >
        <li className="my-2 mx-3">
          <span className=" d-block text-center fw-bold fs-5">وحید سعید</span>
        </li>
        <li className="my-2 d-flex justify-content-center align-items-center px-2">
          <Link to={"/"} className="dropdown-item " onClick={() => setShowMenu(!showMenu)} href="#">
            <i className="fas fa-tachometer-alt ms-2 "> <span className="mx-3"> داشبورد</span></i>
          </Link>
        </li>
        <li className="my-2 d-flex justify-content-center align-items-center px-2">
          <Link to={"/"} className="dropdown-item " onClick={() => setShowMenu(!showMenu)} href="#">
            <i className="fas fa-paper-plane ms-2  " ><span className="mx-3">تیکت ها </span> </i>
          </Link>
        </li>
        <li className="my-2 d-flex justify-content-center align-items-center px-2">
          <Link to={"/"} className="dropdown-item " onClick={() => setShowMenu(!showMenu)} href="#">
            <i className="fas fa-envelope ms-2 "><span className="mx-3">پیام ها </span></i>
          </Link>
        </li>
        <hr />
        <li className="d-flex justify-content-center align-items-center px-2">
          <Link to={"/logout"} className="dropdown-item " onClick={() => setShowMenu(!showMenu)}>
            <i className="fas fa-power-off ms-2 "><span className="mx-3">خروج </span> </i>
          </Link>
        </li>
      </ul>
      <i className="far fa-bell fa-2x mx-3 pointer position-relative">
        <span className="alarm_count">4</span>
      </i>
      <i className="fas fa-search fa-2x mx-3 pointer"></i>
    </div>
  );
};

export default Leftcontent;
