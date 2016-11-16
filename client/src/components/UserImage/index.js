import React from 'react'

import cx from 'classnames'
import s from './UserImage.css'

const getInitials = (name) => {
    const splited = name.split(" ");

    return (splited[0] ? splited[0][0] : '') + (splited[1] ? splited[1][0] : '')
}

const UserWrap = ({ className, children }) => (<div className={cx(s.photo, className)}>{children}</div>)

const UserImage = ({ user, className = '' }) => {
    if (!user)
        return (<UserWrap className={className} />)

    const childrenElement = user.photo ?
                                (<img className={s.img} src={user.photo} alt={user.name} />) :
                                (<span> {getInitials(user.name)} </span>)

    return (
        <UserWrap className={className}>
            {childrenElement}
        </UserWrap>
    )
}

export default UserImage
