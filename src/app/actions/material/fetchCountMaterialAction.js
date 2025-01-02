"use server";
import { countMaterialStatusByEventId } from "@/services/dashboard/materialService";
import { revalidateTag} from "next/cache";

async function fetchMaterialCount(id) {
const data = await countMaterialStatusByEventId(id)
  revalidateTag("materials");
  return data;
}

export default fetchMaterialCount;