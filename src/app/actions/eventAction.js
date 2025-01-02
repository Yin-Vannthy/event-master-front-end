'use server'

import {getAllEventCategory, getEventByCateNameLoading } from "@/services/dashboard/eventService";

export const getAllCategoryEventAction = async () => {
    const res = await getAllEventCategory();
    return res
}

export const getEventByCategoryNameAction = async ({name, page}) => {
    const res = await getEventByCateNameLoading({ name, page });
    const data = res.payload
    return data
}

export const callingServiceAction = async (searchData) => {
    const data = await findEvent(searchData);
    return data
}