import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Input from './Input';
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
        <div>
            <Input />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.username}</td>
                                <td>
                                    <button className="btn btn-primary mx-1">Edit</button>
                                    <button className="btn btn-primary mx-1">Delete</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Home;
