import { redirect } from "next/navigation";
import { ROUTE_HOME } from "../constants/routes";


export default async function RootHome() {
  redirect(ROUTE_HOME);
}
