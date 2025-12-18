# Descargar git (si no lo tienes)

Git en https://git-scm.com/install/windows
<img width="1011" height="631" alt="Captura de pantalla 2025-12-15 230233" src="https://github.com/user-attachments/assets/366c3bd2-0da8-4115-803c-a2297a46ce72" />

## Verificación
```
git --version
```

# Ingresar a la carpeta en la que piensas trabajar

<img width="1366" height="724" alt="Captura de pantalla 2025-12-15 231004" src="https://github.com/user-attachments/assets/47995e4b-82c9-4947-b016-e187380809f2" />

# Inicializar
## Inicializar git
```
git init
```

## Iniciar sección
> Tienes que iniciar seccion con tu usuario y mail en GitHub. Es importante que tu cuenta esté asociada al proyecto.
```
git config --global user.name "you_user"
git config --global user.email "you_mail"
```

## Clonar repositorio e ingresar a la carpeta
```
git clone https://github.com/Juanma0247/teslio.git
cd teslio
```

## Verificación
```
git status
```

# Sincronización
<img width="348" height="725" alt="image" src="https://github.com/user-attachments/assets/7586e12c-294b-4637-b04d-09847f9124a1" />

Lo siguiente VSC con *Source Control* lo hace despues de iniciar sección y sincronizar el primer cambio, pero ejecutalo una vez.

---
> **Simpre antes de iniciar**
>```
>git pull origin main
>```
>
>**Siempre al terminar**
>```
>git add .
>git commit -m "Aquí di cambios hiciste."
>git push
>```
