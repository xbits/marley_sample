import React, {Component} from 'react';
import {Card, Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import MarleyAPI from "./MarleyAPI";
import ContentfulImage from "./ContentfulImage";
import {Link} from 'react-router-dom';

/*
* The index page of recipes
 */
export default class Recipes extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.getRecipesData();
    }

    getRecipesData() {
        MarleyAPI.getEntries('recipe').then(response => {
            this.setState({recipeList: response})
        })
    };

    render() {
        if (!this.state.recipeList)
            return (<p>Loading</p>)
        return (
            <Row className="recipe-list">
                {
                    this.state.recipeList.items.map(recipe =>
                        <Col xs={12} md={6} key={recipe.sys.id} className="recipe-card-container">

                            <Link to={'/recipes/' + recipe.sys.id} className="recipe-card">
                                <h2 className="recipe-title">{recipe.fields.title}</h2>
                                <ContentfulImage imgId={recipe.fields.photo.sys.id}/>
                            </Link>
                        </Col>
                    )

                }
            </Row>
        );
    }

}
