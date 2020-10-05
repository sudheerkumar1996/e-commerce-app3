import React from 'react';
//import './collections-overview.styles.scss';
import {CollectionsOverviewContainer} from './collections-overview.styles.jsx';
import { connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors';

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionsOverview = ({collections}) =>(
<CollectionsOverviewContainer>
{
    collections.map(({id, ...otherCollectionProps}) => (
        <CollectionPreview key={id} {...otherCollectionProps}/> 
    ))
}
</CollectionsOverviewContainer>
)
const mapStateToProps = createStructuredSelector(
    {
        collections: selectCollectionsForPreview
    }
)
export default connect(mapStateToProps) (CollectionsOverview);