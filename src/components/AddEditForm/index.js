import React , {useState , useEffect , useContext} from 'react';
import {FormattedMessage} from "react-intl";
import FormControl from '@material-ui/core/FormControl';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {LocalizationContext} from "../../context/LocalizationContext";
import { useHistory } from "react-router-dom";

import './_Add.scss';

const AddEditForm = ({name , details , image , status}) => {
    const history = useHistory();
    const [locale , setLocale] = useContext(LocalizationContext);
    const [formIsValid , setFormIsValid] = useState(null);
    const [status_new, setStatus_new] = useState(null);
    const [image_new, setImage_new] = useState(null);
    const [name_new, setName_new] = useState(null);
    const [detials_new, setDetails_new] = useState(null);
    const [error , setError] = useState({status:false , name:false , details:false , image:false})
    useEffect(()=> {
        if ( status_new && image_new && detials_new && name_new) {
            setFormIsValid(true)
        }else{
            setFormIsValid(null)
        }
    } , [status_new , image_new , detials_new , name_new ]);

    const errorMessage = msg =>   {
        return (
            <div className="error_div">
                <p>
                    {msg}
                </p>
            </div>
        )
    };
    const handleChangeStatus = (event) =>  {
        if(event.type===   "blur") {
            event.target.value ===   "0" ? setError({...error , status:true}):setError({...error , status:false})
        }
        const status = event.target.value;
        status ===    null ? setError({...error , status:true}):setError({...error , status:false})
        setStatus_new(status);
    };
    const handleChangeImage = event =>  {
        const image = event.target.value;
        setImage_new(image);
        !image ? setError({...error , image:true}):setError({...error , image:false})
        console.log("ITEM",image)
    };
    const handleSubmit = (event) =>  {
        event.preventDefault();
        if(formIsValid && !error.name && !error.status) {
            handlePostRequest({name:name_new , status:status_new , details:detials_new, image:image_new})
        }else {
            setFormIsValid(false);
        }
    };
    const handlePostRequest = (body) => {
       console.log("Body",body)
    };
    const handleChangeName = event =>  {
        if(event.type===   "blur") {
            event.target.value ===   "" ? setError({...error , name:true}):setError({...error , name:false})
        }
        const Name = event.target.value;

        if(Name=== "" ||   Name===   null ||  /^\d+$/.test(Name)) {
            setError({...error , name:true})
            setFormIsValid(false)

        }else {
            setError({...error , name:false})
        }
        setName_new(Name);
    };
    const handleChangeDetails = event =>  {
        const details = event.target.value;
        if ( details=== "" || details ===   null ) {
            setError({...error , details:true})
            setFormIsValid(false)
        }
        else {
            setError({...error , details:false})

        }
        setDetails_new(details);
    };
    return(
        <section>
            <div className="form_div">
                <form autoComplete={false} onSubmit={(event) => {
                    handleSubmit(event)
                }}>
                    {formIsValid == null || formIsValid == true ? null :
                        <div className="error_div" style={{justifyContent: 'flex-start'}}>
                            <p className="error_div_msg" style={{marginInline: '1rem'}}>
                                <FormattedMessage id="validation.allFields"/>
                            </p>
                        </div>}
                    <FormControl>
                        <label className="form_div_label" htmlFor={"image"}>
                            <FormattedMessage id="startToday.formSection.fourthLabel"/>
                        </label>
                        <input value={image ? image : image_new} type="file" name="image"
                               style={error.image || formIsValid == false ? {
                                   border: 'solid 1px #791097',
                                   backgroundColor: 'rgba(236, 28, 36, 0.04)'
                               } : null} className="form_div_ele" id="image" onChange={(e) => {
                            handleChangeImage(e)
                        }} onBlur={(e) => {
                            handleChangeImage(e)
                        }}/>
                        {error.fullName ? errorMessage(<FormattedMessage id="validation.image"/>) : null}
                    </FormControl>
                    <FormControl>
                        <label className="form_div_label" htmlFor={"status"}>
                            <FormattedMessage id="startToday.formSection.secondLabel"/>
                        </label>
                        <select style={error.status || formIsValid == false ? {
                            border: 'solid 1px #791097',
                            backgroundColor: 'rgba(236, 28, 36, 0.04)'
                        } : null}
                                className={locale == "en" ? "form_div_ele form_div_selectEn" : "form_div_ele form_div_selectAr"}
                                id={"status"} value={status ? status : status_new} onChange={(event) => {
                            handleChangeStatus(event)
                        }}>
                            <option value="" disabled selected>
                                {locale == "en" ? "SELECT A Status" : "إختار حالة"}
                            </option>
                            <option onClick={(e) => {
                                handleChangeStatus(e)
                            }} value={"1"}>{locale == "en" ? "Active" : "نشط"}</option>
                            <option onClick={(e) => {
                                handleChangeStatus(e)
                            }} value={"0"}>{locale == "en" ? "Not Active" : "غير نشط"}</option>


                        </select>
                        {error.model ? errorMessage(<FormattedMessage id="validation.status"/>) : null}
                    </FormControl>
                    <FormControl>
                        <label className="form_div_label" htmlFor={"name"}>
                            <FormattedMessage id="startToday.formSection.firstLabel"/>
                        </label>
                        <input value={name ? name : name_new} type="text" name="name"
                               style={error.name || formIsValid == false ? {
                                   border: 'solid 1px #791097',
                                   backgroundColor: 'rgba(236, 28, 36, 0.04)'
                               } : null} className="form_div_ele" id="full_name" onChange={(e) => {
                            handleChangeName(e)
                        }} onBlur={(e) => {
                            handleChangeName(e)
                        }}/>
                        {error.fullName ? errorMessage(<FormattedMessage id="validation.name"/>) : null}
                    </FormControl>
                    <FormControl>
                        <label className="form_div_label" htmlFor={"details"}>
                            <FormattedMessage id="startToday.formSection.thirdLabel"/>
                        </label>
                        <input value={details ? details : detials_new} type="text" name="details"
                               style={error.details || formIsValid == false ? {
                                   border: 'solid 1px #791097',
                                   backgroundColor: 'rgba(236, 28, 36, 0.04)'
                               } : null} className="form_div_ele" id="details" onChange={(e) => {
                            handleChangeDetails(e)
                        }} onBlur={(e) => {
                            handleChangeDetails(e)
                        }}/>
                        {error.details ? errorMessage(<FormattedMessage id="validation.details"/>) : null}
                    </FormControl>
                    <FormControl style={{display: 'inline-block'}}>
                        <button onClick={(e) => handleSubmit(e)} className="btn_confirm">
                            <FormattedMessage id="startToday.formSection.sendBtn"/>
                            <ArrowForwardIosIcon style={{
                                color: '#ffffff',
                                fontSize: 'small',
                                marginInline: ' 0.27rem',
                                transform: locale == "en" ? null : 'scale(-1)'
                            }}/>
                        </button>
                        <button onClick={() => history.push('/products')} className="btn_confirm">
                            <FormattedMessage id="startToday.formSection.back"/>
                            <ArrowForwardIosIcon style={{
                                color: '#ffffff',
                                fontSize: 'x-large',
                                marginInline: ' 0.27rem',
                                transform: locale == "en" ? null : 'scale(-1)'
                            }}/>
                        </button>
                    </FormControl>
                </form>
            </div>

        </section>
    )
}


export default  AddEditForm ;