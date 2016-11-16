import React from 'react'

import UserImage from '../UserImage'

import s from './RoomCard.css'
import cx from 'classnames'

const RoomCard = ({ user }) => (
    <div className={user ? s['room-card'] : cx(s['room-card'], s.placeholder) }>
        <UserImage className={s.photo} user={user} />
        <div className={s.name}>
            { user && user.name }
        </div>
        <div className='row'>
            <div className='col-md-4'>
                <div className={s.rkd}>
                    { user && user.ranked }
                </div>
            </div>
            <div className='col-md-4'>
                <div className={s.wins}>
                    { user && user.wins }
                </div>
            </div>
            <div className='col-md-4'>
                <div className={s.loses}>
                    { user && user.loses }
                </div>
            </div>
        </div>
    </div>
)

export default RoomCard
