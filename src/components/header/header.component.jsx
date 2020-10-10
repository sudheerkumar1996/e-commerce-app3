import React from 'react';
import {HeaderContainer,OptionsContainer,OptionLink,OptionDiv,LogoContainer} from './header.styles';
//import './header.styles.scss';
import {connect} from 'react-redux';
//import {Link} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../card-icon/card-icon.component';
import {auth} from '../../firebase/firebase.utils';
import {clearAll} from '../../redux/cart/cart.actions';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';
const Header = ({currentUser,hidden}) => (
   <HeaderContainer>
       <LogoContainer to='/'>
           <Logo className='logo'/>
       </LogoContainer>
       <OptionsContainer>
           <OptionLink to='/shop'>SHOP</OptionLink>
           <OptionLink to='/contact'>CONTACT</OptionLink>
           {
               currentUser ? (
                   <OptionDiv onClick={()=>{auth.signOut()}} >
                       Sign Out
                      </OptionDiv> 
               ):(
                   <OptionLink to='/signin'>
                       Sign In
                   </OptionLink>
               ) 
            }
            <CartIcon/>
       </OptionsContainer>
       {hidden ? null : <CartDropdown />}
   </HeaderContainer>
);
// const mapSateToProps = ({user:{currentUser},cart:{hidden}}) =>( {
//     currentUser,
//     hidden

// });
//createStructuredSelector usig this selector that we get as our map states props into 
//each subsequent selector
const mapSateToProps = createStructuredSelector( {
        currentUser: selectCurrentUser,
        hidden: selectCartHidden
    });
    // const mapDispatchToProps = dispatch => ({
    //     clearAll: dispatch(clearAll())
    // });
export default connect(mapSateToProps)(Header);
// <OptionDiv onClick={()=> auth.signOut()} >