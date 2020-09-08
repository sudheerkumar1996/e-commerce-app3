import React from 'react';
import './directory.styles.scss';
import MenuItem from '../../components/menu-item/menu-item.component';

import {createStructuredSelector} from  'reselect';
import {connect} from 'react-redux';
import {selectDirectorySections} from '../../redux/directory/directory.selectors';

const  Directory = ({sections}) =>(
  <div className='directory-menu'>
    {
      sections.map(({id,...otherSectionProps}) => (
      <MenuItem key={id} {...otherSectionProps}/>))
    }
  </div>
);
const mapSateToProps = createStructuredSelector( {
  sections: selectDirectorySections
});

export default connect(mapSateToProps)(Directory);