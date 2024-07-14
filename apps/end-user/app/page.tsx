import { redirect } from "next/navigation";
import { ROUTE_HOME } from "../constants/routes";


export default async function Home() {
  redirect(ROUTE_HOME);
}
