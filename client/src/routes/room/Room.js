import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Room.css';
import Switch from '../../components/Switch'
import NavBar from '../../components/Navigation'
import RoomCard from '../../components/Room/RoomCard'

const RoomHeader = () => (
    <div className="row">
        <div className="col-md-8">
            <h4> [ROOM] Sala de testinho bolado é nois </h4>
            <span>
                <span className='pull-left' style={{marginRight: 20}}>
                    <strong> RoomID </strong> #MB238HVDW0256
                </span>
                <Switch
                    className='pull-left'
                    name='kind'
                    onLabel='PBL'
                    offLabel='PVT'
                    checked='false'
                    onChange={() => false}
                />
            </span>
        </div>
    </div>
)

const Room = () => (
    <div className="container">
        <NavBar>
            <RoomHeader />
        </NavBar>
        <form style={{marginTop: 60}} className='row'>
            <div className='col-md-3'>
                <RoomCard user={{
                    name: 'Guilheme Diego',
                    photo: 'https://scontent.fplu1-1.fna.fbcdn.net/v/t1.0-9/14717211_1179280952158814_4296727703080457537_n.jpg?oh=80a54dbdf575bc364df1d2ae3b658780&oe=58CE80FE',
                    ranked: 'A',
                    wins: 5,
                    loses: 5
                }} />
            </div>
            <div className='col-md-3'>
                <RoomCard user={null} />
            </div>
            <div className='col-md-3'>
                <RoomCard user={null} />
            </div>
            <div className='col-md-3'>
                <RoomCard user={null} />
            </div>
        </form>
    </div>
)

export default withStyles(s)(Room);
