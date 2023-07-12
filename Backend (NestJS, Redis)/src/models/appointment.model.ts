export interface TherapistAppointmentDto{
    id: number | null;
    therapistID: number,
    date: String,
    appointmentNumber: number,
    patientId: number
}

export interface PatientAppointmentDto{
    id: number|null; 
    date: String,
    appointmentNumber: number,
    usersAppointment: boolean
}