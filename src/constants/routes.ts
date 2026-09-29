export const desktopLinks = [
  { label: 'DISCOVER', href: '/discover' },
  { label: 'RECORDS', href: '/records' },
  { label: 'HISTORY', href: '/history' },
] as const;

export const mobileTabs = [
  { label: 'HOME', href: '/' },
  { label: 'DISCOVER', href: '/discover' },
  { label: 'RECORDS', href: '/records' },
  { label: 'COLLECTION', href: '/collection' },
] as const;

export const menuLinks = [
  { label: 'DISCOVER', href: '/discover' },
  { label: 'RECORDS', href: '/records' },
  { label: 'HISTORY', href: '/history' },
  { label: 'COLLECTION', href: '/collection' },
] as const;

/** Vrai si `pathname` correspond à `href` (la page d'un disque compte comme « RECORDS »). */
export function isActiveRoute(pathname: string, href: string) {
  if (pathname === href) return true;
  return href === '/records' && pathname.startsWith('/record/');
}
