import React, { useState } from 'react';
import './App.css';
import Album from './components/Album';
import Photos from './components/Photos';
import Users from './components/Users';

const App = () => {
	const [selectedUser, selectUser] = useState(null);
	const [selectedAlbum, selectAlbum] = useState(null);

	


	const onSelectUser = id => {
		selectUser(id);
		selectAlbum(null);
	};

	const onSelectAlbum = id => {
		selectAlbum(id);
	};

	return (
		<div className="container">
			<Users onSelectUser={onSelectUser} selectedUser={selectedUser} />
			<Album onSelectAlbum={onSelectAlbum} selectedUser={selectedUser} selectedAlbum={selectedAlbum} />
			<Photos selectedAlbum={selectedAlbum}/>
		</div>
	);
};

export default App;
