import { useState } from 'react';
import './Upload.css';
import DicomFile from './DicomFile';


function Upload() {
    let [files, setFiles] = useState<File[]>([]);
    function noop(e: React.DragEvent) {
        e.stopPropagation();
        e.preventDefault();
    
    }
    
    function drop(e: React.DragEvent) {
        noop(e);
        console.log(e, e.dataTransfer.files[0]);
        
        if (e?.dataTransfer?.files) {
            [...e.dataTransfer.files].forEach(file => {
                setFiles([...files, file])
            });
        } 
    }
    return (
        <>
            <main>
                <h1>Upload</h1>
                <div className="dropzone" onDragEnter={noop} onDragOver={noop} onDrop={drop}>
                    <div>Drop DICOM Files here...</div>
                    {files.map((file) => (<DicomFile key={file.name} file={file} />))}
                </div>
            </main>
        </>
    )
}



export default Upload;