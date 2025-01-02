"use server";
import {
  deleteMemberByIdService,
  getAllMemberService,
  searchMemberService,
  updateMemberService,
} from "@/services/dashboard/memberService";
import { revalidateTag } from "next/cache";

export async function getAllMembersAction(page) {
  const data = await getAllMemberService(page);
  revalidateTag("member");
  return data;
}

export async function deleteMemberAction(memberId) {
  const data = await deleteMemberByIdService(memberId);
  revalidateTag("member");
  return data;
}

export async function updateMemberAction(memberId, role) {
  const data = await updateMemberService(memberId, role);
  revalidateTag("member");
  console.log("update member", data);
  return data;
}

export async function searchMemberAction(memberName,page){
  const data =await searchMemberService(memberName,page);
  revalidateTag("member");
  return data;
}