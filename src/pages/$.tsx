import { useLocation } from 'ice';
import { isNavLink } from '@/utils/nav';
import IndexPage from './index';

export default () => {
  const { pathname } = useLocation();
  return isNavLink(pathname) ? <IndexPage /> : '404 Not Found.';
};
