
"use server";

import {registerService} from "@/services/login-signup/auth.service";

export default async function signupAction(formRegister) {
    const newUser = {
        adminName: formRegister.name,
        phone: formRegister.phoneNumber,
        password: formRegister.password,
        confirmPassword: formRegister.confirmPassword,
        email: formRegister.email
    };
    await registerService(newUser);
    return newUser;
}