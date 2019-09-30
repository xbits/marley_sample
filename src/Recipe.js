import React, {Component} from 'react';
import MarleyApi from "./MarleyAPI";
import { Row, Col} from "react-bootstrap";
import ContentfulImage from "./ContentfulImage";
import TagList from "./TagList";
import Chef from  "./Chef";
import {Link} from "react-router-dom";
import idx from "./lib/idx";

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state ={};
    }

    componentDidMount() {
        MarleyApi.getEntry(this.props.match.params.id).then(
            recipe=>{this.setState({recipe:recipe})}
        )


    }
    renderChef = (recipe) =>{
        let chefID = idx(['fields','chef','sys','id'], recipe);
        if(chefID){
            return (
                <div className='chef-name mt-2'>
                    Chef: <Chef id={chefID}/>
                </div>

            )
        }
    }

    render() {
        let recipe = this.state.recipe;
        if(!recipe)
            return (<p>Loading data</p>)
        return (
            <div className="recipe-page">

                    <Link to='/recipes' className="float-right">Back to recipes</Link>

                <h1 className="page-header">{recipe.fields.title}</h1>

                <Row>
                    <Col xs={12} md={6} className={"recipe-image"}>
                        <ContentfulImage imgId={recipe.fields.photo.sys.id} />
                    </Col>
                    <Col xs={12} md={6}>
                        <p>{recipe.fields.description}</p>
                        <TagList tagList={recipe.fields.tags} />
                        {this.renderChef(recipe)}
                    </Col>
                </Row>
            </div>

        );
    }
}


export default Recipe;
