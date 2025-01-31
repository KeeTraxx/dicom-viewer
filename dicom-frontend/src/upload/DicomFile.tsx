import axios from "axios";
import { useEffect, useState } from "react";

interface DicomFileProps {
    file: File
}

function DicomFile(props: DicomFileProps) {
    const [progress, setProgress] = useState(0);
    const [patient, setPatient] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const buffer = await props.file.arrayBuffer();
            const response = await axios.put('http://localhost:4000/api/upload', buffer, {
                headers: {
                    'Content-Type': 'application/dicom',
                    'x-original-file-name': props.file.name
                },
                onUploadProgress: (progressEvent) => {
                    console.log(progressEvent.progress);
                    setProgress(progressEvent.progress ?? 0);
                }
            });

            setPatient(`Successfully uploaded for patient: ${response.data.patient.name}`);
        })();
    }, [props.file]);

    return (
        <>
            <div>{props.file.name} <progress value={progress} max="1" /> {patient}</div>
        </>
    );
}

export default DicomFile;