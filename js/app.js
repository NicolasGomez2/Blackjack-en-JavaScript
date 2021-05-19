/** *
 * 2C Two of Clubs 
 * 2D Two of Diamonds 
 * 2H Two of Hearts
 * 2S Two of Spades
*/


let deck         = []; // Baraja
const tipos      = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

    
// Referencias del HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');




const crearDeck = () => {

for( let i = 2; i <= 10; i++ ){
   
   for( let tipo of tipos) { // este for itera por cada uno de los elementos del for principal

    deck.push( i + tipo);


   }
}

for( let tipo of tipos){

   for (let esp of especiales){

    deck.push(esp + tipo);


   }
 

}


deck = _.shuffle( deck ); 

console.log( deck );

return deck;


}

crearDeck();


// Esta función me permite tomar una carta 

const pedirCarta = (deck) => {

if ( deck.length === 0 ){    

    throw 'No hay cartas en el deck';

 }

  carta = deck.pop();
  return carta;

}




const valorCarta = ( carta ) => {

   
    const valor = carta.substring(0, carta.length - 1);

    return ( isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 
            : valor * 1;
       

  
}



// turno de la computadora 
const  turnoComputadora = ( puntosMinimos ) => {


   do{


      const carta = pedirCarta(deck);

      puntosComputadora = puntosComputadora + valorCarta( carta );
      puntosHTML[1].innerText = puntosComputadora;
      
      // <img class="carta" src="assets/cartas/10C.png" alt=""> 
      
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD, AC
      imgCarta.classList.add('carta'); 
        
      divCartasComputadora.append ( imgCarta );


      if( puntosMinimos > 21 ){

       break;

      }


   } while( puntosComputadora < puntosMinimos && (puntosMinimos <= 21 ));
    

   setTimeout (() => {

      quienGana();


   }, 50);
   
}




//EVENTOS DOM

btnPedir.addEventListener('click',  ()=> {

const carta = pedirCarta(deck);

puntosJugador = puntosJugador + valorCarta( carta );
puntosHTML[0].innerText = puntosJugador;

// <img class="carta" src="assets/cartas/10C.png" alt=""> 


const imgCarta = document.createElement('img');
imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
imgCarta.classList.add('carta'); 
  
divCartasJugador.append ( imgCarta );


if (puntosJugador > 21 ){

console.log('Lo siento mucho, perdiste');
btnPedir.disabled = true;

} else if ( puntosJugador === 21 ){


 console.warn('21, Ganaste!');

}

});





btnDetener.addEventListener('click', () => {


   btnPedir.disabled = true;
   btnDetener.disabled = true;
   turnoComputadora(puntosJugador);

     
});


btnNuevo.addEventListener('click', () => {
   
   console.clear();
   btnPedir.disabled   = false;
   btnDetener.disabled = false;
   location.reload();
 
   

});



//Funcion quien gana ? 

const quienGana = ()=> { 
 (puntosJugador === puntosComputadora)?                   alert("Nadie Gana!"):
 (puntosJugador > 21 && puntosComputadora < 21)?  alert("La computadora gana"):
 (puntosComputadora > 21 && puntosJugador < 21)?             alert("Ganaste!"): 
 (puntosComputadora < puntosJugador && puntosJugador < 21)?  alert("Ganaste!"):
 (puntosJugador === 21)?       alert("Ganaste"): alert("La computadora Gana!");

}







// TODO:  Borrar


