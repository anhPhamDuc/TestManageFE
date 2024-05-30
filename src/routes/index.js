import { useRoutes } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LoginRoutes, MainRoutes]);
  // return (
  //   <Routes>
  //     <Route path="/free" element={<MainRoutes />} />
  //     <Route path="/free/login" element={<LoginRoutes />} />
  //   </Routes>
  // );
}