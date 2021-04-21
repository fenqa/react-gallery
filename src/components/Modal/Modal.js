import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import { Component } from 'react';

import './Modal.css';

class Carousel extends Component {
	render() {
		const { chosenPhoto, photos, onOverlayHandler } = this.props;

		const slidesIds = photos.map(photo => photo.id);
		const initSlide = slidesIds.findIndex(id => id === chosenPhoto);
		console.log(initSlide);

		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			initialSlide: initSlide - 1,
		};

		return (
			<div
				className="backdrop"
				onClick={e => {
					if (!e.target.classList.contains('backdrop')) {
						return;
					} else {
						onOverlayHandler(false);
					}
				}}>
				<Slider {...settings}>
					{photos.map(photo => {
						return (
							<div>
								<img key={photo.id} src={photo.url} alt={photo.title} className="carousel-photo" />
								<h4 className="carousel-title">{photo.title}</h4>
							</div>
						);
					})}
				</Slider>
			</div>
		);
	}
}

const Modal = props => {
	const carousel = document.getElementById('carousel');
	return ReactDOM.createPortal(<Carousel photos={props.photos} chosenPhoto={props.chosenPhoto} onOverlayHandler={props.onOverlayHandler} />, carousel);
};

export default Modal;
