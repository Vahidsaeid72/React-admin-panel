import httpServices from './httpServices'

export const getAllBrandsService = ()=>{
    return httpServices("/admin/brands","get")
}

export const addNewBrandService = (data) => {
    if (data.logo) {
      let formdata = new FormData();
      formdata.append("original_name", data.original_name);
      formdata.append("persian_name", data.persian_name);
      formdata.append("descriptions", data.descriptions);
      formdata.append("logo", data.logo);
      data = formdata;
    }
    return httpServices("/admin/brands", "post", data);
};

  export const deleteBrandService = (id)=>{
    return httpServices(`/admin/brands/${id}`,"delete")
}

export const editBrandService =(brandId , data)=>{
  if(data.logo){
    let formdata = new FormData();
    formdata.append("original_name",data.original_name);
    formdata.append("persian_name",data.persian_name);
    formdata.append("descriptions",data.descriptions);
    formdata.append("logo",data.logo);
    data = formdata;
    }
  return httpServices(`/admin/brands/${brandId}`,`post`, data)
}