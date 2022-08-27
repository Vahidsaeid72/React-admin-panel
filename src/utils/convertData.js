import jMoment from "jalali-moment";

export const canvertDatetojalali=(data)=>{
    return jMoment(data).format("jYYYY-jMM-jDD")
}