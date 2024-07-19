import { ContactType } from "../lib/interfaces/common";
import ProfilePicture from "./ProfilePicture";

export default function ContactCard({ number, name, id, color }: ContactType) {
  return <div className="p-3 rounded-md text-left hover:shadow-md w-full flex gap-4 items-center">
    <div className="w-8 h-8">
      <ProfilePicture name={name || ''} color={color || 'cyan'} />
    </div>
    <div className="h-full">
      <p className="text-xs">{number}</p>
      <h3 className="text-sm font-medium">{name}</h3>
    </div>
  </div>
}