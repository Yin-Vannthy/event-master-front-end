'use client'

import { useState } from "react"
import MaterialComponent from "../MaterialComponent";
import AgendaComponent from "../AgendaComponet";

export const EventToggle = ({ id }) => {
    const [tab, setTab] = useState('a');
    return (
        <div>
            <div className="w-fit flex p-2 rounded-2xl bg-backgroundUi">
                <p className={`${tab == 'a' && 'bg-white'} cursor-pointer w-32 text-center py-2 rounded-xl`} onClick={() => setTab('a')}>Material</p>
                <p className={`${tab == 'b' && 'bg-white'} cursor-pointer w-32 text-center py-2 rounded-xl`} onClick={() => setTab('b')}>Agenda</p>
            </div>
            {tab === "a" ?
                <MaterialComponent id={id} />
                :
                <AgendaComponent id={id} />
            }
        </div>
    )
}