import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ onFileAccepted }) {
  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const imagePromises = acceptedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onabort = () =>
            reject(new Error(`Cancel reading ${file.name}`));
          reader.onerror = () =>
            reject(new Error(`Reading ${file.name} failed`));
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises)
        .then((textureUrls) => {
          // console.log(textureUrls);
          onFileAccepted(textureUrls);
          setSelectedImages(textureUrls);
          // textureUrls.forEach((tetureUrl) => onFileAccepted(tetureUrl));
        })
        .catch((err) => console.error(err.message));
    },
    [onFileAccepted]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    // accept: { "image/*": [".jpeg", ".png", ".gif", ".webp"] },
    // multiple:true
  });

  const dropzoneClasses = `
    flex items-center justify-center border-2 border-dashed rounded-lg
    transition-all duration-300 cursor-pointer w-12 h-12
    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
    ${isDragAccept ? 'border-green-500 bg-green-50' : ''}
    ${isDragReject ? 'border-red-500 bg-red-50' : ''}
  `

  return (
    <div {...getRootProps()} className={dropzoneClasses}>
      <input {...getInputProps()} />
      {selectedImages.length>0 ? (
          <img
            src={selectedImages[0]}
            className="w-full h-full object-cover"
          />
        ) : (
          <div>{isDragActive ? <p>Main Image Tex</p> : <p>Main Image Tex</p>}</div>
        )}
    </div>
  );
}

export default MyDropzone;
