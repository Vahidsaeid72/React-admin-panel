import httpServices from './httpServices'


export const getCategoriesService = (id=null) => {
    return httpServices(`/admin/categories${id? `?parent=${id}`:""}`,'get')
}
export const getSingleCategoryService = (id) => {
    return httpServices(`/admin/categories/${id}`,'get')
}
export const createNewCategoryServis = (data) => {
    if(data.image){
        let formdata = new FormData();
        formdata.append('parent_id',data.parent_id)
        formdata.append('title',data.title)
        formdata.append('description',data.description)
        formdata.append('image',data.image)
        formdata.append('is_active',data.is_active)
        formdata.append('show_in_menu',data.show_in_menu)
        data = formdata
    }
    return httpServices(`/admin/categories`,`post`,data)
}

export const editCategoryService =(id , data)=>{
    return httpServices(`/admin/categories/${id}`,`put`,data)
}

export const deleteCategoryService =(id)=>{
    return httpServices(`/admin/categories/${id}`,`delete`)
}