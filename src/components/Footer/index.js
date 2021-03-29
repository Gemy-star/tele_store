import React from "react";
import './_footer.scss';
import Logo from '../../assets/logos/logo.svg'
import Facebook from '../../assets/icons/icon_facebook_on.svg';
import Instagram from '../../assets/icons/icon_instagram_on.svg';
import Link from '../../assets/icons/icon_linkedin_on.svg';
import Twitter from '../../assets/icons/icon_twitter_on.svg';
import Youtube from '../../assets/icons/icon_youtube.svg';
import {FormattedMessage} from "react-intl";

const Footer = props =>  {
    return (
        <footer className="footer">
            <div className="footer_logo_footer">
                <img src={Logo}/>
                <p> <FormattedMessage id="footer.subtitle" /></p>
            </div>
            <div className="footer_social-icons">
                <h4>  <FormattedMessage id="footer.social" /></h4>
                <div className="footer_social-icons_grid">
                    <img src={Facebook}  />
                    <img src={Twitter}  />
                    <img src={Youtube}  />
                    <img src={Instagram} />
                    <img src={Link} />
                </div>

            </div>
        </footer>
    )
}

export default Footer