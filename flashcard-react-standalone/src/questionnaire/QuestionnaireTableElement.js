import React from 'react';

export default class QuestionnaireTableElement extends React.Component {

    render() {
        return (
        <tr>
            <td>{this.props.element.id}</td>
            <td>{this.props.element.title}</td>
            <td>{this.props.element.description}</td>
        </tr>
        )
    }
}