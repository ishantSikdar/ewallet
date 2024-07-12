import { redirect } from "next/navigation";
import { ROUTE_HOME, ROUTE_SIGNIN } from "../constants/routes";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect(ROUTE_SIGNIN);
  } else {
    redirect(ROUTE_HOME);
  }
}
