/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use strict";
import React, { useEffect, useState } from 'react';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

type Props = {};

const thumbsContainer: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb: React.CSSProperties = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner: React.CSSProperties = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img: React.CSSProperties = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

export default function DropZone({ }: Props) {

  const [files, setFiles] = useState<Array<{ name: string, preview: string, base64: string }>>([]);
  const { getRootProps, getInputProps } = useDropzone({
    // @ts-ignore
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const updatedFiles = acceptedFiles.map(file => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          setFiles(prevFiles => [
            ...prevFiles,
            { name: file.name, preview: URL.createObjectURL(file), base64 }
          ]);
        };
        reader.readAsDataURL(file);
        return Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
      });
      //@ts-ignore
      setFiles(updatedFiles);
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  console.log(files);

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' } as DropzoneRootProps)}>
        <input {...getInputProps() as DropzoneInputProps} />
        <p>Drag drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}
