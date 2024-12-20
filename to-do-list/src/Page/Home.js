import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskCard from '../components/TaskCard';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/taskAction';
import { fetchCategories } from '../redux/actions/categoryAction';
import { setUser } from '../redux/actions/authAction';
import { useEffect } from 'react';
import TaskLogo from '../assets/img/to-do-list.png';
import SlidebarItem from '../components/SlideBar/SlidebarItem';
import ExpandSidebarItem from '../components/SlideBar/ExpandSlidebarItem';
import { FaTasks } from 'react-icons/fa';
import { TbCategoryFilled } from 'react-icons/tb';
import { SlInfo } from "react-icons/sl";
import { IoFilter } from 'react-icons/io5';
import { CiLogout } from 'react-icons/ci';
import { MdOutlineAddTask } from 'react-icons/md';
import AddModal from '../components/AddModal';
import EditTaskModal from '../components/EditTaskModal';
import DeleteTaskModal from '../components/DeleteTaskModal';
import { taskApi } from '../api/api';
import FilterTag from '../components/FilterTag';
import { logout } from '../redux/actions/authAction';
import { userApi } from '../api/api';
import { toast } from 'react-toastify';
import ChangePassModal from '../components/ChangePassModal';

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
    const [currentFilter, setCurrentFilter] = useState('notDone');

    const [showInfo, setShowInfo] = useState(false); // Trạng thái cho Info
    const [activeTogge, setActiveToggle] = useState(false);

    // User info
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageView, setImageView] = useState('');
    const [showChangePass, setShowChangePass] = useState(false);

    const setInfoUser = () => {
        setEmail(user.email);
        setName(user.username);
        setImageUrl(user.avatar);
        setImageView(user.avatar);
    };

    const handleUpdateUser = async (newAvatarUrl) => {
        const data = {
            email: email,
            username: name,
            avatar: newAvatarUrl || imageUrl,
        };
        console.log(data);
        try {
            const res = await userApi.updateUser(user.id, data);
            if (res.status === 200) {
                toast.success('Update user success');
            }
            console.log(res.data);
            dispatch(setUser(res.data));
        } catch (error) {
            console.log(error);
            toast.error('Update user failed');
        }
    };

    const handleShowChangePass = () => {
        console.log('show change pass');
        setShowChangePass(true);
    };

    //! UPLOAD ANH
    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageView(URL.createObjectURL(file));
            const data = new FormData();
            console.log(file);
            data.append('file', file);
            data.append('upload_preset', 'todoapp');
            data.append('cloud_name', 'duzqdd0rq');
            fetch('https://api.cloudinary.com/v1_1/duzqdd0rq/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.url);
                    setImageUrl(data.url.toString());
                    handleUpdateUser(data.url.toString());
                })
                .catch((err) => {
                    console.error('Error uploading image:', err);
                });
        }
    };

    const fetchListTasks = async () => {
        await dispatch(fetchTasks(user.id));
        // handleReset();
    };

    const fetchListCategories = async () => {
        await dispatch(fetchCategories(user.id));
    };

    useEffect(() => {
        if (user) {
            fetchListCategories();
            fetchListTasks();
            setInfoUser();
        }
    }, [user]);

    useEffect(() => {
        if (notDoneActive) {
            const notDoneTasks = Tasks.filter((task) => !task.is_done);
            setListTasks(notDoneTasks);
        } else if (doneActive) {
            const doneTasks = Tasks.filter((task) => task.is_done);
            setListTasks(doneTasks);
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
        setShowInfo(false);
    };

    const handleActiveCate = () => {
        setActiveCategories(true);
        setActiveTaskFill(false);
        setShowInfo(false);
    };

    const handleActiveInfo = () => {
        setShowInfo(true);
        setActiveTaskFill(false);
        setActiveCategories(false);
        setActiveToggle(false);
    };

    const handleAll = () => {
        setAllActive(true);
        setDoneActive(false);
        setNotDoneActive(false);
        setCurrentFilter('all');
        setTasksView(Tasks);
    };

    const handleDone = () => {
        console.log('done>>>>>>>');
        setAllActive(false);
        setDoneActive(true);
        setNotDoneActive(false);
        setCurrentFilter('done');
        const doneTasks = Tasks.filter((task) => task.is_done === true);
        setTasksView(doneTasks);
    };

    const handleNotDone = () => {
        setAllActive(false);
        setDoneActive(false);
        setNotDoneActive(true);
        setCurrentFilter('notDone');
        const notDoneTasks = Tasks.filter((task) => task.is_done === false);
        setTasksView(notDoneTasks);
    };

    const handleReset = () => {
        console.log('reset>>>>>>>');
        handleNotDone();
        handleActiveTaskFill();
        // setShowInfo(false);
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
                    <div onClick={handleActiveInfo}>
                        <SlidebarItem name="Info" Icon={SlInfo} isActive={showInfo} />
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
                {showInfo ? (
                    <div className="info-container">
                        <div className="info-header">Your Profile</div>
                        <div className="info-content">
                            <div className="info-left">
                                <img
                                    src={imageView} 
                                    alt="User Avatar"
                                    className="user-avatar"
                                />
                                <div className="button-group">
                                    <label htmlFor="upload-image" className="upload-btn">
                                        Upload Image
                                    </label>
                                    <input
                                        type="file"
                                        id="upload-image"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={(e) => {
                                            handleImageUpload(e);
                                        }}
                                    />
                                    <button className="change-password-btn" onClick={handleShowChangePass}>
                                        Change Password
                                    </button>
                                </div>
                            </div>
                            <div className="info-right">
                                <form className="info-form" onSubmit={handleUpdateUser}>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input
                                            type="text"
                                            defaultValue={name}
                                            className="form-control"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            defaultValue={email}
                                            className="form-control"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    
                                    <button type="submit" className="save-btn">
                                        Save
                                    </button>
                                </form>
                            </div>
                        </div>
                        <ChangePassModal show={showChangePass} setShow={setShowChangePass} />
                    </div>
                ) : (
                    <>
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
                                    handleNotDone={handleNotDone}
                                    handleDone={handleDone}
                                    handleAll={handleAll}
                                    currentFilter={currentFilter}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
