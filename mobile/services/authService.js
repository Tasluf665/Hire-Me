// TODO: Replace with your actual backend URL
import { API_URL } from "@env";

export const SignIn = async (email, password) => {
    console.log(API_URL);
    try {
        const response = await fetch(`${API_URL}/api/auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Something went wrong!' };
        }

        const resData = await response.json();
        return { data: resData };

    } catch (error) {
        return { error: error.message };
    }
};

export const SignUp = async (name, email, password) => {
    try {
        const response = await fetch(`${API_URL}/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.message || 'Something went wrong!' };
        }

        const resData = await response.json();
        return { data: resData };
    } catch (error) {
        return { error: error.message };
    }
};
