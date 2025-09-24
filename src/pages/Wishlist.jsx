import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { useContext, useState} from "react"
import ProductContext from "../ProductContext"

export const Wishlist = () => {
    const {globalProducts, wishlist, addToCart, removeFromWishlist} = useContext(ProductContext)
    // console.log(wishlist)

    const wishedProducts = globalProducts.filter(prod => wishlist.includes(prod._id))
    // console.log(wishedProducts)

    const [moveToCart, setMoveToCart] = useState(false)

    return (
        <>
            <Header />
            <main className="details-bg">
                <div className="container">
                    <h1 className="display-5 fw-semibold heading-Color text-center py-4">My Wishlist</h1>
                    <div className="row">
                        {
                            wishedProducts.length === 0 ? <img src='/img1.png' className='img-fluid pb-5' /> 
                            : wishedProducts.map(data => (
                                <div key={data._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex">
                                    <div className="card w-100 h-100">
                                        <img src={data.productImg} className="card-img-top img-fluid" style={{ objectFit: 'contain', height: 220 }} alt="wishlistImages"/>
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <p className="card-text fs-5 fw-semibold text-center">{data.name}</p>
                                            <p className="card-text fs-5 fw-bold text-center">₹ {data.price}</p>
                                            <button onClick={() => {
                                                addToCart(data._id) 
                                                removeFromWishlist(data._id)
                                            }} className="btn btn-outline-secondary w-100 mt-2">
                                               Move to Cart
                                            </button>
                                            <button onClick={() => removeFromWishlist(data._id)} className="btn btn-outline-danger w-100 mt-2">
                                                Remove from Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
