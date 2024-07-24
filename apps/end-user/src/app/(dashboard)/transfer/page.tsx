import { redirect } from "next/navigation";
import { ROUTE_TRANSFER_P2P } from "../../../constants/routes";

export default function Transfer() {
  redirect(ROUTE_TRANSFER_P2P);
}