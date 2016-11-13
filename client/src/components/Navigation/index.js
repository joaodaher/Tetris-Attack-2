/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';

class Navigation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
        <nav style={{marginTop: 20}} className="navbar navbar-inverse" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
                    <span className="sr-only">Toggle navigation</span>
                </button>
                <a className="navbar-brand" href="#">Tetris Attack</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse-01">
                <ul className="nav navbar-nav navbar-right" action="#" role="search">
                    <li><a href="/create/user">Register</a></li>
                    <li><a href="/login">Login</a></li>
                </ul>
            </div>
        </nav>
    );
  }
}

export default withStyles(s)(Navigation);
