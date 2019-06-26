import React from 'react';
import PropTypes from 'prop-types';

import { UikAvatar } from '@uik';

class NavHeader extends React.Component {
  ufToStateName(uf) {
    switch(String(this.props.uf).toUpperCase()) {
      case 'SP': {
        return 'São Paulo'
      }

      case 'RJ': {
        return 'Rio de Janeiro'
      }

      default: {
        return 'Brasil'
      }
    }
   
  }

  render() {
    return (
      <UikAvatar highlighted
        imgUrl={this.props.imgUrl}
        name={this.props.title} 
        textBottom={this.ufToStateName()} 
        style={{padding: '20px', 'paddingBottom': '0px'}} />
    )
  }
}

NavHeader.propTypes = {
  title: PropTypes.string.isRequired,
  uf: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
}

export default NavHeader;