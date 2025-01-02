'use server'
import { headerToken } from "@/app/api/auth/headerToken";

export async function getAllUserRequestService(){
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}user-requests`,
        {
            next: { tags: ["user_request"] },
            method: 'GET',
            cache: "no-store",
            headers: header
        
        }
    );
    
    const data = res.json();
    return data;
}

export const rejectUserRequestByIdService = async (memberId) => {
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}user-requests/reject/${memberId}`,
        {
            next: { tags: ["reject_user"] },
            method: "DELETE",
            headers: header
        }
    );
    
    const data = await res.json();
    console.log("Data:",data)
    return data;
}

export async function approveUserRequestByIdService(memberId){
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}user-requests/approve/${memberId}`,
        {
            next: { tags: ["approve_user"] },
            method: "PUT",
            cache: "no-store",
            headers: header
        }
    );
    
    const data = res.json();
    return data;
}

