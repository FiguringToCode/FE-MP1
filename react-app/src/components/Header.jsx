import {NavLink} from 'react-router-dom'
import {Heart, ShoppingCartIcon} from 'lucide-react'


export const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg p-0 nav-bg">
                <div className="container">
                    <a className="navbar-brand" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/zeptronic-logo-transparent-ib9CYMSsvaeCxYhMAr84oLXp83WW0b.jpg" alt='zeptronic logo' className='border rounded-5' width="100" height="100" /> <span>Zeptronic E-commerce App</span> </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/wishlist"><Heart /> Wishlist</NavLink>
                            </li>
                            <li className="nav-item mx-2">
                                <NavLink className="nav-link" to="/cartpage"><ShoppingCartIcon /> Cart</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}