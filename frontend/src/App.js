import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';
import ProgramView from './components/ProgramView';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<StudentView />} />
                <Route path="/teachers" element={<TeacherView />} />
                <Route path="/programs" element={<ProgramView />} />
            </Route>
        </Routes>
    );
}

export default App;
