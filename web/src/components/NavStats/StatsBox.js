import React from 'react';
import PropTypes from 'prop-types';

import { UikWidgetContent, UikHeadlineDesc, UikHeadline } from '@uik';

class StatsBox extends React.Component {
  render() {
    return (
      <UikWidgetContent style={{border: 0, 'padding': '0px', 'paddingTop': '10px', 'paddingLeft': '25px', 'paddingBottom': '15px'}}>
        <UikHeadline style={{'fontSize': '1.1rem', 'lineHeight': '0'}}> 
          {this.props.stats} 
        </UikHeadline>
        <UikHeadlineDesc style={{'fontSize': '0.675em'}}>
          {this.props.title}
        </UikHeadlineDesc>
      </UikWidgetContent>  
    )
  }
}

StatsBox.propTypes = {
  stats: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
}

export default StatsBox;