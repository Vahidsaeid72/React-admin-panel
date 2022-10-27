import { useEffect } from "react";
//title safe haye maro taeein mikone
const useTitle = (title) => {
  useEffect(() => {
    document.title = `پنل ادمین | ${title}`;
  }, [title]);
};
export default useTitle;
