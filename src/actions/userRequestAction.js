"use server"
import { approveUserRequestByIdService, rejectUserRequestByIdService } from "@/services/dashboard/userRequestService";
import { revalidateTag } from "next/cache";


export async function deleteUserRequestAction(memberId){
    await rejectUserRequestByIdService(memberId);
    revalidateTag('reject_user');
}

export async function updateUserRequestAction(memberId){
    await approveUserRequestByIdService(memberId);
    revalidateTag('approve_user');
}