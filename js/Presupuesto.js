export class Presupuesto {
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
        this.restante = this.presupuesto - gastoTotal
    }
    eliminarGasto(id){
        this.gastos = this.gastos.filter( gasto => gasto.id != id )
        this.calcularRestante()
    }
}

// gasto < restante !