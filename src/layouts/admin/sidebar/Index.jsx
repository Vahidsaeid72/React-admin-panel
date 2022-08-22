import { useContext } from "react";
import { AdminContext } from "../../../context/adminLayoutContext";
import Avatar from "./Avatar";
import SidebarItem from "./SidebarItem";
import SidebarGroupItems from "./SidebarGroupItems";

const Index = () => {
  const { showSidebar } = useContext(AdminContext);

  return (
    <div>
      <section id="sidebar_section">
        <div
          className={`mini_sidebar collapsedd bg-dark h-100 ${
            showSidebar ? "expanded" : null
          }`}
        >
          <div className="p-0 m-0">
            <Avatar />
            <SidebarItem
              pagePath="/"
              icon={"fas fa-tachometer-alt"}
              content={"داشبورد"}
            />
            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"فروشگاه"} />
            <SidebarItem
              pagePath="/Category"
              icon={"fas fa-stream"}
              content={"مدیریت گروه محصول"}
            />
            <SidebarItem
              pagePath="/Product"
              icon={"fas fa-cube"}
              content={"مدیریت محصول"}
            />
            <SidebarItem
              pagePath="/Brands"
              icon={"fas fa-copyright"}
              content={"مدیریت برند ها"}
            />
            <SidebarItem
              pagePath="/Guarantes"
              icon={"fab fa-pagelines"}
              content={"مدیریت گارانتی ها"}
            />
            <SidebarItem
              pagePath="/colors"
              icon={"fas fa-palette"}
              content={"مدیریت رنگ ها"}
            />
            <SidebarItem
              pagePath="/Discounts"
              icon={"fas fa-percentage"}
              content={"مدیریت تخفیف ها"}
            />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"سفارشات و سبد"} />
            <SidebarItem
              pagePath="/Carts"
              icon={"fas fa-shopping-basket"}
              content={"مدیریت سبد ها"}
            />
            <SidebarItem
              pagePath="/Orders"
              icon={"fas fa-luggage-cart"}
              content={"مدیریت سفارشات"}
            />
            <SidebarItem
              pagePath="/Deliverys"
              icon={"fas fa-truck-loading"}
              content={"مدیریت نحوه ارسال"}
            />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"سفارشات و سکاربران و همکاران"} />
            <SidebarItem
              pagePath="/Users"
              icon={"fas fa-users"}
              content={"مشاهده کاربران"}
            />
            <SidebarItem
              pagePath="/Roles"
              icon={"fas fa-user-tag"}
              content={"نقش ها"}
            />
            <SidebarItem
              pagePath="/Permissions"
              icon={"fas fa-shield-alt"}
              content={"مجوز ها"}
            />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"ارتباطات"} />
            <SidebarItem
              pagePath="/Questions"
              icon={"fas fa-question-circle"}
              content={"سوال ها"}
            />
            <SidebarItem
              pagePath="/Comments"
              icon={"fas fa-comment"}
              content={"نظرات"}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
