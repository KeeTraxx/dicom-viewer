

export interface DCMImage {
    acquiredSliceDirection: number;
    bitsAllocated: number;
    bitsStored: number;
    columns: number;
    dataScaleElscint: number;
    dataScaleIntercept: number;
    dataScaleSlope: number;
    dataType: number;
    echoNumber: number;
    imageDescription: string;
    imageDirections: Array<number>;
    imageMax?: number;
    imageMin?: number;
    imageNumber: number;
    imagePosition: Array<number>;
    imageType: Array<string>;
    modality: string;
    numberOfFrames: number;
    orientation?: string | null;
    patientID?: string;
    patientName: string;
    photometricInterpretation: string;
    pixelBandwidth: number | null;
    pixelPaddingValue: number | null;
    pixelRepresentation: number | null;
    pixelSpacing: Array<number>;
    planarConfig: number;
    rows: number;
    samplesPerPixel: number;
    seriesDescription: string;
    seriesId: string;
    seriesInstanceUID: string;
    seriesNumber: number;
    sliceGap: number;
    sliceLocation: number;
    sliceLocationVector: Array<number>;
    sliceThickness: number;
    studyDate: string;
    studyTime: string;
    temporalNumber: number;
    temporalPosition: number;
    transferSyntax: string;
    windowCenter: number;
    windowWidth: number;
}