import React from "react";

const Avatar = () => {
  return (
    <>
      <div className="pt-1 pb-2 d-flex flex-column avatar_li position-relative mb-2 sidebar_items">
        <span className="avatar_box">
          <img
            className="w-100 rounded-circle"
            src="/assets/images/avatar/user2.jpg"
            alt=""
          />
        </span>
        <div className="sidebar_avatar_name text-center hiddenable">
          وحید سعید
        </div>
      </div>
    </>
  );
};

export default Avatar;
