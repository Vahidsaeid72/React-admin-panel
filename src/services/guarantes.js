import httpServices from './httpServices'

export const getAllGuarantesService = ()=>{
    return httpServices("/admin/guarantees","get")
}

export const addNewGuaranteeService = (data) => {
    return httpServices("/admin/guarantees", "post", data);
};

  export const deleteGuaranteeService = (id)=>{
    return httpServices(`/admin/guarantees/${id}`,"delete")
}

export const editGuaranteeService =(guaranteeId , data)=>{
    return httpServices(`/admin/guarantees/${guaranteeId}`,`put`, data)
}