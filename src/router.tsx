import { useNavigate, useLocation } from 'react-router-dom';

// Page identifiers used throughout the app. These map 1:1 to URL paths.
export type Page =
  | 'home'
  | 'about'
  | 'portfolio'
  | 'agentic-ai'
  | 'services'
  | 'rent-creative'
  | 'contact';

// Map internal page ids <-> URL paths.
const pageToPath: Record<Page, string> = {
  home: '/',
  about: '/about',
  portfolio: '/portfolio',
  'agentic-ai': '/agentic-ai',
  services: '/services',
  'rent-creative': '/rent-creative',
  contact: '/contact',
};

const pathToPage = (pathname: string): Page => {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const entry = (Object.entries(pageToPath) as [Page, string][]).find(
    ([, path]) => path === clean,
  );
  return entry ? entry[0] : 'home';
};

/**
 * Compatibility hook. Preserves the original `{ page, navigate }` API the
 * components were written against, but is now backed by real URL routing
 * via react-router. This means working URLs, deep links, and a functional
 * browser back/forward button — without touching any component code.
 */
export const useRouter = (): { page: Page; navigate: (p: Page) => void } => {
  const routerNavigate = useNavigate();
  const location = useLocation();

  const navigate = (p: Page) => {
    routerNavigate(pageToPath[p] ?? '/');
    // react-router's ScrollToTop handles scroll reset; this is a safety net.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return { page: pathToPage(location.pathname), navigate };
};

export { pageToPath, pathToPage };
