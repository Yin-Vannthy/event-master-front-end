import { headerToken } from "@/app/api/auth/headerToken";

export const getAllMember = async () => {
    const header = await headerToken()
    const res = await fetch(`${process.env.API_URL}members?offset=1&limit=100`,
        {
            headers: header
        }
    )
    const data = await res.json();
    return data
}