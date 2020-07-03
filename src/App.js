import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ApiItem from './components/ApiItem'
import Img from './components/Img'


const api = {
  baseUrl: "https://api.github.com/",
  client_id: "f79f4f79172b9f6c33e4",
  client_secret: "60c5b2239f2e51681daeab3a0a4b3874c41c9292"
}

class App extends Component {
  constructor(){
    super();  //serve para chamar o construtor na classe
    this.state = { //salva o estado
      githubData: []
    }
  }

  //conecxão axios com API
    componentDidMount(){  //chmado depois que o site foi carregado
      axios
        .get(
          api.baseUrl +
          "search/repositories?q=language:Java&sort=stars&page=1&"+ 
          api.client_id + 
          "&" + 
          api.client_secret
          )
        .then((res) => {
          console.log("Infos da API", res);
          this.setState({githubData: res.data.items}); //pode usar hooks
        })
    }

  render(){
    const {githubData} = this.state;

    return(
      <div className="container App">
        <div className="row">
          {githubData.map((name) => (
            <div className="col-md-12" key={name.id}> 
              <Img avatar_url={name.owner.avatar_url}> </Img>
              <ApiItem titulo = "Projeto: "item={name.name} /> 
              <ApiItem titulo = "Usuario: "item={name.owner.login} /> 
              <ApiItem titulo = "Descrição: "item={name.description} /> 
              <ApiItem titulo = "Estrelas: "item={name.stargazers_count} /> 
              <ApiItem titulo = "Forks: "item={name.forks_count} /> 
            </div>
          )
          )}
        </div>
      </div>
    );
  }
}

export default App;





/* 
  componentDidMount(){  //chmado depois que o site foi carregado
      axios
        .get(
          api.baseUrl +
          "/search/repositories?q=language:Java&sort=stars&page=1&client_id="+ 
          api.client_id + 
          "&client_secret=" + 
          api.client_secret
          )
        .then((res) => {
          console.log("Infos da API", res);
          this.setState({githubData: res.data.items});
        })
    }
*/

//https://douglasporto.com.br/blog/buscando-usuario-github-com-axios/