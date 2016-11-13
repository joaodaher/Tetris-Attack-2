import React, { PropTypes } from 'react';
import uid from 'uid'

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {searchText : ''}

        this.searchInput = this.searchInput.bind(this)
        this.onChange = this.onChange.bind(this)
        this.filterItems = this.filterItems.bind(this)
        this.mapItem = this.mapItem.bind(this)
    }

    searchInput() {
        return (
            <div className="todo-search">
                <input style={{width: "100%"}} className="todo-search-field" onChange={this.onChange}
                        type="search" value={this.state.searchText}
                        placeholder={this.props.search.placeholder} />
            </div>
        )
    }

    onChange(e) {
        this.setState({searchText: e.target.value})
    }

    filterItems(i) {
        if (!this.props.search) return i

        let hasInFields = false;

        for (let key of this.props.search.fields) {
            let rxp = new RegExp(this.state.searchText, "gi")
            if (i[key].match(rxp)) hasInFields = true
        }

        if (hasInFields) return i
    }

    mapItem(i) {
        return (<this.props.renderedItem key={uid()} item={i} />)
    }

    render() {
        const filteredItems = this.props.items.filter(this.filterItems);

        return (
            <div className="todo">
                {this.props.search ? this.searchInput() : null}
                <ul>
                    {filteredItems.map(this.mapItem)}
                </ul>
            </div>
        );
    }
}

export default List;
