"use server"
import { headerToken } from "@/app/api/auth/headerToken";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function getAllMemberProfile(){
    const header = await headerToken();
    const res = await fetch(`${process.env.API_URL}profiles`, {
        method : "GET",
        headers : header,
        cache : "no-store",
        next: { tags: ["customer"] }
    })
    const data = await res.json();
    return data;
}

export async function updateProfileMemberById(memberId, updateMemberData){
    const header = await headerToken();
    try {
        const res = await fetch(`${process.env.API_URL}profiles/update-member/${memberId}`, {
            method: "PUT",
            body: JSON.stringify(updateMemberData),
            headers: header
        });

        if (!res.ok) {
            const errorDetails = await res.text(); 
            throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}, Details: ${errorDetails}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error updating member:", error);
        throw error;
    }
}
