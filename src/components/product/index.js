import React from "react";
import './_product.scss';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteProduct} from "../../api/ProductsCRUD";
import {useHistory} from "react-router";
const Product = ({id, title , subtitle}) =>  {
    const history = useHistory();
    const handleEdit = () => {
       history.push(`/AddEdit/${id}`);
    };
    const handleDelete = () => {
         deleteProduct(id).then(res =>  {
             if(res.status == 204){
                 history.push('/products');
             }
            console.log('del',res);
        }, err =>  {
            console.log("Error" ,err)
        })    };
    return(
        <div className="service_card">
            <div className="service_card_item">
                <div className="service_card_item_content">
                    <h3>{title}  </h3>
                    <p>{subtitle}</p>

                </div>
            </div>
            <div className="service_card_control">
                <CreateIcon className="service_card_control_edit" onClick={() => handleEdit(id)}/>
                <DeleteIcon className="service_card_control_delete" onClick={() => handleDelete(id)}/>

            </div>

        </div>
    )
}

export default Product;
