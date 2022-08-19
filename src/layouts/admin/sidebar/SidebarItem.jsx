import React from "react";

const SidebarItem = ({ icon, content }) => {
  return (
    <a className="py-1 text-start pe-4 sidebar_menu_item sidebar_items">
      <i className={`ms-3 icon ${icon} text-light`}></i>
      <span className="hiddenable no_wrap font_08">{content}</span>
    </a>
  );
};

export default SidebarItem;
