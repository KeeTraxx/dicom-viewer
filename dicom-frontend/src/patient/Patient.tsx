import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DicomPreview from '../dicom-file/DicomPreview';
import { gql } from '../helper/graphql';
import './Patient.css';
import type { Patient as P } from './types';


function Patient() {
  const [patient, setPatient] = useState<P>();
  const { patientId } = useParams();

  useEffect(() => {
    (async () => {
      const response = await gql(`
          query Patient($patientId: ID!) {
            patient(id: $patientId) {
              createdAt
              id
              name
              birthDate
              sex
              age
              weight
              DicomFiles {
                id
                fileName
                studyDate
                studyTime
                studyDescription
                seriesDate
                seriesTime
                seriesDescription
                physicianName
                manufacturer
                manufacturerModelName
                modality
                createdAt
              }
            }
          }`, {
        patientId
      });
      setPatient(response.patient);
    })();
  }, [patientId]);

  return (
    <>
      <h1>Patient {patient?.name}
        <sup>Sex: {patient?.sex}</sup>
        <sup>DOB: {patient?.birthDate ? new Date().toISOString().split('T')[0] : 'n/a'}</sup>
        <sup>Weight: {patient?.weight} kg</sup>
      </h1>

      <small>ID: {patient?.id}</small>
      <hr />
      
      {patient?.DicomFiles.map((file) => (
        <DicomPreview key={file.id} dicomFile={file} />
      ))}
    </>
  )
}

export default Patient
