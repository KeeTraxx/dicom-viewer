import * as d3 from 'd3';
import { useLayoutEffect, useRef } from "react";
import { DCMImage } from './models';

interface DicomAnnotatorProps {
    dcmImage?: DCMImage,
    canvas?: HTMLCanvasElement | null
}

interface AnnotationLine {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

function DicomAnnotator(props: DicomAnnotatorProps) {

    console.log(props);

    const svgRef = useRef(null);

    let dragData: AnnotationLine | null = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    }

    const lines: Array<AnnotationLine> = [];
    const dragBehaviour = d3.drag()
        .on('start', (ev) => {
            dragData = {
                startX: ev.x,
                startY: ev.y,
                endX: ev.x,
                endY: ev.y,
            }
        })
        .on('drag', (ev) => {
            if (dragData) {
                dragData.endX = ev.x;
                dragData.endY = ev.y;
            }
            render();
        })
        .on('end', () => {
            if (props.dcmImage &&dragData && distanceMM(dragData, props.dcmImage.pixelSpacing) > 5) {
                lines.push(dragData);
            }
            dragData = null;
            render();
        });

    function render() {
        const svg = d3.select(svgRef.current);
        svg.select('g.lines')
            .selectAll('line')
            .data(lines)
            .join('line')
            .style('stroke', (_, i) => d3.schemeAccent[i % d3.schemeAccent.length])
            .attr('x1', d => d.startX)
            .attr('y1', d => d.startY)
            .attr('x2', d => d.endX)
            .attr('y2', d => d.endY);

        svg.select('g.lineText')
            .selectAll('text')
            .data(lines)
            .join('text')
            .attr('x', d => (d.startX + d.endX) / 2)
            .attr('y', d => (d.startY + d.endY) / 2)
            .style('fill', (_, i) => d3.schemeAccent[i % d3.schemeAccent.length])
            .text(d => distanceMM(d, props?.dcmImage?.pixelSpacing).toFixed(2) + ' mm');

        svg.select('g.drag')
            .selectAll('line')
            .data(dragData ? [dragData] : [])
            .join('line')
            .call(drawLine);

        svg.select('g.dragText')
            .selectAll('text')
            .data(dragData ? [dragData] : [])
            .join('text')
            .attr('x', d => (d.startX + d.endX) / 2)
            .attr('y', d => (d.startY + d.endY) / 2)
            .text(d => distanceMM(d, props?.dcmImage?.pixelSpacing).toFixed(2) + ' mm');
    }

    function drawLine(line: d3.Selection<d3.BaseType, AnnotationLine, d3.BaseType, unknown>) {
        line.attr('x1', d => d.startX)
            .attr('y1', d => d.startY)
            .attr('x2', d => d.endX)
            .attr('y2', d => d.endY);
    }

    function distanceMM(line: AnnotationLine, dicomPixelSpacing?: Array<number>): number {
        if (dicomPixelSpacing === undefined) {
            return 0;
        }
        return Math.sqrt(Math.pow((line.endX - line.startX) * dicomPixelSpacing[1], 2) + Math.pow((line.endY - line.startY) * dicomPixelSpacing[0], 2));
    }

    useLayoutEffect(() => {
        if (!props.canvas || !props.dcmImage) {
            return;
        }
        const svgEl = d3.select(svgRef.current);

        svgEl.attr('width', props.canvas.width);
        svgEl.attr('height', props.canvas.height);

        // @ts-expect-error too much of a hassle
        svgEl.call(dragBehaviour);

    }, [svgRef, props.canvas, props.dcmImage, dragBehaviour]);

    return (
        <>
            <svg ref={svgRef}>
                <text x="10" y="20">Drag mouse to measure distances</text>
                <g className="lines"></g>
                <g className="lineText"></g>
                <g className="drag"></g>
                <g className="dragText"></g>
            </svg>
        </>
    )
}
export default DicomAnnotator;