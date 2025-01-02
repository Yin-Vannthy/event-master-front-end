"use server"

import { deleteEventById } from "@/services/dashboard/eventService";
import { revalidateTag } from "next/cache";

async function deleteEvent(eventId) {
    try{
        const data = await deleteEventById(eventId);
        revalidateTag('events');
        return data;
        
    }catch(error){
        console.error("There was an error deleting the event:", error);
        throw error;
    }
    
}
export default deleteEvent;




