import React, {Component} from 'react';
import MarleyAPI from "./MarleyAPI";

class ContentfulImage extends Component {
    constructor(props) {
        super(props);
        this.state = {imgId: props.imgId}
    }

    componentDidMount() {
        MarleyAPI.getImageUrl(this.props.imgId).then(url => {
            this.setState({url: url})
        })
    }

    render() {
        if (!this.state.url)
            return (<p>Loading data</p>)
        return (
            <img src={this.state.url} className='contentful-img'/>
        );
    }
}


export default ContentfulImage;
