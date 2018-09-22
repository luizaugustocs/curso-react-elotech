import React from 'react';
import {Button} from 'react-bootstrap';

// class FormPessoa extends React.Component {


//     render() {

//         return (
//             <div>
//                 <input name="nome" value={this.props.nome} onChange={this.props.onChangeNome}/>
//                 <input name="idade" type="number" value={this.props.idade} onChange={this.props.onChangeIdade}/>
       
//                 <button onClick={this.props.adicionarPessoa}> Adicionar</button>
//             </div>
//         )
        
//     }
// }

const FormPessoa = (props) => {

    return (
        <div>
                 <input 
                 name="nome" 
                 value={props.nome} 
                 onChange={props.onChangeNome}/>
                 <input name="idade" type="number" 
                     value={props.idade} 
                    onChange={props.onChangeIdade}/>
       
                 <Button variant="primary" onClick={props.adicionarPessoa}> Adicionar</Button>
             </div>
    )
}

export default FormPessoa;