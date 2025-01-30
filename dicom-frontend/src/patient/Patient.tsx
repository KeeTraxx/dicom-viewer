import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import DicomPreview from '../dicom-file/DicomPreview';
import { gql } from '../helper/graphql';
import './Patients.css';
import type { Patient as P } from './types';


function Patient() {
  const [patient, setPatient] = useState<P>();
  let {patientId} = useParams();

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
  }, []);

  return (
    <>
      <main>
        <h1>Patient {patient?.name}</h1>
        <dl>
          <dt>DOB</dt>
          <dd>{patient?.birthDate}</dd>
          <dt>Sex</dt>
          <dd>{patient?.sex}</dd>
          <dt>Weight</dt>
          <dd>{patient?.weight} kg</dd>
        </dl>
        {patient?.DicomFiles.map((file) => (
          <DicomPreview key={file.id} dicomFile={file} />
        ))}
      </main>
    </>
  )
}

export default Patient
