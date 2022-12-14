import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, content, pagePath }) => {
  return (
    <NavLink
      to={pagePath}
      className="mt-1 text-start pe-4 sidebar_menu_item sidebar_items"
    >
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap ">{content}</span>
    </NavLink>
  );
};

export default SidebarItem;
