import UserHeaderSection from '../../Authentication/UserHeaderSection'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <header id="app-header">
            <ul>
                <li><Link to="/">Bookings</Link></li>
                <li><Link to="/form">BookingForm</Link></li>
            </ul>
            <UserHeaderSection />
        </header>
    )
}