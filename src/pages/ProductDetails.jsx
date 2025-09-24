import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import ProductContext from "../ProductContext"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { StarRating } from "../components/StarRating"

export const ProductDetails = () => {
    const itemId = useParams()
    // console.log(itemId.itemId)
    const {category, addToCart, addToWishlist} = useContext(ProductContext)

    const itemData = category.map(item => item.products.find(product => product._id === itemId.itemId))
    // console.log(itemData)
    const details = itemData.find(detail => detail != undefined)
    console.log(details)

    return (
        <>
            <Header />
            <main className="details-bg">
                <div className="container">

                    <div className="row">
                        <div className="col-12 col-lg-3 px-4 border-2 text-center border-start border-end border-warning py-3">
                            <img src={details.productImg} className="img-fluid" alt={details.name} />
                            <button onClick={() => addToCart(details._id)} className="btn btn-outline-primary mt-3 w-100">Add to Cart</button>
                            <button onClick={() => addToWishlist(details._id)} className="btn btn-outline-primary my-3 w-100">Add to Wishlist</button>
                        </div>
                        <div className="col-12 col-lg-9 ps-5 ps-lg-5 py-3 details-bg">
                            <p className="fs-2 fw-semibold">{details.name}</p>
                            <StarRating rating={details.rating} size="lg" showValue />
                            <div className="mt-4 d-flex gap-4 align-items-center">
                                <p className="fs-3 fw-bold">₹ {details.price}</p>
                                <p className="text-secondary fw-semibold text-decoration-line-through fs-5">₹ {details.previousPrice}</p>
                            </div>
                            <p className="text-secondary fw-bold fs-5">{details.discount} off</p>
                            <div className="my-4">
                                <img src="https://zevana.co/cdn/shop/files/return_banner.svg?v=1745583237&width=1024" className="img-fluid w-50" />
                            </div>
                            <div className="my-3 ">
                                <p className="fw-semibold fs-4">Description: </p>
                                <ul>
                                    {details && details.description.map(desc => <li className="my-4">{desc}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    )
}