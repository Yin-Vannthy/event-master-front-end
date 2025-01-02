'use server';

export const verifyOTP = async (otp, email) => {
    const res = await fetch(`${process.env.API_URL}auth/verify?otp=${otp}&email=${encodeURIComponent(email)}`, {
        method: 'PUT',
        headers: {
            'accept': '*/*'
        }
    });
    const data = await res.json();
    return data.payload;
};
verifyOTP('otp', 'email');

