import { useContext } from 'react'
import AuthContext from './AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    const { registerUser } = useContext(AuthContext)
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={registerUser}>
                <input type="text" name="username" placeholder="Create Username" />
                <input type="password" name="password" placeholder="Create Password" />
                <input type="submit"/>
            </form>
            <p>Already an user? <Link to='/login'>Log in here</Link></p>
        </div>
    )
}

export default RegisterPage