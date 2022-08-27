import httpServices from './httpServices'


export const getCategoriesService = (id=null) => {
    return httpServices(`/admin/categories${id? `?paren=${id}`:""}`,'get')
}