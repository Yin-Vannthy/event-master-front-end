'use server'

import {loginService} from "@/services/login-signup/auth.service";

export const loginAction = async (userInfo) =>{
    // calling service
    const loginInfo = await loginService(userInfo);
    return loginInfo;
}

