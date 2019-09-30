import React, {Component} from 'react';
import MarleyAPI from "./MarleyAPI";

class TagList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        if(!this.props.tagList) return;

        var ids = this.props.tagList.map(tag => {
            return tag.sys.id
        });
        MarleyAPI.getEntriesByIds(ids).then(
            data => {
                this.setState({tags: data.items})
            }
        )
    }

    render() {
        if (!this.props.tagList || this.props.tagList.length == 0)
            return <p className='text-muted'>Untagged</p>
        if (!this.state.tags)
            return <p>Loading</p>
        return (
            <div className="tag-list">
                {this.state.tags.map((tag) => {
                        return <div className='badge badge-secondary' key={tag.sys.id}>{tag.fields.name}</div>
                    }
                )}
            </div>
        );
    }
};

export default TagList;
