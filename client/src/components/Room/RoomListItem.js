import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RoomListItem.css';

const RoomListItem = ({item}) => (
    <li className={s['room-item']}>
        <div className={`todo-content ${item.kind}`}>
            <h4 className="todo-name">
                {item.name}
            </h4>
            <strong> Created by: </strong> {item.owner} <br />
            <strong> Slots</strong>: {item.players.length}/{item.slots}
         </div>
         <div className={s.photos}>
            {item.players.map(p => <img className={s['photo-item']} src={p.image} alt={p.name} />)}
         </div>
         <div className={s.buttons}>
            <a className='btn btn-default'>SPEC</a>
            { item.players.length != item.slots ? <a className='btn btn-primary' href=''>JOIN</a> : null}
        </div>
    </li>
)

export default withStyles(s)(RoomListItem)
