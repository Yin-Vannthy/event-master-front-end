"use client";

export const Getstart = ({ className }) => <button onClick={() => document.getElementById('my_modal_event_create').showModal()} className={`bg-white rounded-full px-8 py-3 font-bold mt-4 lg:mt-8 text-sm ${className}`}>Get Started</button>