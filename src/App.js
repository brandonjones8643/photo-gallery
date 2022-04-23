import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DisplayImages from './DisplayImages';
import './App.css';

export default function App() {
  // This obj holds all uploaded images.
  const [library, setLibrary] = useState({
    homeGallery: [],
    favorites: [],
    archive: [],
    trash: [],
  });
  // These states determine what is open/closed on the page.
  const [navOpen, setNavOpen] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [showMoveOptions, setShowMoveOptions] = useState(false);
  const [currentImage, setCurrentImage] = useState({});

  /* 
    This function decides what to do when an image is moved
    by the user and updates the state.
  */
  const moveImage = (destination, str) => {
    const tempArr = destination ? destination.slice() : [];
    tempArr.push({
      data: currentImage.data,
      url: currentImage.url,
      id: Math.random(),
      date: currentImage.date,
    });

    if (str === 'trash' && window.location.pathname.toString() === '/Trash') {
      library.trash.splice(currentImage, 1);
      setImageClicked(false);
      setShowMoveOptions(false);
      return;
    }
    switch (str) {
      case 'homeGallery':
        setLibrary({ ...library, homeGallery: tempArr });
        break;
      case 'favorites':
        setLibrary({ ...library, favorites: tempArr });
        break;
      case 'archive':
        setLibrary({ ...library, archive: tempArr });
        break;
      case 'trash':
        setLibrary({ ...library, trash: tempArr });
        break;
      default:
        console.log('error');
    }
    switch (window.location.pathname.toString(currentImage)) {
      case '/Favorites':
        library.favorites.splice(currentImage, 1);
        break;
      case '/Archive':
        library.archive.splice(currentImage, 1);
        break;
      case '/Trash':
        library.trash.splice(currentImage, 1);
        break;
      default:
        library.homeGallery.splice(currentImage, 1);
    }
    setShowMoveOptions(false);
    setImageClicked(false);
  };

  /* 
  These props are passed to all instances of the diplayImages 
  component and are defined once here.
  */
  const defaultPropsForDisplayImages = {
    setImageClicked: setImageClicked,
    setCurrentImage: setCurrentImage,
    setNavOpen: setNavOpen,
    setImages: setLibrary,
  };

  return (
    <div>
      <Router>
        {/*
        This opens navigation and closes a closes a clicked image 
        when navbar is opened.
        */}
        {navOpen ? (
          <>
            <button
              className='nav-button'
              onClick={() => setNavOpen(!navOpen)}
            ></button>
            <div className='nav-links'>
              <Link to='/'>Images</Link>
              <Link to='/Favorites'>Favorites</Link>
              <Link to='/Archive'>Archive</Link>
              <Link to='/Trash'>Trash</Link>
            </div>
          </>
        ) : (
          <button
            className='nav-button'
            onClick={() => {
              setNavOpen(!navOpen);
              setImageClicked(false);
            }}
          ></button>
        )}
        {/*
        This code decides what to do when an image is clicked,
        namely showing the full image and options for the user
        to choose from about what to do with the selection.
        */}
        {imageClicked && (
          <div>
            <img className='clicked-image' src={currentImage.url} alt='' />
            <div className='picture-menu'>
              <button
                className='link-button'
                onClick={() => setShowMoveOptions(true)}
              >
                Move to
              </button>
              <button
                className='link-button'
                onClick={() => moveImage(library.trash, 'trash')}
              >
                Delete
              </button>
              <button
                className='link-button'
                onClick={() => setImageClicked(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/*
        These buttons will call the moveImage function and pass
        parameters to it. showMoveOptions is set to true when
        an image is clicked.
        */}
        {showMoveOptions && (
          <div className='picture-menu'>
            <button
              onClick={() => {
                moveImage(library.favorites, 'favorites');
              }}
              className='link-button'
            >
              Favorites
            </button>
            <button
              onClick={() => {
                moveImage(library.archive, 'archive');
              }}
              className='link-button'
            >
              Archive
            </button>
            <button
              onClick={() => {
                moveImage(library.homeGallery, 'homeGallery');
              }}
              className='link-button'
            >
              Images
            </button>
            <button
              onClick={() => setShowMoveOptions(false)}
              className='link-button'
            >
              Close
            </button>
          </div>
        )}

        <Routes>
          <Route
            path='/'
            element={
              <DisplayImages
                showUploadButton={true}
                title={'Images'}
                images={library.homeGallery}
                library={library}
                {...defaultPropsForDisplayImages}
              />
            }
          />

          <Route
            path='/Favorites'
            element={
              <DisplayImages
                title={'Favorites'}
                images={library.favorites}
                {...defaultPropsForDisplayImages}
              />
            }
          />

          <Route
            path='/Archive'
            element={
              <DisplayImages
                title={'Archive'}
                images={library.archive}
                {...defaultPropsForDisplayImages}
              />
            }
          />

          <Route
            path='/Trash'
            element={
              <DisplayImages
                title={'Trash'}
                images={library.trash}
                showEmptyTrashButton={true}
                {...defaultPropsForDisplayImages}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
