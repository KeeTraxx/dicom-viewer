import axios from 'axios';
import { useState } from 'react';
import { DicomFile as DT, Patient } from '../patient/types';
import DicomFile from './DicomFile';
import './Upload.css';

export interface FileUpload {
    file: File,
    progress: number,
    state: FileUploadState,
    successData?: FileUploadMetaData
}

interface FileUploadMetaData {
    patient: Patient,
    dicomFile: DT
}

export enum FileUploadState {
    Queued,
    Uploading,
    Complete,
    Error
}

function Upload() {
    let files : FileUpload[] = [];
    const [filesState, setFiles] = useState<FileUpload[]>([]);
    function noop(e: React.DragEvent) {
        e.stopPropagation();
        e.preventDefault();

    }

    async function startNextDownloads(allFiles: FileUpload[]) {
        console.log(allFiles);
        while (allFiles.some(f => f.state === FileUploadState.Queued)) {
            const next = allFiles.find(f => f.state === FileUploadState.Queued);
            console.log('next', next);
            if (next) {
                console.log('upload', next);
                await upload(next);
                console.log('done upload', next);
            } else {
                console.log('no more files to upload');
            }
        }
    }

    async function upload(file: FileUpload) {
        file.state = FileUploadState.Uploading;
        const buffer = await file.file.arrayBuffer();
        const response = await axios.put('/api/upload', buffer, {
            headers: {
                'Content-Type': 'application/dicom',
                'x-original-file-name': file.file.name
            },
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent.progress);
                file.progress = progressEvent.progress ?? 0;
                updateFile(file);
            }
        });
        file.state = FileUploadState.Complete;
        file.successData = {
            patient: response.data.patient,
            dicomFile: response.data.dicomFile
        }
        updateFile(file);
    }

    function updateFile(file: FileUpload) {
        console.log('updateFile', file, files);
        const index = files.findIndex(f => f.file.name === file.file.name);
        files[index] = file;
        console.log(files);
        setFiles([...files]);
    }

    function drop(e: React.DragEvent) {
        noop(e);

        if (e?.dataTransfer?.files) {
            const newFiles = [...e.dataTransfer.files].map(file => ({
                file,
                progress: 0,
                state: FileUploadState.Queued
            }));
            files = [
                ...files,
                ...newFiles
            ];
            setFiles(files);
            startNextDownloads(files);
        }
    }
    return (
        <>
            <main>
                <h1>Upload</h1>
                <div className="dropzone" onDragEnter={noop} onDragOver={noop} onDrop={drop}>
                    <div>Drop DICOM Files here...</div>
                    {filesState.map((fileUpload) => (<DicomFile key={fileUpload.file.name} fileUpload={fileUpload} />))}
                </div>
            </main>
        </>
    )
}



export default Upload;