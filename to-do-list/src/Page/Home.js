import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from '../components/Input';
import TaskCard from '../components/TaskCard';
import { API_URL } from '../api/api';
import AddTask from '../components/AddTask';
import './Home.scss';
console.log(API_URL);
const Home = () => {
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
                <div className="home-header">
                    {/* <Input /> */}
                </div>
                <div className="home-task">
                    {data.map((task) => (
                        <TaskCard id={task.id} name={task.firstName} list={task.lastName} />
                    ))}
                    <AddTask />
                </div>
            </div>
        </div>
    );
};

export default Home;
