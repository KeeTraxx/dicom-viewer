import { useEffect, useRef, useState } from "react";
import { DicomFile } from "../patient/types";
import axios from "axios";
import dicomts from 'dicom.ts'
import Renderer from 'dicom.ts'

export interface DicomPreviewProps {
    dicomFile: DicomFile;
}

function DicomPreview({ dicomFile }: DicomPreviewProps) {
    const canvasRef = useRef(null);
    const [metadata, setMetadata] = useState({
        width: 0,
        height: 0,
        bitsAllocated: 0,
        bitsStored: 0,
        photometricInterpretation: ''
    });
    useEffect(() => {
        (async () => {
            const response = await axios.get(`/api/fetch/${dicomFile.id}`, { responseType: 'arraybuffer' });

            // get the DCM image
            const image = dicomts.parseImage(new DataView(response.data).buffer);

            if (!image || !canvasRef.current) {
                return;
            }

            setMetadata({
                width: image.columns,
                height: image.rows,
                bitsAllocated: image.bitsAllocated,
                bitsStored: image.bitsStored,
                photometricInterpretation: image.photometricInterpretation
            });

            await Renderer.render(image, canvasRef.current, 0.5);

        })();
    }, [dicomFile.id]);
    return (
        <div className="container">
            <div className="preview-box">
                <div>
                    <canvas ref={canvasRef} />
                    <div style={{ textAlign: 'center' }}>
                        <div>{metadata.width} x {metadata.height} pixels</div>
                        <div>{metadata.bitsStored}/{metadata.bitsAllocated}bits</div>
                        <div>{metadata.photometricInterpretation}</div>
                    </div>
                </div>
                <div>
                    <dl>
                        <dt>Filename</dt>
                        <dd>{dicomFile.fileName}</dd>
                        <dt>Modality</dt>
                        <dd>{dicomFile.modality}</dd>
                        <dt>Study date</dt>
                        <dd>{new Date(dicomFile.studyDate).toDateString()}</dd>
                        <dt>Series description</dt>
                        <dd>{dicomFile.seriesDescription}</dd>
                        <dt>Series date</dt>
                        <dd>{new Date(dicomFile.seriesDate).toDateString()}</dd>
                        <dt>Manufacturer</dt>
                        <dd>{dicomFile.manufacturer}</dd>
                        <dt>Manufacturer model name</dt>
                        <dd>{dicomFile.manufacturerModelName}</dd>
                    </dl>
                    <a href={`/api/fetch/${dicomFile.id}`}><button>Download</button></a>
                </div>
            </div>
        </div>
    )
}

export default DicomPreview;