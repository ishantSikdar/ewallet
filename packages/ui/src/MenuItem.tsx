'use client'
import { useRouter } from 'next/navigation';
import IconRegistry from './IconsRegistry';

interface MenuItemType {
  iconKey: string,
  label: string,
  route: string,
}

export default function MenuItem({ iconKey, label, route }: MenuItemType) {
  const router = useRouter();
  const Icon = IconRegistry[iconKey];

  const sendToPage = () => {
    router.push(route);
  };

  return (
    <button onClick={sendToPage} className="flex gap-2 items-center">
      {Icon && <Icon className="w-6 h-6" />}
      <h2>{label}</h2>
    </button>
  );
};

