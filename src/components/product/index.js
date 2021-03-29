import React from "react";
import './_product.scss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
const Product = ({icon , title , subtitle}) =>  {

    return(
        <div className="service_card">
            <div className="service_card_item">
                {icon !== null ?<img src={icon} className="service_card_item_img"/> : <div></div>}
                <div className="service_card_item_content">
                    <h3>{title}  </h3>
                    <p>{subtitle}</p>

                </div>
            </div>
            <div className="service_card_control">
                <CreateIcon className="service_card_control_edit" />
                <DeleteIcon className="service_card_control_delete"/>

            </div>

        </div>
    )
}

export default Product;
