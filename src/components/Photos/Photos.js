import { useEffect, useState } from 'react';
import { fetchPhotos } from '../../requests';
import Modal from '../Modal/Modal';

import './Photos.css';

const Photo = ({ selectedAlbum }) => {
	const [photos, setPhotos] = useState([]);
	const [overlay, setOverlay] = useState(false);
	const [chosenPhoto, setChosenPhoto] = useState(null);

	useEffect(() => {
		const getPhotos = async () => {
			const photosFromServer = await fetchPhotos();
			const filteredPhotos = photosFromServer.filter(item => {
				return selectedAlbum === item.albumId;
			});

			setPhotos(filteredPhotos);
		};

		getPhotos();
	}, [selectedAlbum]);

	const overlayHandler = val => {
		setOverlay(val);
	};

	const chosenPhotoHandler = id => {
		setChosenPhoto(id);
	};

	return (
		<div>
			<div className="img-container">
				{photos.map(photo => {
					return (
						<img
							key={photo.id}
							className="album-photo"
							src={photo.url}
							alt={photo.title}
							onClick={() => {
								overlayHandler(true);
								chosenPhotoHandler(photo.id);
							}}
						/>
					);
				})}
			</div>
			{overlay && <Modal photos={photos} chosenPhoto={chosenPhoto} onOverlayHandler={overlayHandler} />}
		</div>
	);
};

export default Photo;
