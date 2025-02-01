import * as d3 from 'd3';
import { useLayoutEffect, useRef } from "react";

interface DicomAnnotatorProps {
    dcmImage: Renderer.DCMImage,
    canvas: HTMLCanvasElement
}

interface AnnotationLine {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

function DicomAnnotator(props: DicomAnnotatorProps) {

    const svgRef = useRef(null);

    let dragData: AnnotationLine | null = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    }

    const lines: Array<AnnotationLine> = [];

    const dragBehaviour = d3.drag()
        .on('start', (ev, d) => {
            console.log('dragstart', ev, d);
            dragData = {
                startX: ev.x,
                startY: ev.y,
                endX: ev.x,
                endY: ev.y,
            }
            console.log(dragData);
        })
        .on('drag', (ev, d) => {
            if (dragData) {
                dragData.endX = ev.x;
                dragData.endY = ev.y;
            }
            render();
        })
        .on('end', (ev, d) => {
            if (dragData) {
                lines.push(dragData);
            }
            dragData = null;
            render();
        });

    function render() {
        d3.select(svgRef.current)
            .select('g.lines')
            .selectAll('line')
            .data(lines)
            .join('line')
            .attr('x1', d => d.startX)
            .attr('y1', d => d.startY)
            .attr('x2', d => d.endX)
            .attr('y2', d => d.endY);

        d3.select(svgRef.current)
            .select('g.drag')
            .selectAll('line')
            .data(dragData ? [dragData] : [])
            .join('line')
            .call(drawLine);
    }

    function drawLine(line: d3.Selection<SVGLineElement, AnnotationLine, SVGGElement, unknown>) {
        line.attr('x1', d => d.startX)
        .attr('y1', d => d.startY)
        .attr('x2', d => d.endX)
        .attr('y2', d => d.endY);
    }

    useLayoutEffect(() => {
        if (!props.canvas || !props.dcmImage) {
            return;
        }
        const svgEl = d3.select(svgRef.current);
        svgEl.attr('width', props.canvas.width);
        svgEl.attr('height', props.canvas.height);

        svgEl.call(dragBehaviour as any);

    }, [svgRef, props.canvas, props.dcmImage]);

    return (
        <>
            <svg ref={svgRef}>
                <circle cx="20" cy="20" r="15" fill="red"></circle>
                <g className="lines"></g>
                <g className="drag"></g>
            </svg>
        </>
    )
}
export default DicomAnnotator;