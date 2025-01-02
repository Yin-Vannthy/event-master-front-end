"use server";
import { revalidateTag } from "next/cache";
import { getMaterialById } from "@/services/dashboard/materialService";

async function getMaterialByIdAction(id) {
  // console.log("the id of material is ",id)
  const data = await getMaterialById(id)
  revalidateTag("materials");
  return data;
  }
  export default getMaterialByIdAction;