import httpServices from './httpServices'

export const getAllDiscountsService = ()=>{
    return httpServices("/admin/discounts","get")
}