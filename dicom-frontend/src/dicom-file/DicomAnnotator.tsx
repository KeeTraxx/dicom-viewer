import { useEffect, useRef } from "react";
import * as d3 from 'd3';

interface DicomAnnotatorProps { 
    dcmImage: Renderer.DCMImage,
    canvas: HTMLCanvasElement
}

function DicomAnnotator(props: DicomAnnotatorProps) {

    const svgRef = useRef(null);

    useEffect(() => {
        const svgEl = d3.select(svgRef.current);
        console.log('svgref', svgRef.current, props);
        svgEl.on('mouseover', (ev, target) => console.log(ev));
        console.log('canvas', props.canvas);
    }, []);
    return (
        <>
            <svg ref={svgRef}>
                <circle cx="20" cy="20" r="15" fill="red"></circle>
            </svg>
        </>
    )
}
export default DicomAnnotator;