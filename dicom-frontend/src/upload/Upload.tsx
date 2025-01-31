import { useState } from 'react';
import './Upload.css';
import DicomFile from './DicomFile';


function Upload() {
    const [files, setFiles] = useState<File[]>([]);
    function noop(e: React.DragEvent) {
        e.stopPropagation();
        e.preventDefault();
    
    }
    
    function drop(e: React.DragEvent) {
        noop(e);
        
        if (e?.dataTransfer?.files) {
            const currentFiles = [...e.dataTransfer.files];
            currentFiles.push(...files);
            setFiles(currentFiles);
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