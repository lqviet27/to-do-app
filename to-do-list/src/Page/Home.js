import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskCard from '../components/TaskCard';
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
import { IoFilter } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAddTask } from 'react-icons/md';
import AddModal from '../components/AddModal';
import EditTaskModal from '../components/EditTaskModal';
import DeleteTaskModal from '../components/DeleteTaskModal';
import { taskApi } from '../api/api';
import FilterTag from '../components/FilterTag';
import { logout } from '../redux/actions/authAction';

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const Tasks = useSelector((state) => state.task.tasks);
    const categories = useSelector((state) => state.category.categories);

    const [showAddTask, setShowAddTask] = useState(false);
    const [showEditTask, setShowEditTask] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);

    const [listTasks, setListTasks] = useState([]);
    const [tasksView, setTasksView] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [currentCate, setCurrentCate] = useState(null);

    const [activeTaskFill, setActiveTaskFill] = useState(true);
    const [activeCategories, setActiveCategories] = useState(false);

    const [notDoneActive, setNotDoneActive] = useState(true);
    const [allActive, setAllActive] = useState(false);
    const [doneActive, setDoneActive] = useState(false);

    const [activeTogge, setActiveToggle] = useState(false);

    const fetchListTasks = async () => {
        await dispatch(fetchTasks(user.id));
        handleReset();
    };

    const fetchListCategories = async () => {
        await dispatch(fetchCategories(user.id));
    };

    useEffect(() => {
        if (user) {
            fetchListCategories();
            fetchListTasks();
        }
    }, [user]);

    // useEffect(() => {
    //     setListTasks(Tasks);
    // }, [Tasks]);
    useEffect(() => {
        if (notDoneActive) {
            const notDoneTasks = Tasks.filter((task) => !task.is_done);
            setListTasks(notDoneTasks);
        } else {
            setListTasks(Tasks);
        }
    }, [Tasks]);

    useEffect(() => {
        const taskView = listTasks.map((task) => {
            const category = categories.find((cat) => cat.id === task.category_id);

            return {
                ...task,
                categoryName: category ? category.name : 'None',
                categoryColor: category ? category.color : '#333',
            };
        });

        if (currentCate != null && categories != null && Array.isArray(categories)) {
            setCurrentCate((prev) => {
                if (!prev || !prev.id) return null; // Nếu `prev` hoặc `prev.id` không tồn tại, trả về null.
                return categories.find((cat) => cat.id === prev.id) || null; // Nếu không tìm thấy, trả về null.
            });
        }
        setTasksView(taskView);
    }, [categories, listTasks]);

    const handleShowEditTask = (id) => {
        setShowEditTask(true);
        const task = listTasks.find((task) => task.id === id);
        setCurrentTask(task);
    };

    const handleShowDeleteTask = (id) => {
        setShowDeleteTask(true);
        const task = listTasks.find((task) => task.id === id);
        setCurrentTask(task);
    };

    const handleActiveTaskFill = () => {
        setActiveTaskFill(true);
        setActiveCategories(false);
    };

    const handleActiveCate = () => {
        setActiveCategories(true);
        setActiveTaskFill(false);
    };

    const handleAll = () => {
        setAllActive(true);
        setDoneActive(false);
        setNotDoneActive(false);
        setTasksView(Tasks);
    };

    const handleDone = () => {
        console.log('done>>>>>>');
        setAllActive(false);
        setDoneActive(true);
        setNotDoneActive(false);
        const doneTasks = Tasks.filter((task) => task.is_done === true);
        setTasksView(doneTasks);
    };

    const handleNotDone = () => {
        setAllActive(false);
        setDoneActive(false);
        setNotDoneActive(true);
        const notDoneTasks = Tasks.filter((task) => task.is_done === false);
        setTasksView(notDoneTasks);
    };

    const handleReset = () => {
        console.log('reset>>>>>>>');
        setNotDoneActive(true);
        setAllActive(false);
        setDoneActive(false);
        setActiveTaskFill(true);
        setActiveCategories(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logout());
    };

    const fetchTaskByCate = async (id) => {
        const res = await taskApi.getTasksByCategory(id);
        if (res.ec && res.ec === 1) {
            return;
        }
        const task = res.data;
        const taskOfUser = Array.isArray(task) ? task.filter((task) => task.user_id === user.id) : [];
        setListTasks(taskOfUser);
    };

    const handleTaksFillAction = async () => {
        await fetchListTasks();
        setActiveToggle(false);
    };

    return (
        <div className="home-container">
            <div className="home-slidebar">
                <div className="home-slidebar__header">
                    <img src={TaskLogo} />
                </div>
                <div className="home-slidebar__tabs">
                    <div onClick={handleActiveTaskFill}>
                        <SlidebarItem
                            name="Task fill"
                            Icon={FaTasks}
                            isActive={activeTaskFill}
                            action={handleTaksFillAction}
                        />
                    </div>
                    <div>
                        <ExpandSidebarItem
                            isActive={activeCategories}
                            name="Categories"
                            Icon={TbCategoryFilled}
                            categList={categories}
                            fetchListCate={fetchListCategories}
                            fetchListCategories={fetchListCategories}
                            setCurrentCate={setCurrentCate}
                            fetchTaskByCate={fetchTaskByCate}
                            handleActiveCategories={handleActiveCate}
                            activeTogge={activeTogge}
                            setActiveToggle={setActiveToggle}
                        />
                    </div>
                </div>
                <div className="home-slidebar__footer">
                    <div className="text">Hi {user.username} ...</div>
                    <div className="logout-item" onClick={handleLogout}>
                        <CiLogout className="icon" />
                        <div className="name">Logout</div>
                    </div>
                </div>
            </div>

            <div className="home-content">
                <div className="home-header">{`All your task ${
                    activeCategories ? 'of ' + currentCate?.name : ''
                }`}</div>
                {activeTaskFill ? (
                    <div className="home-filterBar">
                        <div className="home-filterBar__title">
                            Tasks
                            <div className="add-task" onClick={() => setShowAddTask(true)}>
                                <MdOutlineAddTask className="add-task__icon" />
                                {/* <p className="add-task__text"></p> */}
                            </div>
                        </div>

                        <div className="home-filterBar__filterField">
                            <div onClick={handleNotDone}>
                                <FilterTag name="Not Done" active={notDoneActive} />
                            </div>
                            <div onClick={handleDone}>
                                <FilterTag name="Done" active={doneActive} />
                            </div>
                            <div onClick={handleAll}>
                                <FilterTag name="All" active={allActive} />
                            </div>

                            <div className="icon">
                                <IoFilter />
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className="home-task">
                    {tasksView.map((task, index) => (
                        <TaskCard
                            id={task.id}
                            name={task.title}
                            description={task.description}
                            list={task.categoryName}
                            color={task.categoryColor}
                            done={task.is_done}
                            fetchTasks={fetchListTasks}
                            showEditTaskModal={handleShowEditTask}
                            showDeleteTaskModal={handleShowDeleteTask}
                        />
                    ))}

                    <AddModal
                        show={showAddTask}
                        setShow={setShowAddTask}
                        listCate={categories}
                        fetchListTasks={fetchListTasks}
                    />

                    <EditTaskModal
                        show={showEditTask}
                        setShow={setShowEditTask}
                        task={currentTask}
                        listCate={categories}
                        fetchListTasks={fetchListTasks}
                    />

                    <DeleteTaskModal
                        show={showDeleteTask}
                        setShow={setShowDeleteTask}
                        task={currentTask}
                        fetchListTasks={fetchListTasks}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
