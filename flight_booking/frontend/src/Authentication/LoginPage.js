import { useContext } from 'react'
import AuthContext from './AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    const { loginUser } = useContext(AuthContext)
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
                <input type="text" name="username" placeholder="Enter Username" />
                <input type="password" name="password" placeholder="Enter Password" />
                <input type="submit"/>
            </form>
            <p>New here? <Link to='/register'>Register here</Link></p>
        </div>
    )
}

export default LoginPage
