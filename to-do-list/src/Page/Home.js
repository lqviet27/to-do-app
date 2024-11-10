import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskCard from '../components/TaskCard';
import { API_URL } from '../api/api';
import AddTask from '../components/AddTask';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/taskAction';
import { fetchCategories } from '../redux/actions/categoryAction';
import { useEffect } from 'react';
import TaskLogo from '../assets/img/to-do-list.png';
import SlidebarItem from '../components/SlideBar/SlidebarItem';
import ExpandSidebarItem from '../components/SlideBar/ExpandSlidebarItem';
import { FaTasks } from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import { IoSettingsSharp } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAddTask } from 'react-icons/md';
import AddModal from '../components/AddModal';
import { GiConsoleController } from 'react-icons/gi';

const Home = () => {
    const dispatch = useDispatch();
    const currentTasks = useSelector((state) => state.task.tasks);
    const categories = useSelector((state) => state.category.categories);
    const [showAddTask, setShowAddTask] = useState(false);
    const [tasksView, setTasksView] = useState([]);

    const fetchListTasks = async () => {
        const fetchedTasks = await dispatch(fetchTasks(1));
        console.log(fetchedTasks);
    };

    const fetchListCategories = async () => {
        const fetchedCategories = await dispatch(fetchCategories(1));
        console.log(fetchedCategories);
    };

    useEffect(() => {
        fetchListCategories();
        fetchListTasks();
    }, []);

    useEffect(() => {
        const taskView = currentTasks.map((task) => {
            const category = categories.find((cat) => cat.id === task.category_id);
            console.log(category);
            return {
                ...task,
                categoryName: category ? category.name : 'None',
                categoryColor: category ? category.color : '#333',
            };
        });
        setTasksView(taskView);
    }, [currentTasks, categories]);

    return (
        <div className="home-container">
            <div className="home-slidebar">
                <div className="home-slidebar__header">
                    <img src={TaskLogo} />
                </div>
                <div className="home-slidebar__tabs">
                    <SlidebarItem name="Task fill" Icon={FaTasks} />
                    <ExpandSidebarItem name="Categories" Icon={TbCategoryFilled} categList={categories} />
                    <SlidebarItem name="Setting" Icon={IoSettingsSharp} />
                </div>
                <div className="home-slidebar__footer">
                    <SlidebarItem name="Logout" Icon={CiLogout} />
                </div>
            </div>
            <div className="home-content">
                <div className="home-header">All your task</div>
                <div className="home-task">
                    {tasksView.map((task) => (
                        <TaskCard
                            id={task.id}
                            name={task.title}
                            list={task.categoryName}
                            color={task.categoryColor}
                            done={task.is_done}
                            fetchTasks={fetchListTasks}
                        />
                    ))}
                    <div className="add-task" onClick={() => setShowAddTask(true)}>
                        <MdOutlineAddTask className="add-task__icon" />
                        <p className="add-task__text">Add a task</p>
                    </div>
                    <AddModal
                        show={showAddTask}
                        setShow={setShowAddTask}
                        listCate={categories}
                        fetchListTasks={fetchListTasks}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
