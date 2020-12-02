const formPresupuesto = document.querySelector('#agregar-presupuesto')
const formGasto = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul')
const total = document.querySelector('#total')
const cantidadRestante = document.querySelector('#restante')

let presupuestoUsuario;


formPresupuesto.addEventListener('submit', validarPresupuesto)
formGasto.addEventListener('submit', agregarGasto )

// Clases
class Presupuesto {
    constructor(presupuestoUsuario){
        this.presupuesto = Number(presupuestoUsuario);
        this.restante = Number(presupuestoUsuario);
        this.gastos = [];
    }
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }
    calcularRestante(){
        const gastoTotal = this.gastos.reduce( (total , gasto) => total + gasto.cantidad , 0 )
        console.log(gastoTotal)
        this.restante = this.presupuesto - gastoTotal

    }
}


class UI{
    mostrarPresupuesto(presupuestoUsuario){
        const {presupuesto , restante } = presupuestoUsuario
        total.textContent = presupuesto;
        cantidadRestante.textContent = restante;
    }
    imprimirAlerta(mensaje,color,tipo){
        const divMensaje = document.createElement('div');
        divMensaje.textContent = mensaje;
        divMensaje.classList.add('alert','text-center')
        if(color === 'danger'){
            divMensaje.classList.add('alert-danger')
        }else{
            divMensaje.classList.add('alert-success')
        }
        if(tipo === 'formPresupuesto'){
            const contenedor = document.querySelector('.inicio');
            contenedor.insertBefore(divMensaje,formPresupuesto)
        } else{
            const contenedor = document.querySelector('.primario');
            contenedor.insertBefore(divMensaje,formGasto)
        }
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
    actualizarRestante(restante){
        cantidadRestante.textContent = restante;
    }

}

const ui = new UI()


// Funciones
function validarPresupuesto(e){
    e.preventDefault();
    const presupuesto = document.querySelector('#presupuestoSemanal').value;
    if(presupuesto === '' || presupuesto=== null ||  isNaN(presupuesto) || presupuesto <= 0 ) {
        return ui.imprimirAlerta("Cantidad no valida", "danger",'formPresupuesto')
    }
    presupuestoUsuario = new Presupuesto(presupuesto)
    ui.mostrarPresupuesto(presupuestoUsuario)
}

function  agregarGasto(e){
    e.preventDefault();
    const nombre = document.querySelector('#gasto').value;
    const cantidad =  Number ( document.querySelector('#cantidad').value ) ;

    if(nombre ===  '' || cantidad === ''){
        return ui.imprimirAlerta("Ambos campos vacios", "danger","formGasto")
    }else if (isNaN(cantidad)){
        return ui.imprimirAlerta("Cantidad no valida", "danger")
    }
    const gasto = {nombre, cantidad , id: Date.now(),}
    presupuestoUsuario.nuevoGasto(gasto)

    ui.imprimirAlerta("Agregando Gasto" )

    const {gastos , restante} = presupuestoUsuario
    ui.agregarGastoListado(gastos)
    ui.actualizarRestante(restante)
    formGasto.reset();

}

