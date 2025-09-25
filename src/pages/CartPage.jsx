import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useContext, useState } from 'react'
import { MinusSquare, PlusSquare } from 'lucide-react'
import ProductContext from '../ProductContext'
import { useLocalStorage } from '../useLocalStorage'

export const CartPage = () => {
    const { cartBtn, setCartBtn, globalProducts, removeFromCart, quantity, setQuantity, addToWishlist, address, setAddress} = useContext(ProductContext)
    
    const [isLoading, setIsLoading] = useState(false)
    const [addAddress, setAddAddress] = useState(false)
    const [editId, setEditId] = useState(null)
    const [selectedAddresses, setSelectedAddresses] = useState([])
    const [showConfirmImg, setShowConfirmImg] = useState(false)
    
    const [addrForm, setAddrForm] = useLocalStorage("addressForm", {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: ""
    })

    const handleAddressChange = (e) => {
        const {name, value} = e.target

        setAddrForm((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleAddressSubmit = (e) => {
        e.preventDefault()

        const newAddress = {
            ...addrForm,
            id: editId ? editId : Date.now(),
            name: addrForm.name,
            email: addrForm.email,
            phone: addrForm.phone,
            address: addrForm.address
        }

        if(editId){
            setAddress(address.map(a => a.id === editId ? newAddress: a))
            setEditId(null)
        } else {
            setAddress([...address, newAddress])
        }

        // console.log("New address added: ", newAddress)
        // console.log(address)

        setAddrForm({
            name: "",
            email: "",
            phone: "",
            address: ""
        })
        setAddAddress(false)
    }

    const handlePlaceOrder = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        setShowConfirmImg(true)
        setCartBtn([])
    }

    const cartProducts = Array.isArray(globalProducts)
        ? globalProducts.filter(prod => cartBtn.includes(prod._id))
        : []
    // console.log(cartProducts)
    
    const subtotal = cartProducts.reduce((sum, item) => sum + item.price * (quantity[item._id] ||  1), 0)
    const tax = subtotal * 0.05
    const shipping = subtotal === 0 ? 0 : 40
    const total = subtotal === 0 ? 0 : subtotal + shipping + tax

    return (
        <>
            <Header />
            {
                showConfirmImg ? (<div className="container text-center"><img src="/img5.png" class="img-fluid my-4" alt="orderConfirmationImage" /></div>) 
                :
                (
                    <main className="details-bg py-4">
                        <div className="container">
                            <div className="row justify-content-center">

                                {/* Selected Add to Cart Products */}

                                <div className="col-12 col-md-10 col-lg-8">
                                    <h1 className="display-5 fw-semibold heading-Color text-center pt-4">
                                        My Cart
                                    </h1>
                                    {cartProducts.length === 0 ? (
                                        <img src='/img2.png' className='img-fluid py-4 mx-1' />
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
                                                            <button
                                                                onClick={() => addToWishlist(data._id)}
                                                                className="btn btn-outline-primary w-100 mt-2"
                                                            >
                                                                Add to Wishlist
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
                                        <div className='mb-4 px-3'>
                                            {Array.isArray(address) && address.length === 0 && edit
                                                ? (<p className='border border-subtle-dark border-2 p-2'>No address added.</p>)
                                                : (address.map((addr) => (
                                                    <div key={addr.id} className='d-flex mb-3 gap-3'>
                                                        <input type='checkbox' checked={selectedAddresses.includes(addr.id)} onChange={() => {
                                                            if(selectedAddresses.includes(addr.id)){
                                                            setSelectedAddresses(selectedAddresses.filter(id => id !== addr.id))  
                                                            } else {
                                                                setSelectedAddresses([...selectedAddresses, addr.id])
                                                            }
                                                        }} />
                                                        <div className='w-100'>
                                                            <p className='m-0'><span className='fw-bold'>{addr.name}</span></p>
                                                            <p className='m-0'><span className='fw-bold'>email:</span> {addr.email}</p>
                                                            <p className='m-0'><span className='fw-bold'>contact:</span> {addr.phone}</p>
                                                            <p className='m-0'><span className='fw-bold'>Delivery address:</span> {addr.address}</p>
                                                        <button className='btn btn-outline-danger mt-2' onClick={() => {
                                                            setAddress(address.filter(addr => !selectedAddresses.includes(addr.id)))
                                                            setSelectedAddresses([])
                                                        }} disabled={selectedAddresses.length === 0}>Delete Address
                                                        </button>
                                                        <button className='btn btn-outline-primary mt-2 mx-2' onClick={() => {
                                                            setEditId(addr.id)
                                                            setAddrForm({...addr})
                                                            setAddAddress(true)
                                                        }}>
                                                            Edit
                                                        </button>
                                                        </div>
                                                    </div>
                                                )))
                                            }
                                            {addAddress ? (
                                                <form onSubmit={handleAddressSubmit}>
                                                    <div>
                                                        <label className='form-label'>Name: </label>
                                                        <input className='form-control' type='text' name='name' value={addrForm.name} onChange={handleAddressChange} />
                                                    </div>
                                                    <div>
                                                        <label className='form-label'>Email: </label>
                                                        <input className='form-control' type='email' name='email' value={addrForm.email} onChange={handleAddressChange} />
                                                    </div>
                                                    <div>
                                                        <label className='form-label'>Phone: </label>
                                                        <input className='form-control' type='text' name='phone' value={addrForm.phone} onChange={handleAddressChange} />
                                                    </div>
                                                    <div>
                                                        <label className='form-label'>Address: </label>
                                                        <input className='form-control' type='text' name='address' value={addrForm.address} onChange={handleAddressChange} />
                                                    </div>
                                                    <button className='btn btn-outline-success mt-3'>Save</button>
                                                </form>
                                            ) : null}

                                            <button className='btn btn-outline-primary my-2' onClick={() => setAddAddress(!addAddress)}>{addAddress ? "Done" : "Add Address"}</button>
                                        </div>
                                        

                                        {/* Terms and Conditions */}
                                        <div className="form-check mb-4 px-5">
                                            <input className="form-check-input" type="checkbox" id="termsCheck" />
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

                                        {
                                            total > 0 ? (
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
                                            ) : (
                                                <button className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center">
                                                    Cannot Place Order
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) 
            }
            <Footer />
        </>
    )
}
