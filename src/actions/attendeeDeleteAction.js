'use server'
import { DeleteAttendeeService } from "@/services/dashboard/attendeeService"
import { revalidateTag } from "next/cache";
// Delete attendee Action
export async function deleteAttendeeAction (attendeeId){
    //calling delete attendee service 
    await DeleteAttendeeService(attendeeId);
    //calling revalidate tag
    revalidateTag('attendee')

}