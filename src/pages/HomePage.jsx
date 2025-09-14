import { Link } from "react-router-dom"
import { useContext } from "react"
import ProductContext from "../ProductContext"


export const HomePage = () => {
    const {category, loading} = useContext(ProductContext)

    return (
        <div className="pages-bg">
            <section>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            {category ? category.map((data) => (
                                <div key={data._id} className="col-12 col-sm-6 col-lg-4 py-4">
                                    <div className="card lift-card-dramatic h-100">
                                        <img src={data.imgUrl} className="card-img-top" height={240} alt="categoryImages" />
                                        <div className="card-body pt-2 pb-0">
                                            <p className="card-text text-center">{data.type}</p>
                                            <Link to={`/products/${data._id}`} className="stretched-link"></Link>
                                        </div>
                                    </div>
                                </div>
                            )) : loading && (<div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </div>)}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container h-75 py-5">
            <div id="carouselExampleAutoplaying" className="carousel slide carousel-height" data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    category ? category.map((data) => (
                        <div key={data._id} className="carousel-item active mh-75" data-bs-interval="2000">
                            <img src={data.imgUrl} className="d-block w-100 object-fit-cover img-fluid" alt="..." />
                        </div>
                    )) : loading && (<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>)
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
            </section>
        </div>
    )
}