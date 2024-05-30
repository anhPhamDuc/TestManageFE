// assets
import { ChromeOutlined, QuestionOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined,
  LogoutOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Quản lý hệ thống',
  type: 'group',
  children: [
    {
      id: 'change-account',
      title: 'Cập nhật tài khoản',
      type: 'item',
      url: '/change-account',
      icon: icons.ChromeOutlined
    },
    // {
    //   id: 'login-page',
    //   title: 'Login demo',
    //   type: 'item',
    //   url: '/login-page',
    //   icon: icons.ChromeOutlined
    // },
    // {
    //   id: 'sample-page',
    //   title: 'Sample Page',
    //   type: 'item',
    //   url: '/sample-page',
    //   icon: icons.ChromeOutlined
    // },
    {
      id: 'documentation',
      title: 'Hướng dẫn sử dụng',
      type: 'item',
      url: '/documentation',
      icon: icons.ProfileOutlined
      // external: true
    },
    {
      id: 'logout-page',
      title: 'Đăng xuất',
      type: 'item',
      url: '/login',
      icon: icons.LogoutOutlined
    }
  ]
};

export default support;
