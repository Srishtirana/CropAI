import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';

const ImageUploader = ({ onImageUpload, onRemoveImage, previewUrl, className = '' }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageUpload(acceptedFiles[0], reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  });

  if (previewUrl) {
    return (
      <div className="relative group">
        <img
          src={previewUrl}
          alt="Preview"
          className={`w-full h-64 object-cover rounded-lg ${className}`}
        />
        <button
          type="button"
          onClick={onRemoveImage}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
          aria-label="Remove image"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 transition-colors ${className} ${
        isDragActive ? 'border-green-500 bg-green-50' : ''
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <Upload className="w-10 h-10 text-gray-400" />
        <p className="text-gray-600">
          {isDragActive ? 'Drop the image here' : 'Drag & drop an image here, or click to select'}
        </p>
        <p className="text-sm text-gray-500">Supports: JPG, PNG, WEBP (Max: 5MB)</p>
      </div>
    </div>
  );
};

export default ImageUploader;
