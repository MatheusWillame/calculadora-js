class CalculadoraController{

	constructor(x){
		
		//atributos 
		this._display = "0"; //"_" -> private
		this._currentDate = this.RetornaDataAtual(); //data atual
		this._currentTime = this.RetornaHoraAtual();;
		this.initialize();

		
		this.RetornaHoraAtual();
		
	}

	initialize(){

		//capturando os elementos da DOM
		let $display = document.querySelector("#display");
		let $date = document.querySelector("#data");
		let $time = document.querySelector("#hora");

		//passa o dado para dom
		$display.innerHTML = "4564"; 
		$date.innerHTML = this._currentDate; 
		$time.innerHTML = this._currentTime; 


	}

	get display(){
		return this._display;
	}

	set display(valor){
		this._display = valor;
	}

	get dataatual(){
		return this.currentDate;
	}

	set dataatual(valor){
		this._currentDate = valor;
	}

	RetornaDataAtual(){
	  var dNow = new Date();
	  var localdate = dNow.getDate() + '/' + (dNow.getMonth()+1) + '/' + dNow.getFullYear();
	  return localdate;
	}

	RetornaHoraAtual(){
	  var dNow = new Date();
	  var localdate = dNow.getHours() + ':' + dNow.getMinutes();
	  return localdate;
	}



}