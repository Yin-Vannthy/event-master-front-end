'use server'

import { getAllCategory, getEventByCateNameLoading, getFormById } from "@/services/clientPage/landingService";
import { revalidateTag } from "next/cache";


export const getAllCategoryLandingAction = async () => {
    const res = await getAllCategory();
    revalidateTag('overview');
    return res
}

export const getEventByCategoryNameAction = async ({ name, page }) => {
    const res = await getEventByCateNameLoading({ name, page });
    const data = res.payload
    revalidateTag('overview_event');
    return data
}

export const getFormAction = async (id) => {
    const res = await getFormById(id);
    return res
}