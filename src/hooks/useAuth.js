import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.userInfo);
            }
        };

        fetchUser();
    }, []);

    const login = () => {
        window.location.href = '/api/login';
    };

    const logout = () => {
        window.location.href = '/api/logout';
    };

    return { user, login, logout };
};
