import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';


class Configuracoes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: '',
            userName: '',
            photoURL: ''
        }
    }

    onChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name] : value
        });
    }
    onSave = ( ) => {

    }
    render() {
        const {nome, userName, photoURL} = this.state;

        return (
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="nome" value={nome} onChange={this.onChange} size="sm"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Nome de Usuário</Form.Label>
                        <Form.Control name="userName" value={userName} onChange={this.onChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Url da foto</Form.Label>
                        <Form.Control name="photoURL" value={photoURL} onChange={this.onChange}/>
                    </Form.Group>
                <Button variant="success" onClick={this.onSave}>Salvar</Button>
                </Form>
            </Container>
        )
    }
}


export default Configuracoes;