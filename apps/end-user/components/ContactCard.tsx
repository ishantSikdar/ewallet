import { ContactType } from "../lib/interfaces/TransactionBriefType";
import ProfilePicture from "./ProfilePicture";

export default function ContactCard({ number, name, id, color }: ContactType) {
  return <div className="p-3 rounded-md hover:shadow-md flex gap-4 items-center">
    <div className="w-10 h-10">
      <ProfilePicture name={name || ''} color={color || 'cyan'} />
    </div>
    <div className="h-full">
      <p className="text-xs">{number}</p>
      <h3 className="font-medium">{name}</h3>
    </div>
  </div>
}