# Descargar git

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
git config --global user.name "user"
git config --global user.email "mail"
```

## Clonar repositorio
```
git clone https://github.com/Juanma0247/teslio.git
code teslio
```

## Verificación
```
git status
```

# Sincronización
**Lo siguiente VSC con *Source Control* lo hace despues de iniciar sección**

---
> **Simpre antes de iniciar**
>
>git pull origin main
>
>**Siempre al terminar**
>```
>git add .
>git commit -m "Aquí di cambios hiciste."
>git push
>```
>
>**Configurar el hábito**
>```
>git pull (al empezar)
>git push (al terminar)
>```
>VS Code lo hace con botones:
>```
>Sync Changes
>Pull / Push
>```
---
