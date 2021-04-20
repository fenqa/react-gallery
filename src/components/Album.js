import { useEffect, useState } from 'react';

import { fetchAlbums, fetchPhotos } from '../requests';

const Album = ({ selectedUser, selectedAlbum, onSelectAlbum }) => {
	const [albums, setAlbums] = useState([]);
	const [thumbs, setThumbs] = useState([]);

	const getAlbums = async () => {
		const albumsFromServer = await fetchAlbums();
		setAlbums(albumsFromServer);
	};
	useEffect(() => {
		const getThumbs = async () => {
			const thumbsFromServer = await fetchPhotos();
			setThumbs(
				chunkArr(thumbsFromServer, 50)
					.map(arr => {
						return arr.splice(0, 4);
					})
					.flat()
			);
		};

		const chunkArr = (arr, size) => {
			let res = [];
			while (arr.length) {
				res.push(arr.splice(0, size));
			}

			return res;
		};

		getAlbums();
		getThumbs();
	}, [selectedUser]);

	useEffect(() => {
		const getAlbums = async () => {
			const albumsFromServer = await fetchAlbums();
			setAlbums(albumsFromServer);
		};

		getAlbums();
	}, []);

	const filterAlbums = id => {
		const filtered = albums.filter(album => {
			return album.id === id;
		});
		console.log(filtered);
		setAlbums(filtered);
	};

	return (
		<ul className="album-list">
			{albums.map(album => {
				if (selectedUser === album.userId) {
					return (
						<>
							<li
								className="album-list__item"
								key={album.id}
								onClick={() => {
								onSelectAlbum(album.id);
								filterAlbums(album.id);
								}}>
									{thumbs.map(item => {
										if (item.albumId === album.id) {
											return  <img key={item.id} src={item.thumbnailUrl} className="thumb" alt={item.title} />
										}
									})}
								<p>{album.title}</p>
							</li>
							{selectedAlbum ? (
								<button
									className="back"
									onClick={() => {
										onSelectAlbum(null);
										getAlbums();
									}}>
									Back
								</button>
							) : (
								null
							)}
						</>
					);
				}
			})}
		</ul>
	);
};

export default Album;
