import { useEffect, useState } from 'react';
import { fetchAlbums, fetchPhotos } from '../../requests';

import './Album.css';

const Album = ({ selectedUser, selectedAlbum, onSelectAlbum }) => {
	const [albums, setAlbums] = useState([]);
	const [thumbs, setThumbs] = useState([]);
	const [photos, setPhotos] = useState([]);
	const [chosenAlbum, setChosenAlbum] = useState(false);

	const getAlbums = async () => {
		const albumsFromServer = await fetchAlbums();
		setAlbums(albumsFromServer);
	};

	const chunkArr = (arr, size, splice = null) => {
		let res = [];
		while (arr.length) {
			res.push(arr.splice(0, size));
		}

		if (splice) {
			return res
				.map(arr => {
					return arr.splice(0, splice);
				})
				.flat();
		}
		return res;
	};

	useEffect(() => {
		const getPhotos = async () => {
			const photosFromServer = await fetchPhotos();
			// const filteredPhotos = photosFromServer.filter(item => {
			// 	return selectedAlbum === item.albumId;
			// });
			// const chunkedPhotos = chunkArr(photosFromServer, 50);

			setPhotos(photosFromServer);
		};

		const getThumbs = async () => {
			const thumbsFromServer = await fetchPhotos();
			setThumbs(chunkArr(thumbsFromServer, 50, 4));
		};

		setChosenAlbum(false);
		getAlbums();
		getThumbs();
		getPhotos();
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
		setAlbums(filtered);
	};

	const chosenAlbumHandler = bool => {
		setChosenAlbum(bool);
	};

	return (
		<ul className="album-list">
			{albums.map(album => {
				if (selectedUser === album.userId) {
					return (
						<>
							<li
								className={`album-list__item${chosenAlbum ? ' chosen' : ''}`}
								key={album.id}
								onClick={() => {
									onSelectAlbum(album.id);
									filterAlbums(album.id);
									chosenAlbumHandler(true);
								}}>
								{thumbs.map(item => {
									if (item.albumId === album.id) {
										return <img key={item.id} src={item.thumbnailUrl} className="thumb" alt={item.title} />;
									}
								})}
								<p>{album.title}</p>
								<i className="photos-amount">{photos.filter(item => item.albumId === album.id).length} photos</i>
							</li>
							{selectedAlbum ? (
								<button
									className="back-btn"
									onClick={() => {
										onSelectAlbum(null);
										getAlbums();
										chosenAlbumHandler(false);
									}}>
									Back
								</button>
							) : null}
						</>
					);
				}
			})}
		</ul>
	);
};

export default Album;
