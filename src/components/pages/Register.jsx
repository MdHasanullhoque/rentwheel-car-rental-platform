
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { toast } from 'react-toastify';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //  Password Validation Function
    const validatePassword = (pwd) => {
        let isValid = true;

        if (pwd.length < 6) {
            toast.error("Password must be at least 6 characters long");
            isValid = false;
        }
        if (!/[A-Z]/.test(pwd)) {
            toast.error("Password must contain at least one uppercase letter");
            isValid = false;
        }
        if (!/[a-z]/.test(pwd)) {
            toast.error("Password must contain at least one lowercase letter");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate before sending to Firebase
        if (!validatePassword(password)) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name, photoURL });
            toast.success('Registration successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleGoogleRegister = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            toast.success('Registration/Login successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    value={photoURL}
                    onChange={e => setPhotoURL(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Register
                </button>
            </form>

            <button
                onClick={handleGoogleRegister}
                className="mt-4 w-full bg-red-500 text-white p-2 rounded"
            >
                Register/Login with Google
            </button>

            <p className="mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 font-semibold">
                    Login
                </Link>
            </p>
        </div>
    );
}
