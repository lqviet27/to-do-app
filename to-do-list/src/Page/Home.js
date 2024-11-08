import 'bootstrap/dist/css/bootstrap.min.css';
import TaskCard from '../components/TaskCard';
import { API_URL } from '../api/api';
import AddTask from '../components/AddTask';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/taskAction';
import { useEffect } from 'react';
import TaskLogo from '../assets/img/to-do-list.png';
import SlidebarItem from '../components/SlideBar/SlidebarItem';
import ExpandSidebarItem from '../components/SlideBar/ExpandSlidebarItem';
import { FaTasks } from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import { IoSettingsSharp } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';

const Home = () => {
    const dispatch = useDispatch();
    const currentTasks = useSelector((state) => state.task.tasks);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchedTasks = await dispatch(fetchTasks({ id_user: 3 }));
    //         console.log(fetchedTasks);
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className="home-container">
            <div className="home-slidebar">
                <div className="home-slidebar__header">
                    <img src={TaskLogo} />
                </div>
                <div className="home_slidebar__tabs">
                    <SlidebarItem name="Task fill" Icon={FaTasks} />
                    <ExpandSidebarItem name="Categories" Icon={TbCategoryFilled} />
                    <SlidebarItem name="Setting" Icon={IoSettingsSharp} />
                </div>
                <SlidebarItem name="Logout" Icon={CiLogout} />
            </div>
            <div className="home-content">
                <div className="home-header">All your task</div>
                <div className="home-task">
                    {currentTasks.map((task) => (
                        <TaskCard id={task.id} name={task.title} list={task.description} />
                    ))}
                    <AddTask />
                </div>
            </div>
        </div>
    );
};

export default Home;
