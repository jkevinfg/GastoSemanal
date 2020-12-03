import {Presupuesto} from './Presupuesto.js'
import {UI} from './UI.js'


const formPresupuesto = document.querySelector('#agregar-presupuesto')
const formGasto = document.querySelector('#agregar-gasto');
formPresupuesto.addEventListener('submit', validarPresupuesto)
formGasto.addEventListener('submit', agregarGasto )
let presupuestoUsuario;

const ui = new UI()

function validarPresupuesto(e){
    e.preventDefault();
    const presupuesto = document.querySelector('#presupuestoSemanal').value;
    console.log(presupuesto)
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

    if (cantidad > presupuestoUsuario.restante){
        ui.imprimirAlerta("No tienes suficiente dinero","danger" )
    }else{
        presupuestoUsuario.nuevoGasto(gasto)
        ui.imprimirAlerta("Agregando Gasto" )
        const {gastos , restante , presupuesto} = presupuestoUsuario
        ui.mostrarGastos(gastos)
        ui.actualizarRestante(restante)
        ui.comprobarPresupuesto(presupuestoUsuario)
        formGasto.reset();
    }
}

export function eliminarGasto(id){
    presupuestoUsuario.eliminarGasto(id)
    const {gastos  , restante} = presupuestoUsuario
    ui.mostrarGastos(gastos)
    ui.actualizarRestante(restante)
    ui.comprobarPresupuesto(presupuestoUsuario)
}
export default eliminarGasto();