import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Import the CSS module
import { FaHeartbeat } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { RiMentalHealthFill } from "react-icons/ri";

const Login = () => {
    const [role, setRole] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleDoctorIdChange = (e) => {
        setDoctorId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'user') {
            // Redirect to user home page
            router.push('/user');
        } else if (role === 'doctor' && doctorId === 'doc123' && password === '12543') {
            // Redirect to doctor home page
            router.push('/doctor');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <h1>
                    Welcome to  <span className={styles.gradient}>   Serenity.ai</span> 👋
                </h1>
            </div>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.header}>
                        <h2>login here</h2>
                        <h5>Who are you ?</h5>
                    </div>
                    <span className={styles.fillart1}>
                        <FaHeartbeat />
                    </span>
                    <span className={styles.fillart2}>
                        <FaHeartbeat />
                    </span>
                    <span className={styles.fillart3}>
                        <FaHeartbeat />
                    </span>
                    <span className={styles.fillplus1}>
                    <GiHealthNormal />
                    </span>
                    <span className={styles.fillmind1}>
                    <RiMentalHealthFill />
                    </span>
                    <div className={styles.buttons}>
                        <button onClick={() => {handleRoleSelect('user');router.push('/user')}}>User</button>
                        <button onClick={() => handleRoleSelect('doctor')}>Doctor</button>
                    </div>
                    {role === 'doctor' && (
                        <div className={styles.credentials}>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.group}>
                                    <label>Doctor ID:</label>
                                    <input type="text" value={doctorId} onChange={handleDoctorIdChange} />
                                </div>
                                <div className={styles.group}>
                                    <label>Password:</label>
                                    <input type="password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <button type="submit" className={styles.submit}>login</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
