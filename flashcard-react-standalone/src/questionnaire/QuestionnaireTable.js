import React from 'react';
import QuestionnaireTableElement from './QuestionnaireTableElement';
import { Table } from 'react-bootstrap';

export default class QestionnaireTable extends React.Component {

    render() {
        return (<Table striped bordered hover >
            <thead>
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Description</td>
            </tr>
            </thead>
            <tbody>
            {this.props.list.map((e) =>
                <QuestionnaireTableElement element={e} />
            )}
            </tbody>

        </Table>)
    }
}