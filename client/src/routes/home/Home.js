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
    {name: "Joaozin nunca ganha", slots: 4, kind: 'public', owner: 'Guilherme Diego', players: [
        { name: 'Guilherme Diego', photo: 'https://scontent.fplu1-1.fna.fbcdn.net/v/t1.0-9/14717211_1179280952158814_4296727703080457537_n.jpg?oh=80a54dbdf575bc364df1d2ae3b658780&oe=58CE80FE' },
        { name: 'X' }
    ]},
    {name: "Exemplo de sala private", slots: 4, kind: 'private', owner: 'Rafael Cassau', players: [
        { name: 'Y' },
        { name: 'Z' },
        { name: 'A' }
    ]},
    {name: "Exemplo de sala cheia pa carai", slots: 4, kind: 'public', owner: 'Hugo Pena', players: [
        { name: 'B' },
        { name: 'AS' },
        { name: 'EE' },
        { name: 'YY' }
    ]}
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
