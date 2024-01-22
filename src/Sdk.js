import axios from 'axios';

const baseUrl = 'http://localhost:5083/DentistScheduler';
const config = {'Content-Type': 'application/json'};

export const getAppointments = async (firstName, lastName, startTime, endTime)  => {
    try{
        const response = await axios.get(`${baseUrl}/appointments`, null, { params: {
            firstName, lastName, startTime, endTime
          }});
        return response.data;
    }
    catch(error){
        console.error('Error getting appointments:', error);
        throw error;
    }
}

export const getAppointmentById = async (id) => {
    try{
        const response = await axios.get(`${baseUrl}/${id}`);
        return response.data;
    }
    catch(error){
        console.error('Error getting appointments:', error);
        throw error;
    }
}

export const createAppointment = async (appointmentData) => {
    try {
        const response = await axios.post(`${baseUrl}`, appointmentData, config);
        return response.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        throw error;
    }
};

export const updateAppointment = async (appointmentData) => {
    try {
        const response = await axios.put(`${baseUrl}/${appointmentData.id}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
}

export const deleteAppointment = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
}

