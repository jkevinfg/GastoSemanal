import {eliminarGasto} from './app.js'

const gastoListado = document.querySelector('#gastos ul')
const total = document.querySelector('#total')
const cantidadRestante = document.querySelector('#restante')
const formPresupuesto = document.querySelector('#agregar-presupuesto')
const formGasto = document.querySelector('#agregar-gasto');

export class UI{
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
    mostrarGastos(gastos){
        this.clearHtml();
        gastos.forEach( gasto => {
            const {nombre, cantidad, id } = gasto
            // crear un li

            const nuevoGasto = document.createElement('li');
            nuevoGasto.classList.add('list-group-item','d-flex', 'justify-content-between', 'align-items-center')
            nuevoGasto.dataset.id = id;
            nuevoGasto.innerHTML = `${nombre} <span class = "badge badge-primary badge-pill"> ${cantidad} </span>`;

            // Boton para borrar el gasto

            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn','btn-danger','borrar-gasto')
            btnBorrar.innerHTML = 'Borrar &times;'
            btnBorrar.onclick = () => [
                eliminarGasto(id)
            ]
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
    comprobarPresupuesto(presupuestoUsuario){
        const { presupuesto , restante} = presupuestoUsuario;
        const divRestante = document.querySelector('.restante')
        // gasto > 75%

        // 26 27
        if ( (presupuesto/4) > restante ){
            divRestante.classList.remove('alert-success','alert-warning')
            divRestante.classList.add('alert-danger')
        }
        else if( ( presupuesto / 2) > restante  ) {
            divRestante.classList.remove('alert-success')
            divRestante.classList.add('alert-warning')
        } else {
            divRestante.classList.remove('alert-danger','alert-warning')
            divRestante.classList.add('alert-success')
        }
        if(restante === 0){
            this.imprimirAlerta("El presupuesto se ha agotado", 'danger','formGasto')
            formGasto.querySelector('button').disabled = true
        }
    }

}

