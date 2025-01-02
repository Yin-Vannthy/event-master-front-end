"use server";
import { getMaterialByEventId } from "@/services/dashboard/materialService";
import { revalidateTag} from "next/cache";

async function fetchMaterialData(id) {
  const data = await getMaterialByEventId(id);
  revalidateTag("materials");
  return data;
}

export default fetchMaterialData;
