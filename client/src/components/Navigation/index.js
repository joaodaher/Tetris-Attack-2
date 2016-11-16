import React, { PropTypes } from 'react';
import cx from 'classnames';

import UserImage from '../UserImage'

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';

class Navigation extends React.Component {
  constructor(props) {
      super(props)
  }

  authComponent() {
      return (
        <div className={cx('row', s.authcard)}>
            <div className={s.authinfo}>
                <h5> {this.props.auth.name } </h5>
                <div className='row'>
                    <div style={{lineHeight: "30px"}} className='col-md-8'>
                        Coins: {this.props.auth.coins}
                    </div>
                    <div className='col-md-4'>
                        <div className="btn-group">
                            <button data-toggle="dropdown" className={cx("btn btn-inverse dropdown-toggle", s.options)} type="button">
                                <span className="fui-gear"></span>
                            </button>
                            <ul role="menu" className="dropdown-menu">
                                <li><a href="#">Profile</a></li>
                                <li><a href="#">Settings</a></li>
                                <li><a href="#">Shop</a></li>
                                <li className="divider"></li>
                                <li><a href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <UserImage className={s.authimage} user={this.props.auth} />
        </div>
      )
  }

  noAuthComponent() {
      return (
        <div>
            <a className={cx('btn btn-primary', s.register)} href='/register'>Register</a>
            <a className={cx('btn', s.login)} href='/login'>Login</a>
        </div>
      )
  }

  render() {
    return (
        <div className={cx('row', s.navigation)}>
            <div className='col-md-8'>
                {this.props.children}
            </div>
            <div className='col-md-4'>
                {this.props.auth ? this.authComponent() : this.noAuthComponent()}
            </div>
        </div>
    )
  }
}

export default withStyles(s)(Navigation);
