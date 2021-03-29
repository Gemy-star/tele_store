import React , {useContext} from 'react';
import Logo from '../../assets/logos/logo.svg';
import {FormattedMessage} from 'react-intl';
import {LocalizationContext} from "../../context/LocalizationContext";
import './_header.scss';

const Header = props => {
    const [locale , setLocale] = useContext(LocalizationContext);
    return (
        <header>
            <div className="header_container">
                <div className="header_logo">
                    <img src={Logo}/>
                </div>
                <button onClick={() =>  locale ===  'en' ? setLocale('ar') : setLocale('en')} className="header_btn"> <p> <FormattedMessage id="header.btn"/></p> </button>
            </div>
        </header>
    )
}


export default Header;