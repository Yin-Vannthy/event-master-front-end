"use server"

import { getAllProfileMember, updateProfileMemberById } from "@/services/profile/profile.service"
import { revalidateTag } from "next/cache";

export const updateMemberDataAction = async (memberId, updateMemberData) =>{
    await updateProfileMemberById(memberId, updateMemberData);
    revalidateTag("customer");
}