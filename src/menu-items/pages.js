// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Tiện ích',
  type: 'group',
  children: [
    {
      id: 'Faculty',
      title: 'Quản lý Khoa',
      type: 'item',
      url: '/faculty',
      icon: icons.LoginOutlined
    },
    {
      id: 'Major',
      title: 'Quản lý Chuyên ngành',
      type: 'item',
      url: '/major',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'Grade',
      title: 'Quản lý Lớp',
      type: 'item',
      url: '/grade',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'RegisterTopic',
      title: 'Đăng ký đề tài',
      type: 'item',
      url: '/register-topic',
      icon: icons.ProfileOutlined
    },
    {
      id: 'Examination',
      title: 'Tổ chức thi',
      type: 'item',
      url: '/examination',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'Subject',
      title: 'Quản lý học phần',
      type: 'item',
      url: '/subject',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'Question',
      title: 'Quản lý câu hỏi',
      type: 'item',
      url: '/question',
      icon: icons.LoginOutlined,
      target: true
    },
    // {
    //   id: 'register1',
    //   title: 'Register',
    //   type: 'item',
    //   url: '/register',
    //   icon: icons.ProfileOutlined,
    //   target: true
    // }
  ]
};

export default pages;
