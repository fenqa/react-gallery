import { useEffect, useState } from 'react';

import { fetchUsers } from '../requests';

const Users = ({ onSelectUser, selectedUser }) => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			const usersFromServer = await fetchUsers();
			setUsers(usersFromServer);
		};

		getUsers();
	}, []);

	return (
		<div className="flex users">
			{users.map(user => {
				return (
					<p
						className="user"
						key={user.id}
						onClick={() => {
							onSelectUser(user.id);
						}}>
						{user.name}
					</p>
				);
			})}
		</div>
	);
};

export default Users;
