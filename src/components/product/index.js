import React from "react";
import './_product.scss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
const Product = ({id,icon , title , subtitle}) =>  {
    const handleEdit = () => {
        console.log('id',id);
    };
    const handleDelete = () => {
        console.log('id',id);
    };
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
                <CreateIcon className="service_card_control_edit" onClick={() => handleEdit()}/>
                <DeleteIcon className="service_card_control_delete" onClick={() => handleDelete()}/>

            </div>

        </div>
    )
}

export default Product;
