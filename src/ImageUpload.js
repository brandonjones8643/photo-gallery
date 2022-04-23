import React from 'react';

  export default function ImageUpload(props) {
    
    const handleImageUpload = e => {
      const tempArr = props.library.homeGallery ? props.library.homeGallery.slice() : [];
    
      [...e.target.files].forEach(file => {
        tempArr.push({
          data: file,
          url: URL.createObjectURL(file),
          id: Math.random(),
          date: new Date().toLocaleDateString()
        });
      });
    
      props.setLibrary({...props.library, homeGallery:tempArr})
      e.target.value = null;
    };

    return (
      <label className = 'custom-file-input'>
        <input
          className = 'file-input'
          type = 'file' multiple 
          onChange = {handleImageUpload}
          accept = 'image/*'
        />
      </label>
    )
}