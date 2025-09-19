import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useContext, useState } from 'react'
import { MinusSquare, PlusSquare } from 'lucide-react'
import ProductContext from '../ProductContext'

export const CartPage = () => {
    const { cartBtn, globalProducts, removeFromCart, quantity, setQuantity } = useContext(ProductContext)

    const [name, setName] = useState('John Doe')
    const [address, setAddress] = useState('123 Main Street, New York, NY 10001')
    const [edit, setEdit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = (event) => {
        event.preventDefault()
        setEdit(false)
    }

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        alert("Order Placed Successfully")
    }

    const cartProducts = Array.isArray(globalProducts)
        ? globalProducts.filter(prod => cartBtn.includes(prod._id))
        : []
    console.log(cartProducts)
    
    const subtotal = cartProducts.reduce((sum, item) => sum + item.price * (quantity[item._id] ||  1), 0)
    const tax = subtotal * 0.05
    const shipping = 40
    const total = subtotal === 0 ? 0 : subtotal + shipping + tax

    return (
        <>
            <Header />
            <main className="details-bg py-4">
                <div className="container">
                    <div className="row justify-content-center">

                        {/* Selected Add to Cart Products */}

                        <div className="col-12 col-md-10 col-lg-8">
                            <h1 className="display-5 fw-semibold heading-Color text-center pt-4">
                                My Cart ({cartBtn.length})
                            </h1>
                            {cartProducts.length === 0 ? (
                                <img src='public\img2.png' className='img-fluid' />
                            ) : (
                                <div className="row my-5">
                                    {cartProducts.map(data => (
                                        <div key={data._id} className="col-12 col-sm-6 col-md-4 col-lg-4 d-flex align-items-stretch mb-4">
                                            <div className="card w-100 h-100">
                                                <img src={data.productImg} className="card-img-top img-fluid" alt={data.name} style={{objectFit: 'contain', height: 160, width: '100%',}}
                                                />
                                                <div className="card-body d-flex flex-column justify-content-between">
                                                    <p className="card-text fs-5 fw-semibold text-center">
                                                        {data.name}
                                                    </p>
                                                    <p className="card-text fs-5 fw-bold text-center">
                                                        ₹ {data.price}
                                                    </p>
                                                    <div className='card-text fs-6 fw-normal text-center'>
                                                        Quantity :
                                                        <button className="btn" onClick={() => setQuantity(q => ({...q,
                                                            [data._id]: Math.max((q[data._id] || 1) - 1, 1)
                                                        }))}><MinusSquare /></button> 

                                                            {quantity[data._id] || 1} 
                                                        
                                                        <button className="btn" onClick={() => setQuantity(q => ({...q,
                                                            [data._id]: Math.max((q[data._id] || 1) + 1, 1)
                                                        }))}><PlusSquare /></button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(data._id)}
                                                        className="btn btn-outline-danger w-100 mt-2"
                                                    >
                                                        Remove from Cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* Place Order Card */}

                        <div className='col-12 col-md-2 col-lg-4 px-4'>
                            <div className="card shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
                                
                                <div className="card-header bg-primary text-white">
                                    <h4 className="card-title mb-0">
                                    <i className="bi bi-cart-check me-2"></i>
                                        Place Your Order
                                    </h4>
                                </div>

                                {/* Order Summary Section */}
                                <div className="card-body">
                                    <div>
                                        <h6 className="fw-bold mb-3">Order Summary</h6>
                                        {cartProducts.map((item) => (
                                        <div key={item._id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                            <img
                                                src={item.productImg || "/placeholder.svg"}
                                                alt={item.name}
                                                className="rounded me-3"
                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">{item.name}</h6>
                                                <small className="text-muted">Qty: {quantity[item._id] || 1}</small>
                                            </div>
                                            <div className="text-end">
                                                <span className="fw-bold">₹{(item.price * (quantity[item._id] || 1)).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                {/* Total Calculation */}
                                <div className='mb-4 px-3'>
                                    <div className="d-flex justify-content-between ">
                                        <span>Subtotal:</span>
                                        <span>₹ {subtotal?.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <span>Tax:</span>
                                        <span>₹ {tax?.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                        <span>Shipping:</span>
                                        <span>₹ {shipping?.toFixed(2)}</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold fs-5">
                                        <span>Total:</span>
                                        <span className="text-primary">₹ {total?.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="mb-4 px-3">
                                    <h6 className="fw-bold mb-2">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Shipping Address
                                    </h6>
                                    <div className="bg-light p-3 rounded">
                                    {edit ? (
                                        <form onSubmit={handleSave}>
                                            <div className="mb-2">
                                                <label className="fw-semibold">Name:</label>
                                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                            </div>
                                            <div className="mb-2">
                                                <label className="fw-semibold">Address:</label>
                                                <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required />
                                            </div>
                                            <button type="submit" className="btn btn-primary btn-sm mt-2">Save</button>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="fw-semibold">{name}</div>
                                            <div>{address}</div>
                                        </>
                                    )}
                                    </div>
                                    <button onClick={() => setEdit(e => !e)} className="btn btn-outline-secondary btn-sm mt-2">
                                        <i className="bi bi-pencil me-1"></i>
                                        {edit ? 'Cancel' : 'Change Address'}
                                    </button>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="form-check mb-4 px-5">
                                    <input className="form-check-input" type="checkbox" id="termsCheck" defaultChecked />
                                    <label className="form-check-label small" htmlFor="termsCheck">
                                        I agree to the{" "}
                                        <a href="#" className="text-decoration-none">
                                        Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-decoration-none">
                                        Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <button className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center" onClick={handlePlaceOrder} disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <div className="spinner-border spinner-border-sm me-2" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-bag-check me-2"></i>
                                            Place Order - ₹ {total.toFixed(2)}
                                        </>
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
