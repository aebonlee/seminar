import { Route, Routes } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { Home } from './pages/Home'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { Apply } from './pages/Apply'
import { About } from './pages/About'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { MyPage } from './pages/MyPage'
import { NotFound } from './pages/NotFound'
import { AdminLayout } from './pages/admin/AdminLayout'
import { Dashboard } from './pages/admin/Dashboard'
import { ApplicationsAdmin } from './pages/admin/ApplicationsAdmin'
import { CoursesAdmin } from './pages/admin/CoursesAdmin'
import { NewCourse } from './pages/admin/NewCourse'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:id" element={<CourseDetail />} />
        <Route path="apply" element={<Apply />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="mypage" element={<MyPage />} />

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<ApplicationsAdmin />} />
          <Route path="courses" element={<CoursesAdmin />} />
          <Route path="courses/new" element={<NewCourse />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
