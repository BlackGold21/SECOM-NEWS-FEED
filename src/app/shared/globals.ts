import { Subject } from "rxjs";

var cargando_bandera$ = new Subject<boolean>();

export var globals = {
    default_notify(mensaje: any) {
        return {
            message: mensaje,
            type: "success",
            width: 400,
            position: { at: 'bottom center', my: 'bottom center', offset: '0 -80' }
        }
    },
    error_notify(mensaje: any) {
        return {
            message: mensaje,
            type: "error",
            width: 400,
            position: { at: 'bottom center', my: 'bottom center', offset: '0 -80' }
        }
    },
    ejercicio_actual: 2022,
    cargando(bandera: boolean) {
        cargando_bandera$.next(bandera);
        return cargando_bandera$.asObservable();
    }
};