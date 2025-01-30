import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { gql } from '../helper/graphql';
import './Patients.css';
import { Patient } from './types';

function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    (async () => {
      const patientsReponse = await gql(`
        {
          patients {
            id
            name
            birthDate
            sex
            age
            weight
            createdAt
          }
        }
    `);
      setPatients(patientsReponse.patients);
    })();
  }, []);

  return (
    <>
      <main>
        <h1>Patients</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{new Date(patient.birthDate).toDateString()}</td>
                <td><NavLink to={`/patient/${patient.id}`}>🔍</NavLink></td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  )
}

export default Patients
