// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'friends',
    path: '/dashboard/friends',
    icon: icon('ic_user'),
  },
  {
    title: 'new Split',
    path: '/dashboard/newSplit',
    icon: icon('ic_money'),
  },
];

export default navConfig;
