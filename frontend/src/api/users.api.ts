import {
    createUsersEndpoint,
    loginUsersEndpoint,
    usersRoute,
} from "./config.api";

export interface UserAPIResponseDto {
    user: User;
    token: string;
}

export interface User {
    governmentID: number;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: number;
    userPets: string[];
    userAppointments: string[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

interface CreateUserDto {
    // All fields must not be empty

    // Minimum allowed ID value is 10000
    governmentID: number;
    name: string;
    email: string;

    // Minimum length is 5 characters
    password: string;
    address: string;
    phone: number;
}

export async function createUser(createUserDto: CreateUserDto) {
    try {
        const response = await fetch(createUsersEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createUserDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error creating user");
            }

            throw new Error(errorBody.message);
        }

        const results: UserAPIResponseDto = await response.json();

        if (results.token) {
            localStorage.setItem("jwt", results.token);

            return results.user;
        }
    } catch (error) {
        console.log(error);
    }
}

// Example to create a user:

// const createUserExample = {
//     governmentID: 1000000000,
//     name: "testing",
//     email: "email@email.com",
//     password: "password",
//     address: "address",
//     phone: 1234567890,
// };

// // Call function:
// createUser(createUserExample);

export interface LoginUserDto {
    // All fields must not be empty

    email: string;
    password: string;
}

export async function loginUser(loginUserDto: LoginUserDto) {
    try {
        const response = await fetch(loginUsersEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginUserDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error login in user");
            }

            throw new Error(errorBody.message);
        }

        const results: UserAPIResponseDto = await response.json();

        if (results.token) {
            localStorage.setItem("jwt", results.token);

            return results.user;
        }
    } catch (error) {
        console.log(error);
    }
}

// Example to log in a user:

// const loginUserExample = {
//     email: "email@email.com",
//     password: "password",
// };

// // Call function:
// loginUser(loginUserExample);

export async function findAllUsers() {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(usersRoute, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching users");
            }

            throw new Error(errorBody.message);
        }

        const results: UserAPIResponseDto[] = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function findUser(governmentID: number) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${usersRoute}/${governmentID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error fetching user");
            }

            throw new Error(errorBody.message);
        }

        const results: UserAPIResponseDto[] = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

interface UserPet {
    _id: string;
}

interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: number;
    userPets?: UserPet[];
}

export async function updateUser(
    governmentID: number,
    updateUserDto: UpdateUserDto
) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${usersRoute}/${governmentID}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateUserDto),
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error updating user");
            }

            throw new Error(errorBody.message);
        }

        const results: boolean = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUser(governmentID: number) {
    try {
        const token = localStorage.getItem("jwt");

        const response = await fetch(`${usersRoute}/${governmentID}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();

            if (!errorBody.message) {
                throw new Error("Error updating user");
            }

            throw new Error(errorBody.message);
        }

        const results: boolean = await response.json();

        return results;
    } catch (error) {
        console.log(error);
    }
}
