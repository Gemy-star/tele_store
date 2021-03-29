import React , {useContext} from "react";
import './_products.scss';
import {FormattedMessage} from "react-intl";
import {ProductContext} from "../../context/ProductsContext";
import Product from "../../components/product";
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const Products = props =>  {
    const [products , setProduct] = useContext(ProductContext)

    return (
        <section className="services">
            <div className="services_container">
                <div className="services_container_title">
                    <h3> <FormattedMessage id="services.headline" /></h3>
                    <p> <FormattedMessage id="services.subtitle" /></p>
                    <button><ControlPointIcon className="icon"/></button>
                </div>
                <div className="services_container_grid">
                    {products? products.map(
                        (d) =>  {
                            return (
                                <div key={d.id}>
                                    <Product icon={d.imageData} subtitle={d.description} title={d.name}/>

                                </div>
                            )
                        }
                    )   : <div></div>}
                </div>
            </div>

        </section>
    )
}


export default Products;