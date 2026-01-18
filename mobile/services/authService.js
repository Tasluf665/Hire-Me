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
        return { data: resData.data };

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
        return { data: resData.data };
    } catch (error) {
        return { error: error.message };
    }
};



export const ForgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        });

        const resData = await response.json();

        if (!response.ok) {
            return { error: resData.message || resData.error || 'Something went wrong!' };
        }

        console.log(resData);

        return resData;
    } catch (error) {
        return { error: error.message };
    }
};

export const GoogleLogin = async (idToken, email) => {
    try {
        const response = await fetch(`${API_URL}/api/users/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // We only STRICTLY need idToken, but sending email/name acts as a fallback or for initial validation
            body: JSON.stringify({
                idToken: idToken,
                email: email,
                // name: name // Validation in backend might expect this, but we commented it out to rely on token
            })
        });

        const resData = await response.json();

        if (!response.ok) {
            return { error: resData.message || resData.error || 'Something went wrong!' };
        }

        return resData;
    } catch (error) {
        return { error: error.message };
    }
};
