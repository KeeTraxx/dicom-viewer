import dicomts from 'dicom.ts'
import { useEffect, useRef, useState } from 'react';
import './DicomViewer.css';
import DicomAnnotator from './DicomAnnotator';

interface DicomViewerProps {
    dcmImage: Renderer.DCMImage;
    onClose: () => void;
}

function DicoomViewer(props: DicomViewerProps) {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        setCanvas(canvasRef.current);
        dicomts.render(props.dcmImage, canvasRef.current, 2);

    
    }, [props.dcmImage, canvasRef.current, canvas]);

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