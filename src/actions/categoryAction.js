'use server'

import { allCategory, createEventService, getAllCategory, insertCategory, storeImageService, updateCategory } from "@/services/dashboard/overviewService";
import { deleteCategory } from "@/services/dashboard/overviewService";
import { getAllMember } from "@/services/notification/notificationService";
import { revalidateTag } from "next/cache";
import { Knock } from "@knocklabs/node";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { jwtDecode } from "jwt-decode";

const knockClient = new Knock(process.env.KNOCK_SECRET_API_KEY);


export const deleteCategoryAction = async (id) => {
    const session = await getServerSession(authOption);
    let userInfo = jwtDecode(session?.user?.token);

    await deleteCategory(id);
    const allMember = await getAllMember();
    await knockClient.notify('new-workout', {
        actor: userInfo?.sub,
        recipients: allMember.payload.filter(x => x.email !== userInfo?.sub).map(x => x.email),
        data: {
            workoutText: {
                value: "has been deleted a category."
            }
        }
    })
    revalidateTag('overview')
}

export const addNewCategoryAction = async (name) => {
    const session = await getServerSession(authOption);
    let userInfo = jwtDecode(session?.user?.token);

    const data = await insertCategory(name);
    revalidateTag('overview')
    const allMember = await getAllMember();
    await knockClient.notify('new-workout', {
        actor: userInfo?.sub,
        recipients: allMember.payload.filter(x => x.email !== userInfo?.sub).map(x => x.email),
        data: {
            workoutText: {
                value: "has been created a new category."
            }
        }
    })
    return data;
}

export const updateCategoryAction = async (id, categoryName) => {
    const session = await getServerSession(authOption);
    let userInfo = jwtDecode(session?.user?.token);

    const res = await updateCategory(id, categoryName);
    const allMember = await getAllMember();
    await knockClient.notify('new-workout', {
        actor: userInfo?.sub,
        recipients: allMember.payload.filter(x => x.email !== userInfo?.sub).map(x => x.email),
        data: {
            workoutText: {
                value: "has been updated a category."
            }
        }
    })
    revalidateTag('overview');
    return res
}

export const getAllCategoryAction = async (page) => {
    const data = await getAllCategory(page);
    revalidateTag('overview');
    return data
}

export const addNewEventAction = async (data) => {
    const session = await getServerSession(authOption);
    let userInfo = jwtDecode(session?.user?.token);

    const res = await createEventService(data);
    revalidateTag('overview_event');
    const allMember = await getAllMember();
    await knockClient.notify('new-workout', {
        actor: userInfo?.sub,
        recipients: allMember.payload.filter(x => x.email !== userInfo?.sub).map(x => x.email),
        data: {
            workoutText: {
                value: "just created a new event."
            }
        }
    })
    return res
}

export const allCategoryAction = async () => {
    const data = await allCategory();
    revalidateTag('overview');
    return data
}

export const storeImageAction = async (image) => {
    const data = await storeImageService(image)
    return data
}