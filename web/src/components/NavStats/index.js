import React from 'react';
import PropTypes from 'prop-types';

import { UikWidget, UikContainerHorizontal } from '../../@uik';

import StatsBox from './StatsBox';

class NavStats extends React.Component {
  render() {
    return (
      <UikWidget style={{ border: 0, boxShadow: '0px 0px 0px 0px', paddingTop: '10px' }} >
        <UikContainerHorizontal>
          {this.props.stats.map((value, i) => <StatsBox stats={value[0]} title={value[1]} key={i} />)}
        </UikContainerHorizontal>
      </UikWidget>
    );
  }
}

NavStats.propTypes = {
  stats: PropTypes.array.isRequired,
};

export default NavStats;
