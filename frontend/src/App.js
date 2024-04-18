import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';
import CourseView from './components/CourseView';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<StudentView />} />
                <Route path="/teachers" element={<TeacherView />} />
                <Route path="/courses" element={<CourseView />} />
            </Route>
        </Routes>
    );
}

export default App;
