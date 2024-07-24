'use client'

import { ContactType } from "../lib/interfaces/common";
import ContactCard from "./ContactCard";
import { useSetSendMoneyInputState } from '@repo/store/useApp';

export default function RecentContacts({ contacts }: { contacts: ContactType[] }) {
  const setSendMoneyInputValue = useSetSendMoneyInputState();

  return <div className="relative min-h-[100px]">
    {contacts.length === 0 && <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">No Contacts</p>}
    {contacts.map(c =>
      <button className="w-full" key={c.id} onClick={() => setSendMoneyInputValue(c.number || '')}>
        <ContactCard name={c.name} number={c.number} id={c.id} color={c.color} />
      </button>)}
  </div >
} 