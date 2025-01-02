"use server"

import { registerUserService} from "@/services/login-signup/auth.service";

export async function registerUserAction(formRegister) {
    const newUser = {
        userName: formRegister.name,
        phone: formRegister.phoneNumber,
        password: formRegister.password,
        confirmPassword: formRegister.confirmPassword,
        orgCode: formRegister.organizationCode,
        email: formRegister.email
    };
    await registerUserService(newUser);
    return newUser;
}
