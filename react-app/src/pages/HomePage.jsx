import { useContext } from "react"
import { Link } from "react-router-dom"
import useFetch from "../useFetch"


export const HomePage = () => {
    const {data: category, loading, error} = useFetch("https://be-mp-1.vercel.app/category")
    console.log(category)

    return (
        <div className="pages-bg">
            <div className="container">
                <div className="row">
                    {category ? category.map((data) => (
                        <div key={data._id} className="col-lg-4 py-4">
                            <div className="card">
                                <img key={data._id} src={data.imgUrl} className="card-img-top" height={200} alt="categoryImages" />
                                <div className="card-body pt-2 pb-0">
                                    <p className="card-text text-center">{data.type}</p>
                                    <Link className="stretched-link"></Link>
                                </div>
                            </div>
                        </div>
                    )) : loading && (<p>Loading....</p>)}
                </div>
            </div>
        </div>
    )
}