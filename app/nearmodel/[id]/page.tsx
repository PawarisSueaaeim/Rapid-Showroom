import { CarRelation } from "@/components/modules";
import axios from "axios";
import React from "react";

type Props = {
  params: { model_id: string };
};

export default async function NearModel({ params }: Props) {
  const getNearCar = process.env.NEXT_PUBLIC_SHOWROOM_API_URL + "/showrooms/vehicles/relation";

  const response = await axios.post(getNearCar, {
    page: 1,
    per_page: 10,
    orderby: "vehicle_id",
    search: "",
    sort: "desc",
  },
  {
    params: {
      model_id: params.model_id,
    }
  }
  );
  const data = await response.data.data;

  return (
    <CarRelation data={data}/>
  );
}
