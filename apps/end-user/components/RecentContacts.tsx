import { ContactType } from "../lib/interfaces/TransactionBriefType";
import ContactCard from "./ContactCard";

export default function RecentContacts({ contacts }: { contacts: ContactType[] }) {
  return <div>
    {contacts.map(c => <ContactCard name={c.name} number={c.number} id={c.id} />)}
  </div>
} 