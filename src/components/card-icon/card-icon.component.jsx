import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import {selectCartItemsCount} from '../../redux/cart/cart.selectors';
import {createStructuredSelector} from 'reselect';
//import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
//import '../card-icon/card-icon.styles.scss';
//import {auth ,firestore,createUserProfileDocument} from '../../firebase/firebase.utils';
//import {selectCurrentUser} from '../../redux/user/user.selector';
//import {selectCartItems} from '../../redux/cart/cart.selectors';
import {
    CartContainer,
    ShoppingIcon,
    ItemCountContainer
  } from './cart-icon.styles';

class CartIcon extends React.Component{
       render(){
        const {itemCount,toggleCartHidden}=this.props;
        return (
            <CartContainer onClick={toggleCartHidden}>
            <ShoppingIcon />
            <ItemCountContainer>{itemCount}</ItemCountContainer>
            </CartContainer>
        )
    }
}

// const CartIcon = ({toggleCartHidden,itemCount}) => (

//     <CartContainer onClick={toggleCartHidden}>
//     <ShoppingIcon />
//     <ItemCountContainer>{itemCount}</ItemCountContainer>
//     </CartContainer>
// );

const mapStateToProps = createStructuredSelector (
    {      // currentUser: selectCurrentUser,
            itemCount: selectCartItemsCount,
       //     cartItems: selectCartItems
    });

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});


export default connect(mapStateToProps, mapDispatchToProps)(CartIcon) ;
