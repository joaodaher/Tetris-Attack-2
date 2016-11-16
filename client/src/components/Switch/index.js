import React, { Component } from 'react'

class Switch extends Component {
    constructor(props) {
        super(props)
        this._onChange = this._onChange.bind(this)
    }

    _onChange() {
        this.props.onChange();
    }

    render() {
        let classes = "bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-04"

        if (this.props.checked) classes += " bootstrap-switch-on"

        return (
            <div className={'bootstrap-switch-square ' + this.props.className}>
                <div className={classes}>
                    <div className="bootstrap-switch-container">
                        <span className="bootstrap-switch-handle-on bootstrap-switch-primary">{this.props.onLabel}</span>
                        <label className="bootstrap-switch-label">&nbsp;</label>
                        <span className="bootstrap-switch-handle-off bootstrap-switch-default">this.props.offLabel</span>
                        <input type="checkbox" name={this.props.name} onChange={this._onChange} checked={this.props.checked}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Switch
