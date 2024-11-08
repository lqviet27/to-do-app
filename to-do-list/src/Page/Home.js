import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input';
import TaskCard from '../components/TaskCard';
import { API_URL } from '../api/api';
import AddTask from '../components/AddTask';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/actions/taskAction';
import { useEffect } from 'react';
console.log(API_URL);
const Home = () => {
    const dispatch = useDispatch();
    const currentTasks = useSelector((state) => state.task.tasks);
    useEffect(() => {
        const fetchData = async () => {
            const fetchedTasks = await dispatch(fetchTasks({ id_user: 3 }));
            console.log(fetchedTasks);
        };
        fetchData();
    }, []);
    let data = [
        {
            id: 1,
            firstName: 'Mark',
            lastName: 'Otto',
            username: '@mdo',
        },
        {
            id: 2,
            firstName: 'Jacob',
            lastName: 'Thornton',
            username: '@fat',
        },
        {
            id: 3,
            firstName: 'Larry',
            lastName: 'Bird',
            username: '@twitter',
        },
        {
            id: 4,
            firstName: 'Larry',
            lastName: 'Bird',
            username: '@twitter',
        },
    ];

    return (
        <div className="home-container">
            {/* <div className="home-slidebar"></div> */}
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
