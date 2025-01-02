"use server";

export const getOrganizationDetails = async (orgCode) => {
    const res = await fetch(`${process.env.API_URL}auth/org/${orgCode}`, {
        method: 'GET',
        headers: {
            'accept': '*/*'
        }
    });
    const data = await res.json();
    return data.payload;
};
