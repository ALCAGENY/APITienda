import rateLimit from "express-rate-limit";

export const Login = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: "Demasiados intentos, inténtalo de nuevo después de 15 minutos",
});



export const changePassword = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 3, 
  message: "Demasiadas actualizaciones, inténtalo de nuevo después de 24 horas",
})


export const amountLimit = rateLimit ({ 
  windowMs: 3 *60 *1000,
  max:5,
  message: "Demasiadas peticiones, intentelo de nuevo en 3 minutos"
})

export const getsLimit = rateLimit({
  windowMs: 2 *60 *1000,
  max:15,
  message: "Demasiadas peticiones, intentelo de nuevo en 2 minutos"
})


export const postLimits = rateLimit({
  windowMs: 2 *60 *1000,
  max:15,
  message: "Demasiadas peticiones, intentelo de nuevo en 3 minutos"
})

export const putLimits = rateLimit ({
  windowMs: 3 *60 *1000,
  max:10,
  message: "Demasiadas peticiones, intentelo de nuevo en 2 minutos"
})

export const deleteLimits = rateLimit ({
  windowMs: 1 *60 *1000,
  max:5,
  message: "Demasiadas peticiones, intentelo de nuevo en 1 minuto"
})

export const patchLimit = rateLimit ({
  windowMs: 2 *60 *1000,
  max:7,
  message: "Demasiadas peticiones, intentelo de nuevo en 2 minutos"
});