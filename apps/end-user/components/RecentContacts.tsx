import { ContactType } from "../lib/interfaces/TransactionBriefType";
import ContactCard from "./ContactCard";

export default function RecentContacts({ contacts }: { contacts: ContactType[] }) {
  return <div className="relative min-h-[100px]">
    {contacts.length === 0 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Contacts</p>}
    {contacts.map(c => <ContactCard name={c.name} number={c.number} id={c.id} color={c.color} />)}
  </div >
} 