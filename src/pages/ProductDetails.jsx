import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import ProductContext from "../ProductContext"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { StarRating } from "../components/StarRating"
import { MinusSquare, PlusSquare } from "lucide-react"

export const ProductDetails = () => {
    const itemId = useParams()
    // console.log(itemId.itemId)
    const {category, loading} = useContext(ProductContext)

    const [quantity, setQuantity] = useState(0)

    const itemData = category.map(item => item.products.find(product => product._id === itemId.itemId))
    // console.log(itemData)
    const details = itemData.find(detail => detail != undefined)
    console.log(details)

    return (
        <>
            <Header />
            <main>
                <div className="row">
                    <div className="col-12 col-lg-3 px-4 border-2 text-center border-end border-warning py-3 details-bg">
                        <img src={details.productImg} className="img-fluid" alt={details.name} />
                        <button className="btn btn-primary my-3 w-100">Buy Now</button>
                        <button className="btn btn-secondary my-3 w-100">Add to Cart</button>
                    </div>
                    <div className="col-12 col-lg-9 ps-5 ps-lg-5 py-3 details-bg">
                        <p className="fs-2 fw-semibold">{details.name}</p>
                        <StarRating rating={details.rating} size="lg" showValue />
                        <div className="mt-4 d-flex gap-4 align-items-center">
                            <p className="fs-3 fw-bold">₹ {details.price}</p>
                            <p className="text-secondary fw-semibold text-decoration-line-through fs-5">₹ {details.previousPrice}</p>
                        </div>
                        <p className="text-secondary fw-bold fs-5">{details.discount} off</p>
                        <div className="d-flex align-items-center flex-wrap gap-2">
                            Quantity : 
                            <button className="btn" onClick={() => setQuantity(quantity - 1)}><MinusSquare /></button> 
                                {quantity} 
                            <button className="btn" onClick={() => setQuantity(quantity + 1)}><PlusSquare /></button> 
                            <button className="btn btn-outline-secondary ms-4" onClick={() => setQuantity(0)}>Reset</button>
                        </div>
                        <div className="my-4">
                            <img src="https://zevana.co/cdn/shop/files/return_banner.svg?v=1745583237&width=1024" className="img-fluid w-50" />
                        </div>
                        <div className="my-3 ps-2 pe-5">
                            <p className="fw-semibold fs-4">Description: </p>
                            <ul>
                                {details && details.description.map(desc => <li>{desc}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}