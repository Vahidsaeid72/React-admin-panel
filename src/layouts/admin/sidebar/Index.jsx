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
            <SidebarItem icon={"fas fa-tachometer-alt"} content={"داشبورد"} />
            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"فروشگاه"} />
            <SidebarItem icon={"fas fa-stream"} content={"مدیریت گروه محصول"} />
            <SidebarItem icon={"fas fa-cube"} content={"مدیریت محصول"} />
            <SidebarItem icon={"fas fa-copyright"} content={"مدیریت برند ها"} />
            <SidebarItem
              icon={"fab fa-pagelines"}
              content={"مدیریت گارانتی ها"}
            />
            <SidebarItem icon={"fas fa-palette"} content={"مدیریت رنگ ها"} />
            <SidebarItem
              icon={"fas fa-percentage"}
              content={"مدیریت تخفیف ها"}
            />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"سفارشات و سبد"} />
            <SidebarItem
              icon={"fas fa-shopping-basket"}
              content={"مدیریت سبد ها"}
            />
            <SidebarItem
              icon={"fas fa-luggage-cart"}
              content={"مدیریت سفارشات"}
            />
            <SidebarItem
              icon={"fas fa-truck-loading"}
              content={"مدیریت نحوه ارسال"}
            />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"سفارشات و سکاربران و همکاران"} />
            <SidebarItem icon={"fas fa-users"} content={"مشاهده کاربران"} />
            <SidebarItem icon={"fas fa-user-tag"} content={"نقش ها"} />
            <SidebarItem icon={"fas fa-shield-alt"} content={"مجوز ها"} />

            {/* <!-- =================================== --> */}
            <SidebarGroupItems title={"ارتباطات"} />
            <SidebarItem icon={"fas fa-question-circle"} content={"سوال ها"} />
            <SidebarItem icon={"fas fa-comment"} content={"نظرات"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
