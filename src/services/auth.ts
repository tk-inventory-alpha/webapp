import axios from 'axios';

type ApiAuthResponse = {
    token: string;
}

const loginOrRegister = async (email: string, password: string) => {
    const response = await axios.post<ApiAuthResponse>(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {email, password}
    );

    const { token } = response.data;

    return {
        token, email
    };
}

export {
    loginOrRegister
}
