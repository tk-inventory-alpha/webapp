import axios from 'axios';

type ApiAuthResponse = {
    access_token?: string;
    error?: string;
}

const loginOrRegister = async (email: string, password: string) => {
    const response = await axios.post<ApiAuthResponse>(
        `${process.env.REACT_APP_API_URL}/api/auth/loginOrRegister`,
        {email, password}
    );

    const { access_token } = response.data;

    return {
        token: access_token!, email
    };
}

export {
    loginOrRegister
}
