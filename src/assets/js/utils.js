import { Toast } from "vant";

class Utils{
    vaildForm(o){
        console.log(o);
        for(let key in o){
            if(!o[key].reg.test(o[key].value)){
                Toast({
                    duration:3000,
                    message:o[key].msg
                })
                return false;
            };
        }
        return true;
    }
}
export const utils=new Utils();