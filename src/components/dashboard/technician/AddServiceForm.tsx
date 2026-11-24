"use client";

import ServiceForm from "./ServiceForm";

interface Props {
  technician: {
    name: string;
    email: string;
  };
}

export default function AddServiceForm({ technician }: Props) {


  return (
    <ServiceForm technician={technician}/>
  );
}
