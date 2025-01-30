import { useEffect, useRef, useState } from "react";
import { DicomFile } from "../patient/types";
import axios from "axios";
import dicomts from 'dicom.ts'

export interface DicomPreviewProps {
    dicomFile: DicomFile;
}

function DicomPreview({ dicomFile }: DicomPreviewProps) {
    const [size, setSize] = useState({ width: 600, height: 600 });
    const canvasRef = useRef(null);
    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/fetch/${dicomFile.id}`, { responseType: 'arraybuffer' });

            // get the DCM image
            const image = dicomts.parseImage(new DataView(response.data).buffer);

            const renderer = new dicomts.Renderer(canvasRef.current);

            // decode, and display frame 0 on the canvas
            await renderer.render(image, 0);
        })();
    }, []);
    return (
        <div>
            <div>
                <canvas ref={canvasRef} width={size.width} height={size.height} />
            </div>
            <dl>
                <dt>Filename</dt>
                <dd>{dicomFile.fileName}</dd>
                <dt>Modality</dt>
                <dd>{dicomFile.modality}</dd>
                <dt>Study date</dt>
                <dd>{new Date(dicomFile.studyDate).toDateString()}</dd>
                <dt>Series date</dt>
                <dd>{new Date(dicomFile.seriesDate).toDateString()}</dd>
                <dt>Manufacturer</dt>
                <dd>{dicomFile.manufacturer}</dd>
                <dt>Manufacturer model name</dt>
                <dd>{dicomFile.manufacturerModelName}</dd>
            </dl>

        </div>
    )
}

export default DicomPreview;