import {NavLink} from 'react-router-dom'
import {Heart, ShoppingCartIcon, UserCircle2} from 'lucide-react'


export const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg nav-bg">
                <div className="container">
                    <a className="navbar-brand d-flex align-items-center gap-2" href="/"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/images/zeptronic-logo-transparent-ib9CYMSsvaeCxYhMAr84oLXp83WW0b.jpg" alt='zeptronic logo' className='border rounded-5' width="60" height="60" style={{objectFit: 'cover'}} /> <span className='fs-6 fw-bold d-none d-md-inline'>Zeptronic E-commerce App</span> </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav align-items-lg-center">
                            <li className="nav-item mx-lg-2 my-2 my-lg-0">
                                <NavLink className="nav-link d-flex align-items-center gap-1" to="/wishlist"><Heart size={20} className='me-2' /> Wishlist </NavLink>
                            </li>
                            <li className="nav-item mx-lg-2 my-2 my-lg-0">
                                <NavLink className="nav-link d-flex align-items-center gap-1" to="/cartpage"><ShoppingCartIcon size={20} className='me-2' />Cart</NavLink>
                            </li>
                            <li className="nav-item mx-lg-2 my-2 my-lg-0">
                                <NavLink className="nav-link d-flex align-items-center gap-1" to="/user"><UserCircle2 size={20} className='me-2' />User Profile</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}