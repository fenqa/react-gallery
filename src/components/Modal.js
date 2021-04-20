import ReactDOM from 'react-dom'

const Backdrop = (props) => {
    return <div className="backdrop" onClick={() => {props.onOverlayHandler(false)}}></div>
}

const Carousel = (props) => {
    return <>{props.photos.map(photo => {
        if(props.chosenPhoto === photo.id) {
            return <img key={photo.id} src={photo.url} alt={photo.title} className="carousel-photo"/>
        }
    })}</>
}

const Modal = (props) => {
    const backdrop = document.getElementById('backdrop')
    const carousel = document.getElementById('carousel')
    return (

        <>
         {ReactDOM.createPortal(<Backdrop onOverlayHandler={props.onOverlayHandler}/>, backdrop)}
         {ReactDOM.createPortal(<Carousel photos={props.photos} chosenPhoto={props.chosenPhoto}/>, carousel)}
        </>
   
    )
}

export default Modal
