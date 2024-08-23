import { useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import validation from '../validation.js'; 

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('candidate'); 
    const [formError, setFormError] = useState('');
    const { signup, error, isLoading } = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        try {
            validation.checkEmail(email);
            validation.checkPassword(password, confirmPassword);
            await signup(firstName, lastName, email, password, role);
        } catch (e) {
            setFormError(e);
        }
    };

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <label>First Name:</label>
            <input
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
            />
            <label>Last Name:</label>
            <input
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
            />
            <label>Email:</label>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Confirm Password:</label>
            <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
            />
            <label>Select Role:</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="CANDIDATE">Candidate</option>
                <option value="RECRUITER">Recruiter</option>
            </select>
            <button disabled={isLoading} type="submit">Sign Up</button>
            {formError && <div className='error'>{formError}</div>}
            {error && <div className='error'>{error}</div>}
        </form>
    );
};

export default SignUp;
