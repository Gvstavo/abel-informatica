import "../css/app.scss"
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import regeneratorRuntime from "regenerator-runtime";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialogo from './dialog.js';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


var api = axios.create({
    headers: { 'X-NZ-Token': window['API_TOKEN'] }
});


class Atendimento extends React.Component {



	constructor(props){
	
		super(props);
		this.state = {
			cliente:  '' ,
			contato: " " ,
			entrada: new Date(),
			pago: "pendente",
			saida: new Date(),
			servico: " ",
			valor: 0.0,
      obs: " ",
      arr: [],
      update: false,
      id: 0
		};

		this.handleChangeClient = this.handleChangeClient.bind(this);
		this.handleChangeContato = this.handleChangeContato.bind(this);
		this.handleChangeEntrada = this.handleChangeEntrada.bind(this);
		this.handleChangePago = this.handleChangePago.bind(this);
		this.handleChangeSaida = this.handleChangeSaida.bind(this);
		this.handleChangeServico = this.handleChangeServico.bind(this);
		this.handleChangeValor = this.handleChangeValor.bind(this);
    this.handleChangeArr = this.handleChangeArr.bind(this);
    this.handleChangeObs = this.handleChangeObs.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);


	}

  componentDidMount(){
    let ret =  axios.get('/api/all').then(function (response) {
      this.handleChangeArr(response);
    }.bind(this))

  }

 



  handleChangeArr(event){
    this.setState({arr: JSON.parse(event.data)});
    console.log(this.state.arr);
  }

  handleChangeClient(event) {    
  	this.setState({cliente: event.target.value});
  }
	
  handleChangeContato(event) {    
  	this.setState({contato: event.target.value});
  }

  handleChangeEntrada(event) {    
  	this.setState({entrada: event.target.value});
  }
  handleChangePago(event) { 
  //	if (event.target.value == "pago")   
  		this.setState({pago: event.target.value});
  	//else
  		//this.setState({pago: false});

  }
  handleChangeSaida(event) {    
  	this.setState({saida: event.target.value});
  }
  handleChangeServico(event) {    
  	this.setState({servico: event.target.value});
  }

  handleChangeValor(event) {    
  	this.setState({valor: event.target.value});
  }
  handleChangeObs(event) {    
    this.setState({obs: event.target.value});
  }

  handleDelete(id){

    let r = '/api/delete/' + id;

    axios.get(r).then(function (response) {
      window.location.reload(false)
    })


  }

  
  

  handleSubmit(event){

		let ret = axios.post('/api/create', {
	    cliente: this.state.cliente,
	    contato: this.state.contato,
	    entrada: this.state.entrada,
	    saida: this.state.saida,
	    pago: this.state.pago,
	    servico: this.state.servico,
	    valor: this.state.valor,
      observacao: this.state.obs

	  })
	  .then(function (response) {
	    window.location.reload(false) 	
	  })  


  
    event.preventDefault();
  }


  handleUpdate(event){




    let ret = axios.post('/api/update', {
      id: this.state.id,
      cliente: this.state.cliente,
      contato: this.state.contato,
      entrada: this.state.entrada,
      saida: this.state.saida,
      pago: this.state.pago,
      servico: this.state.servico,
      valor: this.state.valor,
      observacao: this.state.obs

    })
    .then(function (response) {
      window.location.reload(false) 
    });  


  
    event.preventDefault();
    
  }

  handleLoadFormUpdate(id){

    let ret;


    let r = '/api/get/' + id;
    axios.get(r).then(function (response) {
       


      ret = JSON.parse(response.data);
      this.setState({update: true});
      this.setState({cliente: ret.cliente});
      this.setState({contato: ret.contato});
      this.setState({entrada: ret.entrada.slice(0,10)});
      this.setState({servico: ret.servico});
      this.setState({saida: ret.saida.slice(0,10)});
      this.setState({obs: ret.observacao});
      this.setState({pago: ret.pago? "pago" : "pendente"});
      this.setState({valor: ret.valor});
      this.setState({id: ret.id});
    }.bind(this))


  }
	render()	{



		return(
      <>

		  <form onSubmit={this.state.update? this.handleUpdate : this.handleSubmit}>
        <label>
          Cliente:

          <input type="text" value={this.state.cliente} onChange={this.handleChangeClient} />
        </label>
        <label>
          Contato:

          <input type="text" value={this.state.contato} onChange={this.handleChangeContato} />
        </label>
        <label>
          Entrada:
          <input type="date" value={this.state.entrada} onChange={this.handleChangeEntrada} />
         
        </label>
        <label>
          Saida:
          <input type="date" value={this.state.saida} onChange={this.handleChangeSaida} />
         
        </label>
        <label>
          Serviço:
          <textarea value={this.state.servico} onChange={this.handleChangeServico} />        
        </label>

        <label>
          Obs:
          <textarea value={this.state.obs} onChange={this.handleChangeObs} />        
        </label>

        <label>
          Pago:
         <select value={this.state.pago} onChange={this.handleChangePago}>
  				<option value="pendente">Pendente</option>
  				<option value="pago">Pago</option>
  			</select>	
         
        </label>
        <label>
          Valor:
          <input type="number" value={this.state.valor} onChange={this.handleChangeValor} />
         
        </label>
        
        <input type="submit" value="Enviar" />
      </form> 
         <TableContainer component={Paper}  >
        <Table size="small" aria-label="a dense table" >
          <TableHead>
            <TableRow>
              <TableCell >Cliente</TableCell>
              <TableCell >Contato</TableCell>
              <TableCell >Serviço</TableCell>
              <TableCell >Entrada</TableCell>
              <TableCell >Saida</TableCell>
              <TableCell >Valor</TableCell>
              <TableCell >Pago</TableCell>
              <TableCell >Obs</TableCell>
              <TableCell >Ação</TableCell>

            </TableRow>
          </TableHead>
        <TableBody>
          {this.state.arr.map((row) => (
            <TableRow key={row.id}>
            <TableCell component="th" scope="row">
                {row.cliente}
              </TableCell>
             
              <TableCell >{row.contato}</TableCell>
              <TableCell >{row.servico}</TableCell>
              <TableCell >{row.entrada}</TableCell>
              <TableCell >{row.saida}</TableCell>
              <TableCell >{row.valor}</TableCell>
              <TableCell >{row.pago? "Sim" : "Não"}</TableCell>
              <TableCell >{row.observacao}</TableCell>
              <TableCell ><a onClick={()=> this.handleDelete(row.id)}>Excluir</a>|<a onClick={()=> {this.handleLoadFormUpdate(row.id)}}>Editar</a> </TableCell>

            </TableRow> 
       
                           

          ))}
        </TableBody>
        </Table> 
      </TableContainer>   
     


  


      </>


		);


	}

}

export default Atendimento;