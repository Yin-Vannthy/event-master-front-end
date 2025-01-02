import { EventDetail } from "../../_components/EventDetailComponent";
import { CreateDynamicForm } from "../../_components/CreateDynamicFormComponent";
import MaterialComponent from "../../_components/MaterialComponent";
import AgendaComponent from "../../_components/AgendaComponet";
import { getEventByIdService } from "@/services/dashboard/eventService";
import { EventToggle } from "../../_components/toogle/EventToogle";
import { PushRouter } from "@/components/PushRouter";

const Page = async ({ params: { id } }) => {
  const eventData = await getEventByIdService(id)
  return (
    <main className="space-y-8">
      {/* <PushRouter name={`/event-detail/${id}?name=${eventData?.payload?.eventName}`} /> */}
      <div className=" rounded-3xl bg-white  z-0">
        <EventDetail eventData={eventData.payload} />
      </div>
      <div className=" rounded-3xl bg-white  z-0 py-[2%] px-[2%]">
        <p className="text-primary-text font-semibold text-2xl mb-5">
          Registratioin form
        </p>
        <CreateDynamicForm id={id} />
      </div>
      {/* <RegisterFormConferrence /> */}
      {/* <MaterialComponent id={id}/>
        <AgendaComponent id={id}/> */}
      <div className="rounded-3xl bg-white  z-0 py-[2%] px-[2%]">
        <EventToggle id={id} />
      </div>
    </main>
  );
};

export default Page;
