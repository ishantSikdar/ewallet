import { getInitials } from '@repo/common/string';

export default function ProfilePicture({ name, color }: { name: string, color: string }) {
  const initials = getInitials(name);
  return <div className="overflow-hidden h-full w-full">
    <div style={{
      backgroundColor: color
    }} className={`rounded-[100%] text-white flex justify-center items-center h-full`}>
      {initials}
    </div>
  </div>
}