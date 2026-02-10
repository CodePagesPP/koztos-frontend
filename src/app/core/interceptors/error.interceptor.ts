import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const message = inject(NzMessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = 'Ocurrió un error inesperado';

      if (error.status === 0) {
        errorMsg = 'No hay conexión con el servidor (Backend apagado)';
      } else {
        
        const backendMessage = error.error?.message;

        switch (error.status) {
          case 400: errorMsg = backendMessage || 'Datos incorrectos'; break;
          case 401: errorMsg = 'Sesión expirada'; break;
          case 403: errorMsg = 'No tienes permisos'; break;
          case 404: errorMsg = 'Recurso no encontrado'; break;
          case 500: errorMsg = 'Error interno en el servidor'; break;
          default: errorMsg = backendMessage || `Error: ${error.message}`;
        }
      }

      message.error(errorMsg, { nzDuration: 4000 });
      
      return throwError(() => error);
    })
  );
};
