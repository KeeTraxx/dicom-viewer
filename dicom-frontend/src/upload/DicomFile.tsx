import { FileUpload, FileUploadState } from "./Upload";

interface DicomFileProps {
    fileUpload: FileUpload
}

function DicomFile(props: DicomFileProps) {

    function icon(state: FileUploadState) { 
        switch (state) {
            case FileUploadState.Queued:
                return '⏳';
            case FileUploadState.Uploading:
                return '⮸';
            case FileUploadState.Complete:
                return '✅';
        }
    }

    return (
        <>
            <div className="horizontal">
                <div>
                    {icon(props.fileUpload.state)}
                </div>
                <div>
                    <small>{props.fileUpload.file.name}</small>
                </div>
                <progress value={props.fileUpload.progress} max="1" />
                {props.fileUpload.successData?.patient.name}
            </div>
        </>
    );
}

export default DicomFile;