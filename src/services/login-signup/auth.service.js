"use server";

export const loginService = async (userInfo) => {
    const res = await fetch(`${process.env.API_URL}auth/login`, {
        method: 'POST',
        headers: {
            'accept': ' */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    const data = await res.json();
    return data;
    // if (data.token) {
    //     return data
    // } else {
    //     return null
    // }
}

export const registerService = async (userInfo) => {
    console.log("Admin : ", userInfo)
    const res1 = await fetch(`${process.env.API_URL}auth/admin-register`, {
        method: 'POST',
        headers: {
            'accept': ' */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    const data = await res1.json();
    return data;
    // console.log(data)
}


export const registerUserService = async (userInfo) => {
    console.log("User : ", userInfo)
    // const res2 = await fetch('http://34.124.203.109:8081/api/auth/verify?otp=9421&email=pokhengly%40gmail.com', {
    const res2 = await fetch(`${process.env.API_URL}auth/user-register`, {
        method: 'POST',
        headers: {
            'accept': ' */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    });
    const data = await res2.json();
    return data;
    // console.log(data)
}