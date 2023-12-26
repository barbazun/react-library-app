import React, { useState, useContext } from 'react';
import { login as authServiceLogin } from '../../services/authService';
import AuthContext from '../../context/AuthContext';

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await authServiceLogin(username, password);
            login(username, response.token);
        } catch (error) {
            setError('Неправильний логін або пароль');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {error && <div>{error}</div>}
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
