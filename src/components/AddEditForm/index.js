import React , {useState , useEffect , useContext} from 'react';
import {FormattedMessage} from "react-intl";
import FormControl from '@material-ui/core/FormControl';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {LocalizationContext} from "../../context/LocalizationContext";
import { useHistory , useParams } from "react-router-dom";
import './_Add.scss';
import {createProduct, getProductById, updateProduct} from "../../api/ProductsCRUD";

const AddEditForm = () => {
    let { id } = useParams();
    console.log("ID", id);
    const history = useHistory();
    const [locale , setLocale] = useContext(LocalizationContext);
    const [formIsValid , setFormIsValid] = useState(null);
    const [status_new, setStatus_new] = useState('');
    const [name_new, setName_new] = useState('');
    const [detials_new, setDetails_new] = useState('');
    const [item ,setItem] = useState({});
    const [error , setError] = useState({status:false , name:false , details:false })
    useEffect(()=> {
       if (id) {
           setFormIsValid(true);
       }else{
           if ( status_new &&  detials_new && name_new) {
               setFormIsValid(true)
           }else{
               setFormIsValid(null)
           }
       }
    } , [status_new , detials_new , name_new ]);

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
        setStatus_new(status=== "0" ? false : true);
    };
    const handleSubmit = (event) =>  {
        event.preventDefault();
        if(formIsValid) {
            handlePostRequest({name:name_new , status:status_new , description:detials_new})
        }else {
            setFormIsValid(false);
        }
    };
    useEffect(()=> {
        try {
            getProductById(id).then(res=> {
                console.log(res.data);
                setItem(res?.data)
            } , err => {})
        }catch (e) {
            console.log(e);
        }
    },[id])
    const handlePostRequest = async  (body) => {
        if (id) {
            alert('update');
            try {
              await updateProduct(id,body).then((res) => {
                    console.log(res);
                    if (res.status == 200) {
                        history.push('/products');
                    }
                } , (err) => {
                    console.log(err)
                });
            } catch (e) {
                console.log(e);
            }

        }else {
            alert('create');
            try {
                await createProduct(body).then((res) => {
                    if (res.status == 200) {
                        history.push('/products');
                    }
                } , (err) => {
                  console.log(err);
                });
            } catch (e) {
                console.log(e);
            }
        }
    };
    useEffect(()=> {
        if(item) {
            setStatus_new(item.status);
            setName_new(item.name);
            setDetails_new(item.description);
        }
    },[item])
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
                <form encType="multipart/form-data" method="POST">
                    {formIsValid == null || formIsValid == true ? null :
                        <div className="error_div" style={{justifyContent: 'flex-start'}}>
                            <p className="error_div_msg" style={{marginInline: '1rem'}}>
                                <FormattedMessage id="validation.allFields"/>
                            </p>
                        </div>}
                    <FormControl>
                        <label className="form_div_label" htmlFor={"status"}>
                            <FormattedMessage id="startToday.formSection.secondLabel"/>
                        </label>
                        <select style={error.status || formIsValid == false ? {
                            border: 'solid 1px #791097',
                            backgroundColor: 'rgba(236, 28, 36, 0.04)'
                        } : null}
                                className={locale == "en" ? "form_div_ele form_div_selectEn" : "form_div_ele form_div_selectAr"}
                                id={"status"} defaultValue={status_new} onChange={(event) => {
                            handleChangeStatus(event)
                        }}>
                            <option disabled selected>
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
                        <input value={name_new} type="text" name="name"
                               style={error.name || formIsValid == false ? {
                                   border: 'solid 1px #791097',
                                   backgroundColor: 'rgba(236, 28, 36, 0.04)'
                               } : null} className="form_div_ele" id="name" onChange={(e) => {
                            handleChangeName(e)
                        }} onBlur={(e) => {
                            handleChangeName(e)
                        }}/>
                        {error.name ? errorMessage(<FormattedMessage id="validation.name"/>) : null}
                    </FormControl>
                    <FormControl>
                        <label className="form_div_label" htmlFor={"details"}>
                            <FormattedMessage id="startToday.formSection.thirdLabel"/>
                        </label>
                        <input value={detials_new} type="text" name="details"
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
                            {id > 0  ? <FormattedMessage id="startToday.formSection.editBtn"/>:<FormattedMessage id="startToday.formSection.sendBtn"/>}
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