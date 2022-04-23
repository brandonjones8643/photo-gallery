import { useEffect } from 'react';
import ImageUpload from './ImageUpload';

export default function DisplayImages(props) {
  const images = props.images || [];
  const setImages = props.setImages;
  const title = props.title;
  const setCurrentImage = props.setCurrentImage;
  const setImageClicked = props.setImageClicked;
  const setNavOpen = props.setNavOpen;

  const emptyTrash = () => {
    setImages([]);
  };

  useEffect(() => {
    document.body.scrollTop = 0;
  }, [title]);

  return (
    <div>
      <h1 className='title'>{title}</h1>

      {/*
      This code checks if there are no images in the componet
      and displays a notification to the user if so.
      */}
      {JSON.stringify(images) === '[]' && (
        <h4 className='banner'>
          Your {title.toLowerCase()} will be displayed here.
        </h4>
      )}
      {/*
      This code will run if the user navigates to home gallery.
      */}
      {props.showUploadButton === true && (
        <div className='image-upload-container'>
          <ImageUpload library={props.library} setLibrary={props.setImages} />
        </div>
      )}
      {/*
      This code will run if the user navigates to trash.
      */}
      {props.showEmptyTrashButton === true && (
        <button className='empty-trash-button' onClick={emptyTrash}>
          Empty Trash
        </button>
      )}
      {/*
      This returns a list of images. When an image is clicked
      the state of current image is set to the clicked image.
      */}
      <div className='container'>
        {images?.map(img => (
          <li className='images-container' key={img.id}>
            <h3 className='image-date'>{img.date}</h3>
            <img
              className='img'
              onClick={() => {
                setCurrentImage({
                  data: img.data,
                  id: img.id,
                  url: img.url,
                  date: img.date,
                });
                setImageClicked(true);
                setNavOpen(false);
              }}
              src={img.url}
              loading='auto'
              alt='...'
            />
          </li>
        ))}
      </div>
    </div>
  );
}
