import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FormPessoa from './FormPessoa';
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      idade: 0,
      pessoas: []
    }
  }

  onChangeNome = (evento) => {
    this.setState({nome: evento.target.value});
  }

  onChangeIdade = (evento) => {
    this.setState({idade: evento.target.value});
  }

  adicionarPessoa = () => {
    const novaPessoa = {
      nome: this.state.nome,
      idade: this.state.idade,
    }

    this.setState((state) => {
      const novasPessoas = [...state.pessoas, novaPessoa]
      return {
        pessoas: novasPessoas,
        nome: '',
        idade: ''
      }
    }
    
    )
  }

  renderPessoa = (pessoa) => {

    return (
      <div>
        Nome: {pessoa.nome}
        Idade: {pessoa.idade}
      </div>
    )
  }
  render() {

    const h1Style = {
      backgroundColor: '#555'
    }
    
    return (
      <div >
        
        <FormPessoa nome={this.state.nome} 
            idade={this.state.idade} 
            onChangeNome={this.onChangeNome} 
            onChangeIdade={this.onChangeIdade} 
            adicionarPessoa={this.adicionarPessoa}
        ></FormPessoa>


        <h1 className={this.state.pessoas.length > 0 ? '' : 'titulo-vermelho'}
          style={h1Style}
        >Lista de pessoas: </h1>

        {this.state.pessoas.map((pessoa) => this.renderPessoa(pessoa))}
      </div>

     
    );
  }
}

export default App;
