import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
//import './App.css';
import {GlobalStyle} from './global.styles';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selector';
import {createStructuredSelector} from 'reselect';
import Header from './components/header/header.component';

import ShopPage from './pages/shop/shop.component';

import HomePage from './pages/homepage/homepage.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import CheckoutPage from './pages/checkout/checkout.component';

//import {auth ,createUserProfileDocument,addCollectionAndDocuments} from './firebase/firebase.utils';
import {auth ,createUserProfileDocument} from './firebase/firebase.utils';

//import {selectCollectionsForPreview} from './redux/shop/shop.selectors';

class App extends React.Component 
{
  unsubscribeFromAuth = null

  componentDidMount(){
      //const {setCurrentUser,collectionsArray} = this.props;
      const {setCurrentUser} = this.props;
      this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
     //createUserProfileDocument(userAuth);//user auth object, from auth library
     if(userAuth){
     // const {cartItems }=this.props;
       const userRef = await createUserProfileDocument(userAuth);
      //  console.log(cartItems);
      //  userRef.set({cartItems})
      //  try{
      //   await userRef.set({cartItems
      //   });
      // }
      // catch(error){
      //   console.log('error adding elements',error.message);
      // }
       userRef.onSnapshot(snapShot => {
         //console.log(snapShot.data());
        // this.setState
        setCurrentUser(
           {
               id: snapShot.id,
               ...snapShot.data()
            });
       });
     }
     setCurrentUser(userAuth);
    //  addCollectionAndDocuments('collections', collectionsArray.map
    //(({title,items})=>
    //  ({title,items})));

    });
  }
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render() {
  return (
    <div>
      <GlobalStyle />
      <Header/>
      <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage}/>
      <Route exact path='/checkout' component={CheckoutPage}/>
      <Route exact path='/signin' render={() =>
       this.props.currentUser ? (
       <Redirect to='/' />
       ):(
       <SignInAndSignUpPage/>
       ) }
       />
      </Switch>
    </div>
    );
  } 
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
 // cartItems: selectCartItems
   //collectionsArray: selectCollectionsForPreview
});
const mapDispatchToProps = dispatch => ({
      setCurrentUser: user => dispatch(setCurrentUser(user))
  });

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(App);
