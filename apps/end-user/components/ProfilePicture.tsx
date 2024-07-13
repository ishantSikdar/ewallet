import { getInitials } from '@repo/common/string';

export default function ProfilePicture({ name }: { name: string }) {
  const initials = getInitials(name);

  return <div className="overflow-hidden h-full w-full">
    <div className="rounded-[100%] text-white bg-cyan-500 flex justify-center items-center h-full">
      {initials}
    </div>
  </div>
}