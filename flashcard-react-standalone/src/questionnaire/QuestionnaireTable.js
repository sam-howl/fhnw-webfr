import React from 'react';
import QuestionnaireTableElement from './QuestionnaireTableElement';
import { Table } from 'react-bootstrap';

export default class QestionnaireTable extends React.Component {

    render() {
        return (<Table striped hover >
            <tr>
                <td>ID</td>
                <td>Title</td>
                <td>Description</td>
            </tr>
            {this.props.list.map((e) =>
                <QuestionnaireTableElement element={e} />
            )}

        </Table>)
    }
}