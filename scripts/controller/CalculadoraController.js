class CalculadoraController{

	constructor(x){

		//*atributos*
		this.operacao = [];
		this.$display = document.querySelector("#display"); //capturando os elementos da DOM (seletores)
		this.$date = document.querySelector("#data");
		this.$time = document.querySelector("#hora");

		this.initialize();
		this.initButtonsEvents();

	}

	initialize(){


		this.setDisplayDateTime(); //aqui novamente para não demorar  1s para a funcao interval aparecer
		
		setInterval(()=>{ //interval - arrow function rodando a cada 1s

			this.setDisplayDateTime();

		}, 1000);

	}


	//método para tratar os dois eventos: click e drag
	addEventListenerAll(elements, events, fn){ //AddEventListener só suporta um evento por vez, por isso temos criar o nosso proprio

		events.split(' ').forEach(event => { //split: cria um array separando os eventos por virgula 'click drag'
			elements.addEventListener(event, fn, false);
		})

	}

	clearAll(){ 
		this.operacao = [];

		//limpar tela
		this.setLastNumberDisplay();
	}

	clearEntry(){
		this.operacao.pop(); //excluir o último elemento do array
	
		//limpar tela
		this.setLastNumberDisplay();
	}

	getLastOperation(){ //pegar ultima posicao do array 

		return this.operacao[this.operacao.length-1]; //pega qual foi a ultima opercao

	}

	setLastOperation(value){

		this.operacao[this.operacao.length-1] = value;

	}	

	isOperator(value){

		return (['+','-','*','%','/'].indexOf(value) > -1); //buscar o value no array e retorna o index do eleemento eencontrado

	}

	calc(){

		let last = '';

		if(this.operacao.length > 3){
			last = this.operacao.pop(); 
		}
		
		let result = eval(this.operacao.join(""));

		if(last == '%'){
			result /= 100;
			this.operacao = [result];	
		}else{
			this.operacao = [result];	

			if(last) this.operacao.push(last);

		}		
		
		//atualiza display
		this.setLastNumberDisplay();


	}

	pushOperation(value){

		this.operacao.push(value);

		if(this.operacao.length > 3){

			this.calc();

		}

	}

	setLastNumberDisplay(){

		let lastNumber;

		for(let i=this.operacao.length-1; i>=0; i--){
			
			if(!this.isOperator(this.operacao[i])){
				lastNumber = this.operacao[i];
				break;
			}
		}

		if(!lastNumber)lastNumber = 0;

		this.display = lastNumber;

	}

	addOperation(value){
		 //método push adicionar um valor no final do array

		 //console.log("****", value, isNaN(this.getLastOperation()));

		if(isNaN(this.getLastOperation())){  //se não for um número

			if(this.isOperator(value)){ //verifica se é uma opercao para trocar

				this.setLastOperation(value); //substituir o ultimo item para o item atual

			}else if(isNaN(value)){
			
				console.log(value);

			}else{
				this.pushOperation(value);
				//atualiza display
				this.setLastNumberDisplay();
			}

		}else{ //se for um número

			if(this.isOperator(value)){
				this.pushOperation(value);
			}else{

				let novovalor = this.getLastOperation().toString()+value.toString(); //cocatena o ultimo numero com o atual digitado
				this.setLastOperation(parseInt(novovalor)); //adiciona novo valor no array

				//atualiza display
				this.setLastNumberDisplay();
			}

		}

		console.log(this.operacao);

	}

	setError(){
		this.display = "error";
	}

	execBtn(value){

		switch (value) {
			case 'ac': // ac - apagar tudo
				this.clearAll();
				break;
			case 'ce': // ce - exclui o último
				this.clearEntry();
				break;
			case 'soma':
				this.addOperation('+');
				break;
			case 'subtracao':
				this.addOperation('-');
				break;
			case 'divisao':
				this.addOperation('/');
				break;
			case 'multiplicacao':
				this.addOperation('*');
				break;
			case 'porcento':
				this.addOperation('%');
				break;
			case 'igual':
				this.calc();
				break;
			case 'ponto':
				this.addOperation('.');
				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperation(parseInt(value));
				break;
			default:
				this.setError();
				break;
		}

	}

	//funcao multi click
	initButtonsEvents(){

		let buttons = document.querySelectorAll("#buttons > g, #parts > g");

		buttons.forEach((btn, index)=>{

			this.addEventListenerAll(btn,'click drag', e=>{
				
				let textBtn = btn.className.baseVal.replace("btn-",""); //replace -> retirar btn- e colocar ""(nada) no lugar

				this.execBtn(textBtn);


			});
			//evento de mouse
			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
				btn.style.cursor = 'pointer'; //mudar o cursosr do mouse
			});

		});
	}

	get display(){
		return this.$display.innerHTML;
	}

	set display(valor){
		this.$display.innerHTML = valor;
	}

	get date(){
		return this.$date.innerHTML;
	}

	set date(valor){
		this.$date.innerHTML = valor;
	}

	get time(){
		return this.$time.innerHTML;
	}

	set date(valor){
		this.$time.innerHTML = valor;
	}

	setDisplayDateTime(){
		//passa o dado para dom
		this.$date.innerHTML = retornaDataAtual(); 
		this.$time.innerHTML = retornaHoraAtual(); 
	}

	
	}

	function retornaDataAtual(){
		var dNow = new Date();
		var localdate = dNow.toLocaleDateString('pt-BR',{
			day: '2-digit',
			month: 'long',
			year: 'numeric'
		});
	  	return localdate;
	}

	function retornaHoraAtual(){
	  	var dNow = new Date();
	  	var localdate = dNow.toLocaleTimeString('pt-BR'); //{hour: '2-digit', minute:'2-digit'}
	  	return localdate;
	}