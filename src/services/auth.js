import httpServices from "./httpServices"

export const loginService =(values)=>{
    return httpServices("/auth/login", "post", {
        ...values,
        remember: values.remember ? 1 : 0,
      })
}
export const logoutService =()=>{
  return httpServices("/auth/logout", "get")
} 

export const getUserService = ()=>{
  return httpServices("/auth/user", "get")
} 