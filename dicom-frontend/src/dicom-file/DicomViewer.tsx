import dicomts from 'dicom.ts'
import { useEffect, useRef, useState } from 'react';
import './DicomViewer.css';
import DicomAnnotator from './DicomAnnotator';
import { DCMImage } from './models';

interface DicomViewerProps {
    dcmImage?: DCMImage;
    onClose: () => void;
}

function DicoomViewer(props: DicomViewerProps) {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        setCanvas(canvasRef.current);

        // @ts-expect-error too much of a hassle
        dicomts.render(props.dcmImage, canvasRef.current, 2);

    
    }, [props.dcmImage, canvas]);

    return (
        <>
            <div className='viewer' onMouseUp={() => props.onClose()}>
                <div className='overlay' onMouseUp={(e) => e.stopPropagation()}>
                    <canvas ref={canvasRef}></canvas>
                    <DicomAnnotator dcmImage={props.dcmImage} canvas={canvas} />
                </div>
            </div>
        </>
    )
}

export default DicoomViewer;