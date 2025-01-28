'use client';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Trash2 } from 'lucide-react'; 
interface ImageUploadProps {
  imageUrl: string | null;
  setImageUrl: (url: string | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imageUrl, setImageUrl }) => {
  const handleRemoveImage = () => {
    setImageUrl(null); 
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

   
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImageUrl(data.url); 
        } else {
          alert('Erro ao enviar o arquivo');
        }
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        alert('Erro ao enviar o arquivo');
      }
    }
  }, [setImageUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 800 * 1024, 
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif'], 
    },
  });

  return (
    <>
      {imageUrl ? (
        <div className="relative">
          <div className='flex justify-center'>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-auto max-h-[300px]"
            />
          </div>
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <img src='/assets/uploadIcon.png' alt='upload' className="mx-auto h-51 w-73 text-gray-400" />
          <p className="mt-2">Arraste e solte a imagem aqui ou clique para upload!</p>
          <p className="text-sm text-gray-500 mt-1">
            Largura X altura recomendada 1000 x 1000px. Tamanho máximo 800KB.
          </p>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
