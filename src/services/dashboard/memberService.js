"use server";
import { headerToken } from "@/app/api/auth/headerToken";

export async function getAllMemberService() {
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}members?offset=1&limit=8`, {
    next: { tags: ["member"] },
    method: "GET",
    cache: "no-store",
    headers: header,
  });
  const data = await res.json();
  return data;
}

export async function deleteMemberByIdService(memberId) {
  const header = await headerToken();
  const res = await fetch(`${process.env.API_URL}members/${memberId}`, {
    next: { tags: ["member"] },
    method: "DELETE",
    cache: "no-store",
    headers: header,
  });
  const data = await res.json();
  return data;
}

export async function updateMemberService(memberId, role) {
  console.log(memberId, role);
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}members/${memberId}?role=${role}`,
    {
      next: { tags: ["member"] },
      method: "PUT",
      cache: "no-store",
      headers: header,
    }
  );
  const data = await res.json();
  return data;
}

export async function searchMemberService(name,page) {
  console.log("member search");
  const header = await headerToken();
  const res = await fetch(
    `${process.env.API_URL}members/search?memberName=${name}&offset=${
      page ? page : 1
    }&limit=8`,
    { next: { tags: ["member"] }, method: "GET", headers: header }
  );
  const data = await res.json();
  return data;
}
