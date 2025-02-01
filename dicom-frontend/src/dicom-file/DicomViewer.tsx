import dicomts from 'dicom.ts'
import { useEffect, useRef } from 'react';
import './DicomViewer.css';
import DicomAnnotator from './DicomAnnotator';

interface DicomViewerProps {
    dcmImage: Renderer.DCMImage;
    onClose: () => void;
}

function DicoomViewer(props: DicomViewerProps) {
    const canvasRef = useRef(null);
    useEffect(() => {
        if (canvasRef.current === null) {
            return;
        }
        dicomts.render(props.dcmImage, canvasRef.current, 2);

    
    }, [props.dcmImage, canvasRef]);

    function annotator() {
        if (props.dcmImage && canvasRef.current) {
            return (<DicomAnnotator dcmImage={props.dcmImage} canvas={canvasRef.current} />);
        }
    }

    return (
        <>
            <div className='viewer' onMouseUp={() => props.onClose()}>
                <div className='overlay' onMouseUp={(e) => e.stopPropagation()}>
                    <canvas ref={canvasRef}></canvas>
                    {annotator()}
                </div>
            </div>
        </>
    )
}

export default DicoomViewer;