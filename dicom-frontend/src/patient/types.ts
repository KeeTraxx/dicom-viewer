export interface Patient {
    id: string;
    name: string;
    birthDate: number;
    sex: string;
    age: string;
    weight: string;
    createdAt: string;
    DicomFiles: DicomFile[]
}

export interface DicomFile {
    id: string;
    fileName: string;
    studyDate: string;
    studyTime: number;
    studyDescription: string;
    seriesDate: string;
    seriesTime: number;
    seriesDescription: string;
    physicianName: string;
    manufacturer: string;
    manufacturerModelName: string;
    modality: string;
    createdAt: string;
}