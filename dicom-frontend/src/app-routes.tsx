import { Route, Routes } from 'react-router'
import Patients from './patient/Patients'
import Upload from './upload/Upload'
import Patient from './patient/Patient'

function AppRoutes() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Patients />} />
        <Route path="/patient/:patientId" element={<Patient />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  )
}

export default AppRoutes
