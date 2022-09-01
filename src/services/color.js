import httpServices from './httpServices'

export const getAllColorsService = ()=>{
    return httpServices("/admin/colors","get")
}

export const addNewColorService = (data) => {
    return httpServices("/admin/colors", "post", data);
};

  export const deleteColorService = (colorId)=>{
    return httpServices(`/admin/colors/${colorId}`,"delete")
}

export const editColorService =(colorId , data)=>{
    return httpServices(`/admin/colors/${colorId}`,`put`, data)
}