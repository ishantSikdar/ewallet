import { redirect } from "next/navigation";
import { ROUTE_TRANSACTIONS_TRANSFERED } from "../../../constants/routes";

export default function Transactions() {
  redirect(ROUTE_TRANSACTIONS_TRANSFERED);
}