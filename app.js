const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul')
const total = document.querySelector('#total')
const cantidadRestante = document.querySelector('#restante')

let presupuesto;
eventListeners();


function eventListeners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
    formulario.addEventListener('submit', agregarGasto )
}

// Clases
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]

    }
}
class UI{

    mostrarPresupuesto(cantidad){
        const {presupuesto , restante} = cantidad
        total.textContent = presupuesto;
        cantidadRestante.textContent = restante;
    }
    imprimirAlerta(mensaje,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.textContent = mensaje;
        divMensaje.classList.add('alert','text-center')
        if(tipo === 'danger'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }
        const contenedor = document.querySelector('.primario');
        contenedor.insertBefore(divMensaje,formulario)
        setTimeout(()=>{
            divMensaje.remove()
        },3000)
    }
    agregarGastoListado(gastos){
        this.clearHtml();
        gastos.forEach( gasto => {
            const {nombre, cantidad, id } = gasto
            // crear un li

            const nuevoGasto = document.createElement('li');
        //    nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'
            nuevoGasto.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center')
            nuevoGasto.dataset.id = id; // nuevoGasto.setAttribute('data-id',id)
            //Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class = "badge badge-primary badge-pill"> ${cantidad} </span>`;

            // Boton para borrar el gasto

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto')
            btnBorrar.innerHTML = 'Borrar &times;'
            nuevoGasto.appendChild(btnBorrar);

            gastoListado.appendChild(nuevoGasto)

        })
    }
    clearHtml(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

}

const ui = new UI()


// Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('Cual es tu presupuesto ?')
    if(presupuestoUsuario === '' || presupuestoUsuario=== null ||  isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
        window.location.reload();
        //preguntarPresupuesto();
    }
    presupuesto = new Presupuesto(presupuestoUsuario)
    ui.mostrarPresupuesto(presupuesto)
}

function  agregarGasto(e){
    e.preventDefault();
    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if(nombre ===  '' || cantidad === ''){
        return ui.imprimirAlerta("Ambos campos vacios", "danger")
    }else if (isNaN(cantidad)){
        return ui.imprimirAlerta("Cantidad no valida", "danger")
    }
    const gasto = {nombre, cantidad , id: Date.now(),}
    presupuesto.nuevoGasto(gasto)

    ui.imprimirAlerta("Agregando Gasto", )

    const {gastos} = presupuesto
    ui.agregarGastoListado(gastos)

    formulario.reset();

}

