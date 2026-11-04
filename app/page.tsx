import { redirect } from 'next/navigation';

// The storefront lives in public/index.html (served at "/" by a rewrite in next.config.mjs).
export default function Home() {
  redirect('/index.html');
}
