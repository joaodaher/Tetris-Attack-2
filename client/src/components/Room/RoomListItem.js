import React from 'react'

import uid from 'uid';

import UserImage from '../UserImage'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RoomListItem.css';

const getPlayerPhotos = (user) => {

    return (<UserImage key={uid()} className={s.photo} user={user} />)
}

const RoomListItem = ({item}) => (
    <li className={s['room-item']}>
        <div className={`todo-content ${item.kind} ${s.content}`}>
            <h4 className="todo-name">
                {item.name}
            </h4>
            <strong> Created by: </strong> {item.owner} <br />
            <strong> Slots</strong>: {item.players.length}/{item.slots}
         </div>
         <div className={s.controls}>
            <a className='btn btn-info'>SPEC</a>
            <a className={'btn btn-primary ' + (item.players.length == item.slots && 'disabled') } href=''>JOIN</a>
        </div>
         <div className={s.photos}>
            {item.players.map(getPlayerPhotos)}
         </div>
    </li>
)

export default withStyles(s)(RoomListItem)
