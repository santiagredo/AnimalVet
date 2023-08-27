import { appointmentsRoute } from "./config.api";

export interface AppointmentAPIResponseDto {
    serviceName: string;
    appointmentDate: Date;
    governmentID: number;
    name: string;
    email: string;
    phone: number;
    petName: string;
    petSpecie: string;
    petRace: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface CreateAppointmentDto {
    serviceName: string;
    appointmentDate: Date;
    governmentID: number;
    name: string;
    email: string;
    phone: number;
    petName: string;
    petSpecie: string;
    petRace: string;
}

export async function createAppointment(
    createAppointmentDto: CreateAppointmentDto
) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(appointmentsRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(createAppointmentDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error creating appointment");
            }

            throw new Error(errorBody.message);
        }

        const results: AppointmentAPIResponseDto = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function findAllAppointmnets() {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(appointmentsRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching all apointments");
            }

            throw new Error(errorBody.message);
        }

        const results: AppointmentAPIResponseDto[] = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function findOneAppointment(_id: string) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${appointmentsRoute}/${_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching apointment");
            }

            throw new Error(errorBody.message);
        }

        const results: AppointmentAPIResponseDto = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

interface UpdateAppointmentDto {
    serviceName?: string;
    appointmentDate?: Date;
    governmentID?: number;
    name?: string;
    email?: string;
    phone?: number;
    petName?: string;
    petSpecie?: string;
    petRace?: string;
}

export async function updateAppointment(
    _id: string,
    updateAppointmentDto: UpdateAppointmentDto
) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${appointmentsRoute}/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateAppointmentDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error updating apointment");
            }

            throw new Error(errorBody.message);
        }

        const results: AppointmentAPIResponseDto = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteAppointment(_id: string) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${appointmentsRoute}/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (errorBody.message) {
                throw new Error("Error deleting apointment");
            }

            throw new Error(errorBody.message);
        }

        const results: boolean = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}
