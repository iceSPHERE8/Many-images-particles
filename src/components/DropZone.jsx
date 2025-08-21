import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ onFileAccepted, display }) {
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
    w-full h-5 px-4 flex mt-1 hover:cursor-pointer items-center justify-center text-sm font-handjet font-bold rounded-full bg-[#5f86bf] border-2 border-[#dadada] shadow-[inset_0px_2px_2px_rgba(255,255,255,1),inset_0px_6px_2px_rgba(255,255,255,0.6),inset_0px_-1px_2px_rgba(255,255,255,1),inset_0px_-4px_2px_rgba(255,255,255,0.3)] transition-all duration-300 ease-in-out hover:bg-[#436698] text-[14px] active:text-[12px]
    ${isDragActive ? "" : ""}
    ${isDragAccept ? "" : ""}
    ${isDragReject ? "" : ""}
  `;

  return (
    <>
      {display && (
        <div className="bg-[#041312] w-full h-48 flex justify-center rounded-md border-2 border-[#cacaca] shadow-[inset_0_2px_2px_rgba(255,255,255,0.5),inset_0_2px_1px_rgba(255,255,255,0.5),inset_0_-2px_4px_rgba(255,255,255,0.5),inset_0_-2px_1px_rgba(255,255,255,0.7),inset_0_6px_1px_rgba(255,255,255,0.5),inset_0_12px_2px_rgba(255,255,255,0.1)] relative overflow-hidden led-dot-matrix">
          {selectedImages.length > 0 && (
            <img
              src={selectedImages[0]}
              className="w-full h-full object-cover opacity-75"
            />
          )}
        </div>
      )}

      <div {...getRootProps()} className={dropzoneClasses}>
        <input {...getInputProps()} />
        <div className="font-handjet font-bold text-[#d0e7ff]">
          {
            <p className="text-center">
              main texture here
            </p>
          }
        </div>
      </div>
    </>
  );
}

export default MyDropzone;
