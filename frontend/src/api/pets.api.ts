import { petsRoute } from "./config.api";

export interface PetAPIResponseDto {
    OwnerGovernmentID: number;
    petName: string;
    petSpecie: string;
    petRace: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface CreatePetDto {
    OwnerGovernmentID: number;
    petName: string;
    petSpecie: string;
    petRace: string;
}

export async function createPet(createPetDto: CreatePetDto) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(petsRoute, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(createPetDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error creating pet");
            }

            throw new Error(errorBody.message);
        }

        const results: PetAPIResponseDto = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function findAllPets() {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(petsRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching pets");
            }

            throw new Error(errorBody.message);
        }

        const results: PetAPIResponseDto[] = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function findPet(_id: string) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${petsRoute}/${_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching pet");
            }

            throw new Error(errorBody.message);
        }

        const results: PetAPIResponseDto = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

interface UpdatePetDto {
    OwnerGovernmentID?: number;
    petName?: string;
    petRace?: string;
    petSpecie?: string;
}

export async function updatePet(_id: string, updatePetDto: UpdatePetDto) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${petsRoute}/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatePetDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error updating pet");
            }

            throw new Error(errorBody.message);
        }

        const results: boolean = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function deletedPet(_id: string) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${petsRoute}/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error updating pet");
            }

            throw new Error(errorBody.message);
        }

        const results: boolean = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}
