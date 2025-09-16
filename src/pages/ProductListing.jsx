import {Link, useParams} from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useContext, useEffect, useState } from 'react'
import ProductContext from '../ProductContext'
import { PriceRangeBar } from '../components/PriceRange'
import { StarIcon, HeartIcon } from 'lucide-react'


export const ProductListing = () => {
    const [selectedRange, setSelectedRange] = useState("")
    const [ratingStar, setRatingStar] = useState("")
    const [displayList, setDisplayList] = useState([])
    
    const priceOptions = [
        { id: "low", label: "Low", description: "Budget-friendly", range: "₹0-₹30,000" },
        { id: "medium", label: "Medium", description: "Best value", range: "₹30,000-₹80,000" },
        { id: "high", label: "High", description: "Premium quality", range: "₹80,000+" },
    ]

    const {productId} = useParams()
    const {category, loading, addToCart, addToWishlist, cartBtn, wishlist} = useContext(ProductContext)
    
    const productData = category?.find((prod) => prod._id == productId)
    // console.log(productData)

    const filteredProduct = productData.products
    ?.filter(product => selectedRange == 'low' ? product.price < 30000 : selectedRange == 'medium' ? product.price >= 30000 && product.price < 80000 : selectedRange == 'high' ? product.price >= 80000 : true)
    ?.filter(product => ratingStar === '4' ? product.rating >= 4 : ratingStar === '3' ? product.rating >= 3 && product.rating < 4 : true)

    useEffect(() => {
        if(selectedRange || ratingStar){
            setDisplayList(filteredProduct)
        }
    }, [selectedRange, ratingStar, productData])    


    useEffect(() => {
        if(cartBtn){
            setDisplayList(cartBtn)
        }
    }, [cartBtn])
    

    useEffect(() => {
        if(wishlist){
            setDisplayList(wishlist)
        }
    }, [wishlist])

    console.log(filteredProduct)
    console.log(cartBtn)
    console.log(wishlist)
      
    

    return (
        <>
            <Header />
            <section className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-4 col-lg-3 border-2 border-end border-warning pages-bg py-4 px-3 px-md-4'>
                        
                        <div className="d-flex justify-content-between align-items-center my-lg-5">
                            <h5>Filter</h5>
                            <button onClick={() => {
                                setSelectedRange('') 
                                setRatingStar('')
                                }} className='col-lg-2 btn btn-primary btn-sm'>Clear</button>
                        </div>
                        
                        <div className="my-lg-5">
                            <PriceRangeBar selectedRange={selectedRange} setSelectedRange={setSelectedRange} priceOptions={priceOptions} />
                        </div>

                        <div className='my-lg-5'>
                            <h5>Ratings</h5>
                            <div className='py-2 ps-3'>
                                <input type='radio' name='rating' value={"4"} onClick={() => setRatingStar("4")} /> 
                                <label htmlFor="rating-4" className="ms-2">
                                    <StarIcon /><StarIcon /><StarIcon /><StarIcon /> and above
                                </label>
                            </div>
                            <div className='py-2 ps-3'>
                                <input type='radio' name='rating' value={"3"} onClick={() => setRatingStar("3")} /> 
                                <label htmlFor="rating-3" className="ms-2">
                                    <StarIcon /><StarIcon /><StarIcon /> and above
                                </label>
                            </div>
                        </div>

                    </div>

                    <div className='col-12 col-md-8 col-lg-9 pages-bg py-4 px-3 px-md-4'>
                        <div className='mb-4'>
                            <h3>Showing All Products <span className='fs-5 fw-lighter'>(Showing {productData.products.length} products)</span></h3>
                            <div className='row'>
                                {
                                    displayList && displayList.length > 0 ? displayList.map((item => (
                                        <div key={item._id} className="card my-3 mx-1 py-2" style={{"maxWidth": "540px"}}>
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img src={item.productImg} className="img-fluid rounded-start pt-4" style={{height: "200px"}} alt="productImg" />
                                                </div>
                                                <div className="col-md-8">
                                                <div className="card-body d-flex justify-content-between">
                                                    <div>
                                                        <Link className='text-decoration-none text-dark' to={`/items/${item._id}`}>
                                                            <h5 className="card-title">{item.name}</h5>
                                                        </Link>
                                                        <p className="card-text fs-4 fw-bold">₹ {item.price} <span className='fs-6 fw-bold text-secondary text-decoration-line-through ms-2'>₹{item.previousPrice}</span></p>
                                                        <p className="card-text fw-semibold text-body-secondary">{item.discount} off</p>
                                                        <button onClick={() => addToCart(item._id)} className={item.isAdded ? `btn btn-primary px-4` : `btn btn-secondary px-4`}>{item.isAdded ? 'Added to Cart' : 'Add to Cart'}</button>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => addToWishlist(item._id)} className={item.isAdded ?  'btn btn-danger' : 'btn btn-success'}><HeartIcon /></button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))) : loading && (<div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}