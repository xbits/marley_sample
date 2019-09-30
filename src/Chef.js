import React, {Component} from 'react';
import MarleyAPI from "./MarleyAPI";
import PropTypes from "prop-types";

class Chef extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        MarleyAPI.getEntry(this.props.id).then(
            chef => {
                this.setState({chef: chef})
            }
        )
    }

    render() {
        if (!this.state.chef)
            return (<span>Loading</span>)
        return (
            <span>
                {this.state.chef.fields.name}
            </span>
        );
    }
}

Chef.propTypes = {
  id: PropTypes.string
};

export default Chef;