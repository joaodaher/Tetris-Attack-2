/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

import NavBar from '../../components/Navigation';
import List from '../../components/List';
import RoomListItem from '../../components/Room/RoomListItem';

const ROOM_MOCK = [
    {name: "Joaozin nunca ganha", kind: 'public', owner: 'Guilherme Diego', players: [2,4]},
    {name: "Exemplo de sala private", kind: 'private', owner: 'Guilherme Diego', players: [3,4]},
    {name: "Exemplo de sala cheia pa carai", kind: 'public', owner: 'Guilherme Diego', players: [4,4]}
]

const SEARCH_CONFIG = {
    placeholder: "Search by name, owner or kind",
    fields: ['name', 'owner', 'kind']
}

class Home extends React.Component {
  static propTypes = {

  };

  render() {
    return (
        <main className='container'>
            <NavBar />
            <div className="row">
                <div className="col-md-8">
                    <List
                        renderedItem={RoomListItem}
                        items={ROOM_MOCK}
                        search={SEARCH_CONFIG}
                    />
                </div>
            </div>
        </main>
    );
  }
}

export default withStyles(s)(Home);
