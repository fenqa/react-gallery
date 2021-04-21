import { useEffect, useState } from 'react';
import { fetchUsers } from '../../requests';

import './Users.css';

const Users = ({ onSelectUser }) => {
	const [users, setUsers] = useState([]);
	const [activeUser, setActiveUser] = useState(null);

	useEffect(() => {
		const getUsers = async () => {
			const usersFromServer = await fetchUsers();
			setUsers(usersFromServer);
		};

		getUsers();
	}, []);

	const setActiveUserHandler = id => {
		setActiveUser(id);
	};

	return (
		<div className="flex users">
			{users.map(user => {
				const userClasses = `user ${user.id === activeUser ? ` active` : ''}`;
				return (
					<p
						className={userClasses}
						key={user.id}
						onClick={e => {
							onSelectUser(user.id);
							setActiveUserHandler(user.id);
						}}>
						{user.name}
					</p>
				);
			})}
		</div>
	);
};

export default Users;
