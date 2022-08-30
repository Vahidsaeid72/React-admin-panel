import httpServices from "./httpServices"

export const getCategoryAttrsService = (categoryId) => {
    return httpServices(`/admin/categories/${categoryId}/attributes`,'get')
}


export const addCategoryAttrsService = (categoryId , data) => {
    return httpServices(`/admin/categories/${categoryId}/attributes`,'post' , data)
}

