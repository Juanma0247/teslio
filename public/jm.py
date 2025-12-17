import math
import random
import time
from fractions import Fraction
from tkinter import N
import os
import glob
import sympy as sp # Matematicas simbólicas
import IPython.display as iPy
import inspect
import re

def clean(t = 10000):
  print("\b" * t, end=(""))

def install():
  b = 0
  for file in glob.glob("juanma.py*"):    
    if (file != "juanma.py"):
      try:
        os.remove(file)        
        b = 1
      except Exception as e:
        clean()
        print(f"The library could not be installed due to the error en {file}: {e}")  
        b = 0
  if b:
    clean()
    print("Juanma's library was successfully installed!")

def table(data, stiles = 0, border = "●─|", colors = "0"):  
  if len(border) == 3:
    pC = border[0]
    hC = border[1]
    vC = border[2]
  else:
    pC = "●"
    hC = "─"
    vC = "|"
  columnas = 0
  for i in data:
    if len(i) > columnas:
      columnas = len(i)
  anchos = [0] * columnas

  for i in data:    
    for j in i:
      if len(str(j)) > anchos[i.index(j)]:
        anchos[i.index(j)] = len(str(j))
  
  print(f"\033[{colors}m", end="")
  for i in anchos:
    espacios = hC * i
    print(f"{pC} {espacios}",end=(" "))
  print(pC)
  for i in data:
    if (data.index(i) == 0 and stiles == 0) or stiles == 2:
      for j in i:
        espacios = " " * (anchos[i.index(j)] - len(str(j)))
        print(f"{vC} {j}{espacios}",end=(" "))
      print(vC)
      for i in anchos:
        espacios = hC * i
        print(f"{pC} {espacios}",end=(" "))
      print(pC)
    else: 
      for j in i:
        espacios = " " * (anchos[i.index(j)] - len(str(j)))
        print(f"{vC} {j}{espacios}",end=(" "))
      print(vC)

  if stiles != 2 and len(data) > 1:
    for i in anchos:
      espacios = hC * i
      print(f"{pC} {espacios}",end=(" "))
    print(pC)
  print("\033[0m", end="")

def square(t, c, bg):
  for fil in range(t):
      if fil == 0 or fil == t - 1:
          for col in range(t - 1):
              print(f"{c} ", end=(""))
          print(f"{c}")
      else:
          for col in range(t):
              if col == 0:
                  print(f"{c} ", end=(""))
              else:
                if col == t - 1:
                  print(f"{c} ")
                else:
                  print(f"{bg} ", end=(""))

def triangle(t, c):
  cont = t - 2
  cont2 = 1
  print(" " * (cont - 1), c)
  while cont!=0 and  cont2 != t:
    cont = cont - 1
    cont2 = cont2 + 2
    for space in range(cont):
      print(" ", end=(""))
    for space in range(cont2):
      print(c, end=(""))
    print("")

def printc(text="", style="0", color="0", fondo="0", end="\n"):  
  if text != "":
    print(f"\033[{fondo};{color};{style}m{text}\033[0m", end=(end))
  else:
    print("https://python-para-impacientes.blogspot.com/2016/09/dar-color-las-salidas-en-la-consola.html")

def printColor(text, colorT, end = "\n"):
  color = "0"
  if color != "":
    color = { "r": "31",
              "g": "32",
              "y": "33",
              "b": "34",
              "p": "35",
              "c": "36",
              "w": "37",
              "o": "30"}[colorT]

  if text != "":
    print(f"\033[{color}m{text}\033[0m", end=(end))
  else:
    print("https://python-para-impacientes.blogspot.com/2016/09/dar-color-las-salidas-en-la-consola.html")
  
def auxBuses(nombre, i, data):  
  pos = data[i][1]
  pos += random.randint(1,4)
  espacios = 13 - len(nombre)
  espacioInicial = " " * pos
  print(espacioInicial, " _______________\n", 
        espacioInicial, "l__l__l__l__l__l__\n",
        espacioInicial, "l", nombre, " " * espacios ," l\n",
        espacioInicial, "l----0----------0-l\n " )
  data[i][1] = pos
  return True if pos < 100 else False

def bus():
  data = []
  numBuses = int(input("¿Cuántos buses deceas que compitan?: "))
  
  for i in range(numBuses):  
    nombre = input(f"Ingrese el nombre del bus N°{i + 1}: ").upper()
    if (len(nombre) > 13): 
      nombre = nombre[0:13]
    data.append([nombre, 0])
  
  print("\b" * 1000)
  print(data)
  
  bandera = True
  while bandera:
    print("\b"*5000)
    print("CARRERA DE BUSES!!")    
    print("----------------------------------------------------------------------------------------------------------------------------------------")
    for i in range(len(data)):         
      bandera = auxBuses(data[i][0], i, data)
      if (i != len(data) - 1):      
        print(" ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---  \n ")
    print("----------------------------------------------------------------------------------------------------------------------------------------")
    print(data)
    time.sleep(.2)
  
  ganador = ""
  for i in range(len(data)):
    if data[i][1] >= 100:
      ganador = data[i][0]
      break
  
  print("El ganador es: ", ganador)

def C_(n, i):
  if i > n:
    return 0
  else:
    return int(math.factorial(n)  / (math.factorial(i) * math.factorial(n - i)))

def P_(n, i):
  if i > n:
    return 0
  else:
    return int(math.factorial(n)  / (math.factorial(n - i)))

def binNewton(n):
  r = ""
  for i in range(n + 1):
    a = f"a^{n-i}" if n-i > 0 else ""
    a = f"a" if n-i == 1 else a
    b = f"b^{i}" if i > 0 else ""
    b = f"b" if i == 1 else b
    indice = "" if C_(n, i) <= 1 else C_(n, i)

    r += f"{indice}{a}{b} + " if i < n else f"{indice}{a}{b}"
  return f"(a+b)^{n} = " + r

def matrizInversa(matriz, format = True):
    n = len(matriz)
    res = []
    try:
      for i in range(n):
        fila = []
        for j in range(n):
          if i == j:
            fila.append(1)
          else:
            fila.append(0)
        res.append(fila)
      for i in range(n):
          if matriz[i][i] == 0:
              for j in range(i + 1, n):
                  if matriz[j][i] != 0:
                      matriz[i], matriz[j] = matriz[j], matriz[i]
                      res[i], res[j] = res[j], res[i]
                      break
  
          pivot = matriz[i][i]
          for j in range(n):
              matriz[i][j] = Fraction(matriz[i][j], pivot)
              res[i][j] = Fraction(res[i][j], pivot)
  
          for j in range(n):
              if j != i:
                  factor = matriz[j][i]
                  for k in range(n):
                      matriz[j][k] -= factor * matriz[i][k]
                      res[j][k] -= factor * res[i][k]
      if format:      
        res2 = []
        for i in res:
          auxF = []
          for j in i:
            auxF.append(f"{j.numerator}/{j.denominator}")
          res2.append(auxF)
        return res2
      else:
        return res
    except Exception as error:
      print(f"\033[31mError:\033[0m {error}")
      return -1      

def euclidesMCD(a, b):
  A = a if a > b else b
  B = b if a > b else a  
  while B != 0:        
    _B = B
    B = A % B
    A = _B
    if B == 0:
      break
  return A 

def strSRC(function):
  """
  Extract the code body of function f and replace math functions (e.g., np.*, etc...) with SymPy equivalents to prevent parsing errors.
  """
  res = function
  if callable(function):
    res = inspect.getsource(function).split("return")[1]
  for i in ["np.", "sp.", "math.", "\t", "\n", "\b", " "]: # Defina aquí las librerías o apodos dentro de la función que está usando para llamar a funciones matemáticas, o decoradores que estorben
    res = res.replace(i, "")
  return res

def printTex(tex):
  """
  Display in LaTeX.
  """  
  iPy.display(iPy.Math(tex))

def printF(function):
  """
  Display the function in LaTeX format.
  """
  tex = sp.latex(sp.sympify(strSRC(function)))
  iPy.display(iPy.Math(tex))

def D_(function, diff_var,  n=1):
   """
   Compute the n-th derivative of a function f with respect to t.
   """
   x = sp.symbols(diff_var)
   symExpr = sp.sympify(strSRC(function))
   return sp.lambdify(x, sp.diff(symExpr, x, n))

def I_(function, int_var):
  """
  Compute the indefinite integral of a function f with respect to t.
  """
  x = sp.symbols(int_var)   
  symExpr = sp.sympify(strSRC(function))
  return sp.lambdify(x, sp.integrate(symExpr, x))

def ODE_(equation, equalsTo, initialConditions, var="x", fun="y"):
  x = sp.symbols(var)
  y = sp.Function(fun)(x)
  ode = sp.Eq(equation(y, x), equalsTo(x))
  sol = sp.dsolve(ode, ics=initialConditions(x, y))
  return sp.lambdify(x, sol.rhs, "numpy")

def prtM(m_):
  m = [[round(j) for j in i] for i in m_]
  for i in range(len(m)):
    left = "⌜" if i == 0 else "⌞" if i == len(m)-1 else " "
    right = "⌝" if i == 0 else "⌟" if i == len(m)-1 else " "
    adjS = max(len(str(maxM(m))), len(str(minM(m))))
    midle = str([str(j)+" "*(adjS - len(str(j))) for j in m[i]]).replace(",", "").replace("[", "").replace("]", "").replace("'", "")
    print(f"{left}{midle}{right}")

maxM = lambda m : max([max(i) for i in m])
minM = lambda m : min([min(i) for i in m])
dfrM = lambda m, f, r: [i[:r]+i[r+1:] for i in (m[:f]+m[f+1:])]
detM = lambda m : m[0][0] * m[1][1] - m[0][1] * m[1][0] if (len(m) == 2) else sum([(-1)**(i) * m[0][i] * detM(dfrM(m, 0, i)) for i in range(len(m))])
prdM = lambda m1, m2: [[sum([m1[i][k] * m2[k][j] for k in range(len(m1[0]))]) for j in range(len(m1))] for i in range(len(m2[0]))]
sumM = lambda m1, m2: [[m1[i][j] + m2[i][j] for j in range(len(m1[0]))] for i in range(len(m1))]
subM = lambda m1, m2: [[m1[i][j] - m2[i][j] for j in range(len(m1[0]))] for i in range(len(m1))]
escM = lambda e, m1: [[e * m1[i][j]for j in range(len(m1[0]))] for i in range(len(m1))]
cofM = lambda m : [[detM(dfrM(m, i, j)) for j in range(len(m[0]))] for i in range(len(m))]
adjM = lambda m: (lambda cof: [[cof[i][j]*((-1)**(i+j+2)) for j in range(len(m[0]))] for i in range(len(m))])(cofM(m))
traM = lambda m : [[m[j][i] for j in range(len(m[0]))] for i in range(len(m))]
invM = lambda m : escM((1/detM(m)), traM(adjM(m)))

# |

# |

# |

# |          I

# |          N

# |          F

# |          O

# |

# |

# |

def imprimirInformacion(listado):
  ancho = 0
  for i in listado:    
    ancho = len(i) if len(i) > ancho else ancho         
  for i in listado:        
    if listado.index(i) == 0:    
      print(f' \033[31minfo |\033[0m {i.ljust(ancho, " ")}\033[31m|\033[0m')
    else:
      print(f'      \033[31m|\033[0m {i.ljust(ancho, " ")}\033[31m|\033[0m')
  print()

def cleanInfo():
  imprimirInformacion([
    "clean(t)",
    "t = Número de caracteres que se eliminaran (defalut = 10000)",
    "Limpia la pantalla por completo"
  ])

def tableInfo():
  imprimirInformacion([
    " table(data, stiles)",
    " data= [[t1, t2, ...,tn], [e11, e12, ..., e1n], [e21, e22, ..., 2n], [en2, en2, ..., enn]]",
    " t = titulo ",
    " e = elemento ",
    "",
    " Ejemplo: ",
    ' table([',
    '   ["Nombre", "Número", "Fecha"],',
    '   ["Ana López", "123456789", "14/02/2024"], ',
    '   ["Pedro García", "987654321", "01/01/2023"],',
    '   ["María Pérez", "234567890", "03/03/2022"], ',
    '   ["Juan Martín", "456789012", "05/05/2021"], ',
    ' ]) ',
    "",
    ' stiles = Estilo de la tabla valores entre (0,1,2)',
    ' border = "phv" p: Caracter de esquinas   h: Caracter de laterales   v: Caracter de techo y piso.',
    ' colors = codigos de estilo separados por ; por ejemplo "36;3", codigos que puedes encontrar en',
    " https://python-para-impacientes.blogspot.com/2016/09/dar-color-las-salidas-en-la-consola.html"
  ])

def squareInfo():
  imprimirInformacion([
    "square(t,c,bg)",
    "t = Tamaño",
    "c = Caracter del borde",
    "bg = Caracter de relleno",
    "Genera un cuadrado por consola"
  ])

def triangleInfo():
  imprimirInformacion([
    "triangle(t,c)",
    "t = Tamaño",
    "c = Caracter del borde",
    "Genera un triangulo por consola"
  ])
  
def printcInfo():
  imprimirInformacion([
    "printc(text, color, style)",
    "text = ′Cualquierstring′",
    "style = Estilo del texto",
    "color = Color",    
    "fondo = Fondo",
    "",
    "Ejemplo:",
    'printc("Texto de prueba", "1", "31", "33")',
    "",
    'Los codigos de estilo separados por ; por ejemplo "36;3" son codigos que puedes encontrar en',
    "https://python-para-impacientes.blogspot.com/2016/09/dar-color-las-salidas-en-la-consola.html",
  ])
  

def printColorInfo():
  imprimirInformacion([
    "printc(text, colorT, end)",
    "text = ′Cualquier string′",
    "color = inicial del color en ingles (r,g,y,b,p,c,w,o)",
    "end = Caracter al final del texto(\\n)",
    "",
    "Ejemplo:",
    'printc("Texto de prueba", "o", "\\n")',
    "",
    'Los codigos de estilo separados por ; por ejemplo "36;3" son codigos que puedes encontrar en',
    "https://python-para-impacientes.blogspot.com/2016/09/dar-color-las-salidas-en-la-consola.html",
  ])

def busInfo():
  imprimirInformacion([
    "bus()",
    "no tiene parametros"
    "Esta funcion fue desarrollada por Santiago",
    "Marin y crea una carrera de buses."
  ])

def P_Info():
  imprimirInformacion([
    "P_(n, k)",
    "n = numero de elementos",
    "k = tamaño de los grupos",
    "Genera el numero de permutaciones de n, de k en k con la formula (n!/(n-k)!)."
  ])

def C_Info():
  imprimirInformacion([
    "C_(n, k)",
    "n = numero de elementos",
    "k = tamaño de los grupos",
    "Genera el numero de combinaciones de n, de k en k con la formula (n!/(n-k)!k!)."
  ])

def binNewtonInfo():
  imprimirInformacion([
    "binNewton(n)",
    "n = exponente",
    "Esta función genera el polinomio resultado de evaluar (a+b)^n, usando",
    "el binomio de Newuton."
  ])

def matrizInversaInfo():
  imprimirInformacion([
    "matrizInversa(matriz, formato)",
    "matriz = matriz a invertir ([[a_11, a_12, ...,a_1n], [a_21, a_22, ..., a_2n], ..., [en1, en2, ..., a_nn]]) ",
    'formato = Formato "numerador/denominador" cuando esta en True, de lo contrario "Fraction(numerador, denominador)"',
    'formato = esta por defecto en True"',
    " Ejemplo: ",
    ' matrizInversa([',
    '   [1, 3, 5],',
    '   [8, 9, 11], ',
    '   [6, 2, 7],',    
    ' ], True) ',
  ])

def matrixInversaInfo():
  imprimirInformacion([
    'def prtM(m_):0',
    '  m = [[round(j) for j in i] for i in m_]0',
    '  for i in range(len(m)):0',
    '    left = "⌜" if i == 0 else "⌞" if i == len(m)-1 else " "0',
    '    right = "⌝" if i == 0 else "⌟" if i == len(m)-1 else " "0',
    '    adjS = max(len(str(maxM(m))), len(str(minM(m))))0',
    '    midle = str([str(j)+" "*(adjS - len(str(j))) for j in m[i]]).replace(",", "").replace("[", "").replace("]", "").replace("", "")0',
    '    print(f"left}midle}right}")    0',
    'maxM = lambda m : max([max(i) for i in m])0',
    'minM = lambda m : min([min(i) for i in m])0',
    'dfrM = lambda m, f, r: [i[:r]+i[r+1:] for i in (m[:f]+m[f+1:])]0',
    'detM = lambda m : m[0][0] * m[1][1] - m[0][1] * m[1][0] if (len(m) == 2) else sum([(-1)**(i) * m[0][i] * detM(dfrM(m, 0, i)) for i in range(len(m))])0',
    'prdM = lambda m1, m2: [[sum([m1[i][k] * m2[k][j] for k in range(len(m1[0]))]) for j in range(len(m1))] for i in range(len(m2[0]))]0',
    'sumM = lambda m1, m2: [[m1[i][j] + m2[i][j] for j in range(len(m1[0]))] for i in range(len(m1))]0',
    'subM = lambda m1, m2: [[m1[i][j] - m2[i][j] for j in range(len(m1[0]))] for i in range(len(m1))]0',
    'escM = lambda e, m1: [[e * m1[i][j]for j in range(len(m1[0]))] for i in range(len(m1))]0',
    'cofM = lambda m : [[detM(dfrM(m, i, j)) for j in range(len(m[0]))] for i in range(len(m))]0',
    'adjM = lambda m: (lambda cof: [[cof[i][j]*((-1)**(i+j+2)) for j in range(len(m[0]))] for i in range(len(m))])(cofM(m))0',
    'traM = lambda m : [[m[j][i] for j in range(len(m[0]))] for i in range(len(m))]0',
    'invM = lambda m : escM((1/detM(m)), traM(adjM(m)))0'
  ])

def euclidesMCDInfo():
  imprimirInformacion([
    "euclidesMCD(a, b)",
    "a, b = cualquier número entero",
    "Esta función retorna el Máximo Común Divisor entre a y b."
  ])

def strSRCInfo():
  imprimirInformacion([
    "strSRC(function)",
    "function = funcion a pasar a latex",
    "Extract the code body of function f and replace math functions (e.g., np.*, etc...) with SymPy equivalents to prevent parsing errors."
  ])

def printTexInfo():
  imprimirInformacion([
    "printTex(tex)",
    "tex = string en formato LaTeX",
    "Display in LaTeX."
  ])

def printFInfo():
  imprimirInformacion([
    "printF(function)",
    "function = funcion a imprimir",
    "Display the function in LaTeX format."
  ])

def D_Info():
  imprimirInformacion([
    "D_(function, diff_var,  n = 1)",
    "function = funcion a derivar",
    "diff_var = variable de la derivada",
    "n = n-esima derivada (default = 1)",
    "Compute the n-th derivative of a function f with respect to diff_var."
  ])

def I_Info():
  imprimirInformacion([
    "I_(function, int_var)",
    "function = funcion a derivar",
    "diint_varff_var = variable de integracion",    
    "Compute the indefinite integral of a function f with respect to diint_varff_var."
  ])

def ODE_Info():
  imprimirInformacion([
    "IODE_(equation, equalsTo, initialConditions, var='x', fun='y')",
    "equation = Ecuacion diferencial",
    "equalsTo = lado derecho de la ecuacion diferencial",    
    "initialConditions = Condiciones iniciales",    
    "var = variable independiente (default = 'x')",    
    "fun = variable dependiente (default = 'y')",    
    "Esta función resuelve ecuaciones diferenciales de primer orden con condiciones iniciales."
  ])

def info():
  imprimirInformacion([
    "Para importar copia en tu codigo lo siguiente: ",
    "!wget juanma.co/juanma.py",
    "import juanma",
    "juanma.clean()",
    "",
    "Funciones: ",
    "strSRC()",
    "printTex()",
    "printF()",    
    "D_()",
    "I_()",
    "ODE_()",
    "P_()",
    "C_()",    
    "binNewton(n)",       
    "euclidesMCD()",    
    "matrizInversaInfo()",
    "table()",        
    "printc()",    
    "printColor()",    
    "square()",    
    "triangle()",    
    "bus()",
    "clean()",
    "info()",
    "help()",
    "allInfo()",
    "",
    "Todas las funciones tienen el añadido Info() es decir, que si escribes la",
    "función más Info() te mostrará una descripción de la misma (Ejemplo: P_Info()), exepto info(), help() y allInfo().",
  ])

def help():
  info()

def allInfo():
  tableInfo()
  strSRCInfo()
  printTexInfo()
  printFInfo()
  D_Info()
  I_Info()
  ODE_Info()
  P_Info()
  C_Info()
  binNewtonInfo()
  matrizInversaInfo()
  matrixInversaInfo() # ---
  euclidesMCDInfo()  
  squareInfo()
  triangleInfo()
  printcInfo()
  printColorInfo()
  busInfo()  

dataPalabras = ['ABAJO', 'ABANDONAR', 'ABARCA', 'ABEJA', 'ABEJAS', 'ABIERTO', 'ABRE', 'ABREVIATURAS', 'ABRIL', 'ABRIO', 'ABRIR', 'ABUELA', 'ABUELITA', 'ABUELO', 'ABUELOS', 'ABUNDANCIA', 'ABUNDANTE', 'ABUNDANTES', 'ACABA', 'ACABAR', 'ACABAS', 'ACADEMIA', 'ACAPULCO', 'ACCESO', 'ACCIDENTES', 'ACCION', 'ACCIONES', 'ACCRA', 'ACEITE', 'ACENTO', 'ACEPTAR', 'ACEPTO', 'ACERCA', 'ACERCO', 'ACERO', 'ACONTECIMIENTO', 'ACONTECIMIENTOS', 'ACOTACIONES', 'ACTA', 'ACTITUD', 'ACTIVIDAD', 'ACTIVIDADES', 'ACTO', 'ACTORES', 'ACTOS', 'ACTUAL', 'ACTUALES', 'ACTUALIDAD', 'ACTUALMENTE', 'ACTUAR', 'ACUERDO', 'ACUERDOS', 'ADAPTACION', 'ADECUADA', 'ADECUADO', 'ADECUADOS', 'ADELANTE', 'ADELANTOS', 'ADEMAS', 'ADENTRO', 'ADHESIVA', 'ADICCION', 'ADICCIONES', 'ADIVINA', 'ADIVINANZA', 'ADIVINANZAS', 'ADIVINAR', 'ADJETIVOS', 'ADMINISTRACION', 'ADMIRACION', 'ADOLESCENCIA', 'ADOLESCENTES', 'ADORNOS', 'ADULTA', 'ADULTO', 'ADULTOS', 'AFECTA', 'AFECTAN', 'AFRICA', 'AFRICANA', 'AFRICANO', 'AFRICANOS', 'AFUERA', 'AGOSTO', 'AGRADABLE', 'AGREGA', 'AGREGAR', 'AGRICOLA', 'AGRICOLAS', 'AGRICULTORES', 'AGRICULTURA', 'AGUA', 'AGUACATE', 'AGUAS', 'AGUASCALIENTES', 'AGUILA', 'AGUJA', 'AGUJERO', 'AGUSTIN', 'AHI', 'AHORA', 'AIRE', 'AIRES', 'ALAMBRE', 'ALAS', 'ALASKA', 'ALBAN', 'ALBUM', 'ALCANCE', 'ALCANZA', 'ALCANZADO', 'ALCANZAN', 'ALCANZAR', 'ALCANZO', 'ALCOHOL', 'ALCOHOLICAS', 'ALDEA', 'ALDEAS', 'ALEGRE', 'ALEGRES', 'ALEGRIA', 'ALEJANDRO', 'ALEMAN', 'ALEMANIA', 'ALFABETO', 'ALFONSO', 'ALGAS', 'ALGO', 'ALGODON', 'ALGUIEN', 'ALGUN', 'ALGUNA', 'ALGUNAS', 'ALGUNO', 'ALGUNOS', 'ALIADOS', 'ALIMENTA', 'ALIMENTACION', 'ALIMENTAN', 'ALIMENTAR', 'ALIMENTARSE', 'ALIMENTO', 'ALIMENTOS', 'ALLA', 'ALLENDE', 'ALLI', 'ALMA', 'ALREDEDOR', 'ALREDEDORES', 'ALTA', 'ALTAS', 'ALTITUD', 'ALTO', 'ALTOS', 'ALTURA', 'ALTURAS', 'ALUMINIO', 'ALUMNO', 'ALUMNOS', 'ALVAREZ', 'ALVARO', 'AMANECER', 'AMARICA', 'AMARILLA', 'AMARILLAS', 'AMARILLO', 'AMAZONAS', 'AMBAS', 'AMBIENTAL', 'AMBIENTALES', 'AMBIENTE', 'AMBOS', 'AMECA', 'AMERICANO', 'AMERICANOS', 'AMIGA', 'AMIGAS', 'AMIGO', 'AMIGOS', 'AMISTAD', 'AMO', 'AMOR', 'AMPLIA', 'AMPLIAR', 'ANA', 'ANALIZA', 'ANALIZAR', 'ANCHA', 'ANCHO', 'ANCIANOS', 'ANDA', 'ANDABA', 'ANDAR', 'ANDES', 'ANDINA', 'ANDRAS', 'ANFIBIOS', 'ANGEL', 'ANGELES', 'ANGULO', 'ANGULOS', 'ANIMAL', 'ANIMALES', 'ANIMO', 'ANITA', 'ANNA', 'ANONIMA', 'ANOTA', 'ANOTALO', 'ANOTALOS', 'ANOTAR', 'ANOTARON', 'ANOTASTE', 'ANOTEN', 'ANTARTIDA', 'ANTE', 'ANTEPASADOS', 'ANTERIOR', 'ANTERIORES', 'ANTES', 'ANTIGUA', 'ANTIGUAS', 'ANTIGUO', 'ANTIGUOS', 'ANTIGÜEDAD', 'ANTILLAS', 'ANTOLOGIA', 'ANTONIO', 'ANUNCIO', 'ANUNCIOS', 'APARATO', 'APARATOS', 'APARECE', 'APARECEN', 'APARECIERON', 'APARECIO', 'APARIENCIA', 'APARTE', 'APENAS', 'APICULTURA', 'APLICA', 'APLICAR', 'APOCA', 'APOCAS', 'APOYAR', 'APOYO', 'APRECIAR', 'APRENDAMOS', 'APRENDE', 'APRENDER', 'APRENDIDO', 'APRENDIERON', 'APRENDIO', 'APRENDISTE', 'APROVECHA', 'APROVECHAMIENTO', 'APROVECHAN', 'APROVECHAR', 'APROXIMADAMENTE', 'APUESTA', 'AQUEL', 'AQUELLA', 'AQUELLAS', 'AQUELLO', 'AQUELLOS', 'AQUI', 'ARABE', 'ARABES', 'ARAÑA', 'ARAÑAS', 'ARBOL', 'ARBOLES', 'ARBUSTOS', 'ARCILLA', 'ARCO', 'ARDILLA', 'AREA', 'AREAS', 'ARENA', 'ARGENTINA', 'ARGUMENTOS', 'ARMA', 'ARMADILLO', 'ARMAR', 'ARMAS', 'ARQUEOLOGICAS', 'ARQUEOLOGOS', 'ARQUITECTURA', 'ARRIBA', 'ARRIERO', 'ARROYO', 'ARROZ', 'ARTE', 'ARTES', 'ARTESANIA', 'ARTESANIAS', 'ARTESANOS', 'ARTICO', 'ARTICULO', 'ARTICULOS', 'ARTIFICIAL', 'ARTIFICIALES', 'ARTISTA', 'ARTISTAS', 'ASAMBLEA', 'ASESINADO', 'ASI', 'ASIA', 'ASIATICO', 'ASIMISMO', 'ASPECTO', 'ASPECTOS', 'ASTA', 'ASTAS', 'ASTE', 'ASTOS', 'ASTROS', 'ASUNTO', 'ASUNTOS', 'ATACARON', 'ATAQUE', 'ATENAS', 'ATENCION', 'ATENDER', 'ATENTAMENTE', 'ATLANTICO', 'ATLAS', 'ATMOSFERA', 'ATRAS', 'ATUN', 'AUMENTA', 'AUMENTADO', 'AUMENTAR', 'AUMENTO', 'AUMENTO', 'AUN', 'AUN', 'AUNQUE', 'AUSTRALIA', 'AUTOBUS', 'AUTOBUSES', 'AUTOMOVIL', 'AUTOMOVILES', 'AUTOR', 'AUTORES', 'AUTORIDAD', 'AUTORIDADES', 'AUXILIO', 'AVANCE', 'AVANCES', 'AVANZA', 'AVANZADA', 'AVANZADAS', 'AVANZAR', 'AVANZO', 'AVE', 'AVENIDA', 'AVENTURA', 'AVENTURAS', 'AVERIGUA', 'AVERIGUAR', 'AVES', 'AVION', 'AVIONES', 'AXITO', 'AYER', 'AYUDA', 'AYUDALE', 'AYUDAN', 'AYUDAR', 'AYUDARA', 'AYUDARAN', 'AYUDARTE', 'AYUDE', 'AYUNTAMIENTO', 'AZAR', 'AZTECA', 'AZTECAS', 'AZUCAR', 'AZUCARES', 'AZUL', 'AZULES', 'AÑO', 'AÑOS', 'BACTERIAS', 'BAHIA', 'BAJA', 'BAJAR', 'BAJAS', 'BAJO', 'BAJOS', 'BALANZA', 'BALLENA', 'BALLENAS', 'BANCO', 'BANCOS', 'BANDA', 'BANDERA', 'BANDERAS', 'BARATO', 'BARBANEGRA', 'BARCO', 'BARCOS', 'BARRA', 'BARRANCA', 'BARRAS', 'BARRIO', 'BARRO', 'BASE', 'BASES', 'BASICOS', 'BASTA', 'BASTANTE', 'BASURA', 'BATALLA', 'BATALLAS', 'BAUKAS', 'BAÑO', 'BEBA', 'BEBER', 'BEBIDA', 'BEBIDAS', 'BELIZE', 'BELLA', 'BELLAS', 'BELLEZA', 'BENEFICIO', 'BENEFICIOS', 'BENITO', 'BERING', 'BETO', 'BIBLIOTECA', 'BIBLIOTECAS', 'BICARBONATO', 'BICICLETA', 'BIEN', 'BIENES', 'BIENESTAR', 'BILLETES', 'BISABUELO', 'BLANCA', 'BLANCAS', 'BLANCO', 'BLANCOS', 'BLOQUE', 'BOCA', 'BOLA', 'BOLAÑOS', 'BOLETO', 'BOLETOS', 'BOLIVIA', 'BOLSA', 'BOLSAS', 'BOMBERO', 'BOMBEROS', 'BONITA', 'BONITO', 'BORRADOR', 'BORREGO', 'BOSQUE', 'BOSQUES', 'BOTAS', 'BOTE', 'BOTELLA', 'BOTES', 'BOVINO', 'BRASIL', 'BRAVO', 'BRAZO', 'BRAZOS', 'BREVE', 'BRILLANTE', 'BRILLANTES', 'BRONCE', 'BRUJA', 'BRUJULA', 'BUEN', 'BUENA', 'BUENAS', 'BUENO', 'BUENOS', 'BURRO', 'BUSCA', 'BUSCAN', 'BUSCANDO', 'BUSCAR', 'BUSCO', 'BUSQUEDA', 'BUSQUEN', 'CABALLO', 'CABALLOS', 'CABE', 'CABELLO', 'CABEN', 'CABEZA', 'CABLE', 'CABLES', 'CABO', 'CABRA', 'CACAHUATE', 'CACAO', 'CACTUS', 'CADA', 'CADENA', 'CADENAS', 'CADIZ', 'CAE', 'CAEN', 'CAER', 'CAFA', 'CAIDA', 'CAIDO', 'CAJA', 'CAJAS', 'CAJITA', 'CAL', 'CALABAZA', 'CALCA', 'CALCULA', 'CALCULADORA', 'CALCULAR', 'CALCULO', 'CALCULOS', 'CALENDARIO', 'CALENDARIOS', 'CALENTAR', 'CALIDAD', 'CALIDO', 'CALIENTE', 'CALIENTES', 'CALIFICACIONES', 'CALIFORNIA', 'CALLA', 'CALLE', 'CALLES', 'CALMA', 'CALOR', 'CALORIAS', 'CALULA', 'CALULAS', 'CAMA', 'CAMARA', 'CAMARAS', 'CAMBIA', 'CAMBIADO', 'CAMBIAN', 'CAMBIANDO', 'CAMBIAR', 'CAMBIARON', 'CAMBIO', 'CAMBIO', 'CAMBIOS', 'CAMINA', 'CAMINAN', 'CAMINANDO', 'CAMINAR', 'CAMINITO', 'CAMINO', 'CAMINO', 'CAMINOS', 'CAMION', 'CAMIONES', 'CAMPANA', 'CAMPAÑA', 'CAMPAÑAS', 'CAMPECHE', 'CAMPESINO', 'CAMPESINOS', 'CAMPO', 'CAMPOS', 'CANADA', 'CANAL', 'CANALES', 'CANCER', 'CANCION', 'CANCIONES', 'CANDIDATO', 'CANELA', 'CANGURO', 'CANICA', 'CANICAS', 'CANOAS', 'CANTA', 'CANTAN', 'CANTANDO', 'CANTAR', 'CANTERVILLE', 'CANTIDAD', 'CANTIDADES', 'CANTO', 'CAPA', 'CAPACES', 'CAPACIDAD', 'CAPAS', 'CAPAZ', 'CAPITAL', 'CAPITALES', 'CAPITAN', 'CARA', 'CARACOL', 'CARACTER', 'CARACTERISTICA', 'CARACTERISTICAS', 'CARACTERIZA', 'CARAS', 'CARBON', 'CARBONO', 'CARCEL', 'CARDENAS', 'CARDINALES', 'CARGA', 'CARGO', 'CARIBE', 'CARLOS', 'CARMEN', 'CARNE', 'CARNICERO', 'CARPINTERO', 'CARRANZA', 'CARRERA', 'CARRERAS', 'CARRETERA', 'CARRETERAS', 'CARRO', 'CARTA', 'CARTAS', 'CARTEL', 'CARTELES', 'CARTON', 'CARTONCILLO', 'CARTONCITOS', 'CARTULINA', 'CASA', 'CASAS', 'CASCARA', 'CASI', 'CASILLA', 'CASILLAS', 'CASITA', 'CASO', 'CASOS', 'CASTAS', 'CASTILLO', 'CATEDRAL', 'CATOLICA', 'CATOLICOS', 'CATORCE', 'CAUSA', 'CAUSAR', 'CAUSAS', 'CAYERON', 'CAYO', 'CAZA', 'CAZADORES', 'CAZAR', 'CAÑA', 'CAÑON', 'CEBOLLA', 'CELAYA', 'CELULAR', 'CENSO', 'CENTASIMOS', 'CENTAVOS', 'CENTENAS', 'CENTIMETRO', 'CENTIMETROS', 'CENTRAL', 'CENTRALES', 'CENTRO', 'CENTROAMARICA', 'CENTROS', 'CERA', 'CERAMICA', 'CERCA', 'CERCANA', 'CERCANAS', 'CERCANO', 'CERCANOS', 'CERDO', 'CEREALES', 'CEREBRO', 'CEREMONIAL', 'CEREMONIALES', 'CEREMONIAS', 'CERO', 'CERRO', 'CHAPALA', 'CHAPULIN', 'CHAPULTEPEC', 'CHIAPAS', 'CHICA', 'CHICAS', 'CHICHAN', 'CHICLES', 'CHICLOSOS', 'CHICO', 'CHICOS', 'CHIHUAHUA', 'CHILE', 'CHINA', 'CHINO', 'CHINOS', 'CHISTES', 'CHISTOSO', 'CHOCOLATE', 'CHOCOLATES', 'CICLO', 'CICLOS', 'CID', 'CIEGO', 'CIELITO', 'CIELO', 'CIEN', 'CIENCIA', 'CIENCIAS', 'CIENTIFICA', 'CIENTIFICAS', 'CIENTIFICO', 'CIENTIFICOS', 'CIENTO', 'CIENTOS', 'CIERTA', 'CIERTAS', 'CIERTO', 'CIERTOS', 'CIFRA', 'CIFRAS', 'CIGOTO', 'CINCO', 'CINCUENTA', 'CINE', 'CINTA', 'CINTILLO', 'CIRCO', 'CIRCULAR', 'CIRCULO', 'CIRCULOS', 'CIRCUNFERENCIA', 'CIUDAD', 'CIUDADANOS', 'CIUDADES', 'CIVIL', 'CIVILIZACION', 'CIVILIZACIONES', 'CLARA', 'CLARAMENTE', 'CLARAS', 'CLARIDAD', 'CLARO', 'CLASE', 'CLASES', 'CLASICO', 'CLAVE', 'CLAVO', 'CLAVOS', 'CLIC', 'CLIMA', 'CLIMAS', 'COAHUILA', 'COBRE', 'COCHE', 'COCHES', 'COCHINITO', 'COCHINITOS', 'COCIENTE', 'COCINA', 'COCINAR', 'COCO', 'COCODRILO', 'COCODRILOS', 'CODICE', 'CODICES', 'COHETE', 'COLA', 'COLABORACION', 'COLECCION', 'COLEGIO', 'COLIMA', 'COLLAR', 'COLLARES', 'COLOCA', 'COLOCADO', 'COLOCAN', 'COLOCAR', 'COLOMBIA', 'COLON', 'COLONIA', 'COLONIAL', 'COLONIALES', 'COLONIAS', 'COLONIZACION', 'COLOR', 'COLORADO', 'COLOREA', 'COLORES', 'COLUMNA', 'COLUMNAS', 'COMANTALAS', 'COMANTALO', 'COMBATE', 'COMBATIR', 'COMBINACION', 'COMBINACIONES', 'COMBUSTIBLE', 'COMBUSTIBLES', 'COMBUSTION', 'COME', 'COMEDOR', 'COMEN', 'COMENTA', 'COMENTAR', 'COMENTARIOS', 'COMENTEN', 'COMENTO', 'COMENZAR', 'COMENZARON', 'COMENZO', 'COMER', 'COMERCIAL', 'COMERCIALES', 'COMERCIANTE', 'COMERCIANTES', 'COMERCIO', 'COMETA', 'COMIDA', 'COMIENDO', 'COMIENZA', 'COMIENZAN', 'COMIO', 'COMO', 'COMO', 'COMPARA', 'COMPARACION', 'COMPARAR', 'COMPAREN', 'COMPARTE', 'COMPARTEN', 'COMPARTIR', 'COMPAS', 'COMPAÑERA', 'COMPAÑERAS', 'COMPAÑERO', 'COMPAÑEROS', 'COMPAÑIA', 'COMPAÑIAS', 'COMPETENCIAS', 'COMPLEJOS', 'COMPLETA', 'COMPLETAMENTE', 'COMPLETAR', 'COMPLETAS', 'COMPLETO', 'COMPLETOS', 'COMPLICADOS', 'COMPONE', 'COMPONEN', 'COMPONENTES', 'COMPORTAMIENTO', 'COMPOSICION', 'COMPRA', 'COMPRAR', 'COMPRARON', 'COMPRENDE', 'COMPRENDER', 'COMPRO', 'COMPROBAR', 'COMPRUEBA', 'COMPUESTAS', 'COMPUTADORA', 'COMPUTADORAS', 'COMUN', 'COMUNES', 'COMUNICACION', 'COMUNICACIONES', 'COMUNICAN', 'COMUNICAR', 'COMUNICARSE', 'COMUNIDAD', 'COMUNIDADES', 'CON', 'CONCENTRACION', 'CONCEPTOS', 'CONCLUSION', 'CONCLUSIONES', 'CONCURSO', 'CONDICION', 'CONDICIONES', 'CONEJO', 'CONEJOS', 'CONFERENCIA', 'CONFIANZA', 'CONFLICTO', 'CONFLICTOS', 'CONFORME', 'CONGRESO', 'CONIFERAS', 'CONJUNTO', 'CONMIGO', 'CONOCE', 'CONOCEMOS', 'CONOCEN', 'CONOCER', 'CONOCES', 'CONOCIAN', 'CONOCIDA', 'CONOCIDO', 'CONOCIDOS', 'CONOCIERON', 'CONOCIMIENTO', 'CONOCIMIENTOS', 'CONOCIO', 'CONOZCAN', 'CONOZCAS', 'CONQUISTA', 'CONQUISTADORES', 'CONSECUENCIA', 'CONSECUENCIAS', 'CONSEGUIR', 'CONSEJOS', 'CONSERVA', 'CONSERVACION', 'CONSERVADORES', 'CONSERVAN', 'CONSERVAR', 'CONSIDERA', 'CONSIDERAN', 'CONSIDERAS', 'CONSIGAN', 'CONSIGUE', 'CONSIGUIO', 'CONSISTE', 'CONSTANTE', 'CONSTANTEMENTE', 'CONSTITUCION', 'CONSTITUCIONALISTA', 'CONSTITUYE', 'CONSTITUYEN', 'CONSTRUCCION', 'CONSTRUCCIONES', 'CONSTRUIAN', 'CONSTRUIDA', 'CONSTRUIDO', 'CONSTRUIR', 'CONSTRUYE', 'CONSTRUYEN', 'CONSTRUYERON', 'CONSTRUYO', 'CONSULTA', 'CONSULTAR', 'CONSUME', 'CONSUMEN', 'CONSUMIR', 'CONSUMO', 'CONTABA', 'CONTABAN', 'CONTACTO', 'CONTADO', 'CONTADOR', 'CONTAMINA', 'CONTAMINACION', 'CONTAMINAN', 'CONTAMINANTES', 'CONTANDO', 'CONTAR', 'CONTARON', 'CONTENIDO', 'CONTENTA', 'CONTENTO', 'CONTENTOS', 'CONTESTA', 'CONTESTAR', 'CONTESTO', 'CONTIENE', 'CONTIENEN', 'CONTIGO', 'CONTINENTE', 'CONTINENTES', 'CONTINUA', 'CONTINUACION', 'CONTINUAR', 'CONTINUO', 'CONTO', 'CONTORNO', 'CONTRA', 'CONTRARIO', 'CONTROL', 'CONTROLAR', 'CONVENCER', 'CONVENIENTE', 'CONVERSA', 'CONVERTIDO', 'CONVERTIR', 'CONVERTIRSE', 'CONVIENE', 'CONVIERTE', 'CONVIERTEN', 'CONVIRTIERON', 'CONVIRTIO', 'CONVIVENCIA', 'CONVIVIR', 'CONVOCO', 'COPIA', 'CORAL', 'CORAZON', 'CORCHO', 'CORDILLERA', 'CORO', 'CORONA', 'CORRAL', 'CORRE', 'CORRECTA', 'CORRECTAMENTE', 'CORRECTAS', 'CORRECTO', 'CORREDOR', 'CORREGIR', 'CORREN', 'CORREO', 'CORRER', 'CORRESPONDA', 'CORRESPONDE', 'CORRESPONDEN', 'CORRESPONDIENTE', 'CORRESPONDIENTES', 'CORRIENDO', 'CORRIENTE', 'CORRIENTES', 'CORRIGE', 'CORRIO', 'CORTA', 'CORTAN', 'CORTAR', 'CORTAS', 'CORTAS', 'CORTE', 'CORTES', 'CORTEZA', 'CORTO', 'CORTOS', 'COSA', 'COSAS', 'COSECHA', 'COSECHAS', 'COSTA', 'COSTAL', 'COSTAS', 'COSTERA', 'COSTERAS', 'COSTO', 'COSTUMBRES', 'COTIDIANA', 'COYOTE', 'CREACION', 'CREADO', 'CREAR', 'CREARON', 'CREAS', 'CRECE', 'CRECEN', 'CRECER', 'CRECIDO', 'CRECIENDO', 'CRECIERON', 'CRECIMIENTO', 'CRECIO', 'CREE', 'CREEN', 'CREENCIAS', 'CREER', 'CREES', 'CREIA', 'CREIAN', 'CREMA', 'CREO', 'CREO', 'CREYO', 'CRIA', 'CRIAR', 'CRIAS', 'CRIOLLOS', 'CRISTIANISMO', 'CRISTIANOS', 'CRISTO', 'CRISTOBAL', 'CROMOSOMA', 'CROMOSOMAS', 'CRONICA', 'CRUCIGRAMA', 'CRUZ', 'CRUZAR', 'CUADERNO', 'CUADERNOS', 'CUADRADO', 'CUADRADOS', 'CUADRAS', 'CUADRICULA', 'CUADRILATERO', 'CUADRILATEROS', 'CUADRITO', 'CUADRITOS', 'CUADRO', 'CUADROS', 'CUAL', 'CUAL', 'CUALES', 'CUALES', 'CUALQUIER', 'CUALQUIERA', 'CUANDO', 'CUANDO', 'CUANTA', 'CUANTAS', 'CUANTAS', 'CUANTO', 'CUANTO', 'CUANTOS', 'CUANTOS', 'CUARENTA', 'CUARTA', 'CUARTAS', 'CUARTO', 'CUATRO', 'CUAUHTAMOC', 'CUAUTLA', 'CUBA', 'CUBETA', 'CUBIERTA', 'CUBIERTAS', 'CUBIERTO', 'CUBIERTOS', 'CUBO', 'CUBOS', 'CUBRE', 'CUBREN', 'CUBRIR', 'CUCA', 'CUCHARA', 'CUCHARADA', 'CUELLO', 'CUENTA', 'CUENTAN', 'CUENTAS', 'CUENTO', 'CUENTOS', 'CUERDA', 'CUERDAS', 'CUERNAVACA', 'CUERPO', 'CUERPOS', 'CUESTA', 'CUESTAN', 'CUEVA', 'CUEVAS', 'CUIDA', 'CUIDADO', 'CUIDADOS', 'CUIDADOSAMENTE', 'CUIDAR', 'CUIDEMOS', 'CULEBRA', 'CULPA', 'CULTIVAR', 'CULTIVO', 'CULTIVOS', 'CULTO', 'CULTURA', 'CULTURAL', 'CULTURALES', 'CULTURAS', 'CUMPLE', 'CUMPLEAÑOS', 'CUMPLIR', 'CURIOSIDAD', 'CURIOSIDADES', 'CURSIVA', 'CURSO', 'CUYA', 'CUYAS', 'CUYO', 'CUYOS', 'DABA', 'DABAN', 'DACADA', 'DACADAS', 'DACIMO', 'DACIMOS', 'DADALO', 'DADO', 'DADOS', 'DAMNIFICADOS', 'DAMOS', 'DAN', 'DANDO', 'DANIEL', 'DANIELA', 'DAR', 'DARA', 'DARAN', 'DARLE', 'DARSE', 'DATOS', 'DAVID', 'DAÑO', 'DAÑOS', 'DEBAJO', 'DEBE', 'DEBEMOS', 'DEBEN', 'DEBERA', 'DEBERAN', 'DEBERIA', 'DEBERIAN', 'DEBES', 'DEBIA', 'DEBIAN', 'DEBIDO', 'DEBO', 'DECENA', 'DECENAS', 'DECIA', 'DECIAN', 'DECIDAN', 'DECIDE', 'DECIDIERON', 'DECIDIO', 'DECIDIR', 'DECIMAL', 'DECIMALES', 'DECIMETRO', 'DECIMOS', 'DECIR', 'DECISION', 'DECISIONES', 'DECLARACION', 'DEDICA', 'DEDICAN', 'DEDO', 'DEDOS', 'DEFENDER', 'DEFENDERSE', 'DEFENSA', 'DEJA', 'DEJADO', 'DEJAN', 'DEJANDO', 'DEJAR', 'DEJARON', 'DEJO', 'DEL', 'DELANTE', 'DELFINES', 'DELGADA', 'DELGADAS', 'DELGADO', 'DEMAS', 'DEMASIADO', 'DENSIDAD', 'DENTRO', 'DEPENDE', 'DEPENDEN', 'DEPENDIENDO', 'DEPORTE', 'DEPORTES', 'DEPORTIVO', 'DEPOSITOS', 'DEPRESIONES', 'DERECHA', 'DERECHO', 'DERECHOS', 'DERIVADOS', 'DERROTA', 'DERROTADO', 'DESAPARECE', 'DESAPARECIDO', 'DESAPARECIO', 'DESAPARICION', 'DESARROLLA', 'DESARROLLADO', 'DESARROLLAN', 'DESARROLLAR', 'DESARROLLARON', 'DESARROLLARSE', 'DESARROLLO', 'DESARROLLO', 'DESCANSAR', 'DESCANSO', 'DESCENDIENTES', 'DESCOMPOSICION', 'DESCONOCIDO', 'DESCONTENTO', 'DESCRIBE', 'DESCRIBIR', 'DESCRIPCION', 'DESCRIPCIONES', 'DESCUBIERTA', 'DESCUBIERTO', 'DESCUBRE', 'DESCUBRIERON', 'DESCUBRIMIENTO', 'DESCUBRIMIENTOS', 'DESCUBRIO', 'DESCUBRIR', 'DESCUENTO', 'DESDE', 'DESEA', 'DESECHAMOS', 'DESECHO', 'DESECHOS', 'DESENLACE', 'DESEO', 'DESEOS', 'DESFILE', 'DESIERTO', 'DESIERTOS', 'DESORDEN', 'DESPACIO', 'DESPEDIDA', 'DESPERTO', 'DESPLAZAN', 'DESPRENDE', 'DESPUAS', 'DESTACAN', 'DESTINO', 'DESTRUCCION', 'DESVENTAJAS', 'DETALLE', 'DETALLES', 'DETECTIVE', 'DETENER', 'DETERGENTES', 'DETERIORO', 'DETERMINA', 'DETERMINADO', 'DETIENE', 'DETRAS', 'DIA', 'DIAGONAL', 'DIAGONALES', 'DIAGRAMA', 'DIALOGO', 'DIALOGOS', 'DIAMETRO', 'DIARIA', 'DIARIAMENTE', 'DIARIO', 'DIARIOS', 'DIAS', 'DIAZ', 'DIBUJA', 'DIBUJADAS', 'DIBUJADOS', 'DIBUJALO', 'DIBUJAR', 'DIBUJEN', 'DIBUJO', 'DIBUJOS', 'DICCIONARIO', 'DICE', 'DICEN', 'DICES', 'DICHO', 'DICIEMBRE', 'DICIENDO', 'DIEGO', 'DIENTE', 'DIENTES', 'DIERON', 'DIEZ', 'DIFERENCIA', 'DIFERENCIAS', 'DIFERENTE', 'DIFERENTES', 'DIFICIL', 'DIFICILES', 'DIFICULTADES', 'DIGA', 'DIGAN', 'DIGO', 'DIJE', 'DIJERON', 'DIJO', 'DINERO', 'DINOSAURIO', 'DINOSAURIOS', 'DIO', 'DIOS', 'DIOSES', 'DIOXIDO', 'DIRECCION', 'DIRECTA', 'DIRECTAMENTE', 'DIRECTO', 'DIRECTOR', 'DIRECTORA', 'DIRIGIDA', 'DIRIGIO', 'DISCUSION', 'DISCUTAN', 'DISCUTE', 'DISCUTELO', 'DISCUTIR', 'DISEÑO', 'DISEÑOS', 'DISFRUTAR', 'DISMINUIR', 'DISMINUYE', 'DISMINUYO', 'DISTANCIA', 'DISTANCIAS', 'DISTE', 'DISTINGUEN', 'DISTINGUIR', 'DISTINTA', 'DISTINTAS', 'DISTINTO', 'DISTINTOS', 'DISTRIBUCION', 'DISTRITO', 'DIVERSAS', 'DIVERSIDAD', 'DIVERSOS', 'DIVERTIDO', 'DIVIDE', 'DIVIDEN', 'DIVIDIDA', 'DIVIDIDO', 'DIVIDIR', 'DIVISION', 'DIVISIONES', 'DOBLA', 'DOBLE', 'DOCE', 'DOCENA', 'DOCTOR', 'DOCUMENTO', 'DOCUMENTOS', 'DOLOR', 'DOLORES', 'DOMICILIO', 'DOMINGO', 'DOMINGUEZ', 'DOMINIO', 'DOMINIOS', 'DOMINO', 'DON', 'DONDE', 'DONDE', 'DORMIDO', 'DORMIR', 'DOS', 'DOY', 'DOÑA', 'DRENAJE', 'DROGAS', 'DUDA', 'DUDAS', 'DUERMEN', 'DUEÑO', 'DUEÑOS', 'DULCE', 'DULCES', 'DURA', 'DURACION', 'DURANGO', 'DURANTE', 'DURMIENTE', 'DURO', 'DURO', 'DUROS', 'ECHA', 'ECHO', 'ECLIPSE', 'ECLIPSES', 'ECOLOGICO', 'ECONOMIA', 'ECONOMICA', 'ECONOMICAS', 'ECONOMICO', 'ECONOMICOS', 'ECOSISTEMA', 'ECOSISTEMAS', 'ECUADOR', 'EDAD', 'EDIFICIO', 'EDIFICIOS', 'EDUCACION', 'EFECTO', 'EFECTOS', 'EGIPCIOS', 'EGIPTO', 'EJARCITO', 'EJARCITOS', 'EJE', 'EJEMPLO', 'EJEMPLOS', 'EJERCICIO', 'EJERCICIOS', 'EJES', 'ELABORA', 'ELABORACION', 'ELABORADO', 'ELABORADOS', 'ELABORAN', 'ELABORAR', 'ELABOREN', 'ELACTRICA', 'ELACTRICAS', 'ELACTRICOS', 'ELECCIONES', 'ELECTRICIDAD', 'ELECTRONICO', 'ELEFANTE', 'ELEFANTES', 'ELEGIR', 'ELEGISTE', 'ELEMENTO', 'ELEMENTOS', 'ELENA', 'ELIAS', 'ELIGE', 'ELIGIERON', 'ELIJAN', 'ELIMINAR', 'ELLA', 'ELLAS', 'ELLO', 'ELLOS', 'ELOY', 'EMBARAZO', 'EMBARCACIONES', 'EMBARGO', 'EMILIANO', 'EMILIO', 'EMOCION', 'EMOCIONES', 'EMPERADOR', 'EMPEZAR', 'EMPEZARON', 'EMPEZO', 'EMPIEZA', 'EMPIEZAN', 'EMPLEA', 'EMPLEAN', 'EMPLEAR', 'EMPLEO', 'EMPRESAS', 'ENCANTADO', 'ENCARGADO', 'ENCERRADO', 'ENCICLOPEDIA', 'ENCIERRA', 'ENCIMA', 'ENCONTRA', 'ENCONTRABA', 'ENCONTRABAN', 'ENCONTRADO', 'ENCONTRADOS', 'ENCONTRAMOS', 'ENCONTRAR', 'ENCONTRARAS', 'ENCONTRARON', 'ENCONTRARSE', 'ENCONTRASTE', 'ENCONTRO', 'ENCUENTRA', 'ENCUENTRAN', 'ENCUENTRAS', 'ENCUENTREN', 'ENCUENTRES', 'ENCUENTRO', 'ENCUESTA', 'ENEMIGO', 'ENEMIGOS', 'ENERGATICOS', 'ENERGIA', 'ENERO', 'ENFERMEDAD', 'ENFERMEDADES', 'ENFERMO', 'ENFRENTE', 'ENGRANE', 'ENGRANES', 'ENGRUDO', 'ENOJADO', 'ENORME', 'ENORMES', 'ENRIQUE', 'ENSEGUIDA', 'ENSEÑANZA', 'ENSEÑAR', 'ENTENDER', 'ENTENDISTE', 'ENTERO', 'ENTIDAD', 'ENTIDADES', 'ENTIENDE', 'ENTONCES', 'ENTRA', 'ENTRADA', 'ENTRAN', 'ENTRAR', 'ENTRARON', 'ENTRE', 'ENTREGAR', 'ENTREVISTA', 'ENTREVISTADO', 'ENTREVISTADOR', 'ENTREVISTAS', 'ENTRO', 'ENTUSIASMO', 'ENVIAR', 'ENVIO', 'EPIDEMIAS', 'EQUILATERO', 'EQUILIBRIO', 'EQUIPO', 'EQUIPOS', 'EQUIVALE', 'EQUIVALENTES', 'ERA', 'ERAN', 'ERES', 'EROSION', 'ERROR', 'ERRORES', 'ERUPCION', 'ESA', 'ESAS', 'ESCALA', 'ESCALERAS', 'ESCAPAR', 'ESCASA', 'ESCASAS', 'ESCASEZ', 'ESCENA', 'ESCENARIO', 'ESCENAS', 'ESCLAVITUD', 'ESCLAVOS', 'ESCOBA', 'ESCOGE', 'ESCOGER', 'ESCOLAR', 'ESCRIBAN', 'ESCRIBE', 'ESCRIBELA', 'ESCRIBELAS', 'ESCRIBELO', 'ESCRIBELOS', 'ESCRIBEN', 'ESCRIBIENDO', 'ESCRIBIERON', 'ESCRIBIO', 'ESCRIBIR', 'ESCRIBISTE', 'ESCRITA', 'ESCRITAS', 'ESCRITO', 'ESCRITOR', 'ESCRITORES', 'ESCRITOS', 'ESCRITURA', 'ESCUADRAS', 'ESCUCHA', 'ESCUCHAR', 'ESCUCHO', 'ESCUDO', 'ESCUELA', 'ESCUELAS', 'ESCULTURA', 'ESE', 'ESFERA', 'ESFERAS', 'ESFUERZO', 'ESFUERZOS', 'ESO', 'ESOS', 'ESPACIAL', 'ESPACIO', 'ESPACIOS', 'ESPADA', 'ESPALDA', 'ESPAÑA', 'ESPAÑOL', 'ESPAÑOLA', 'ESPAÑOLAS', 'ESPAÑOLES', 'ESPECIAL', 'ESPECIALES', 'ESPECIALISTAS', 'ESPECIALMENTE', 'ESPECIAS', 'ESPECIE', 'ESPECIES', 'ESPECTACULO', 'ESPEJO', 'ESPERA', 'ESPERABA', 'ESPERANZA', 'ESPERAR', 'ESPERMATOZOIDE', 'ESPERMATOZOIDES', 'ESPLENDOR', 'ESPOSA', 'ESQUELETO', 'ESQUEMA', 'ESQUINA', 'ESTA', 'ESTA', 'ESTA', 'ESTABA', 'ESTABAN', 'ESTABLECE', 'ESTABLECEN', 'ESTABLECER', 'ESTABLECIDO', 'ESTABLECIERON', 'ESTABLECIMIENTO', 'ESTABLECIO', 'ESTABLO', 'ESTACION', 'ESTACIONES', 'ESTADO', 'ESTADOS', 'ESTAMBRE', 'ESTAMOS', 'ESTAMPAS', 'ESTAN', 'ESTAN', 'ESTAR', 'ESTARA', 'ESTAS', 'ESTAS', 'ESTATUA', 'ESTATURA', 'ESTE', 'ESTEBAN', 'ESTEPA', 'ESTHER', 'ESTILO', 'ESTO', 'ESTOMAGO', 'ESTOS', 'ESTOY', 'ESTRECHO', 'ESTRELLA', 'ESTRELLAS', 'ESTRELLITA', 'ESTUDIA', 'ESTUDIADO', 'ESTUDIAN', 'ESTUDIAR', 'ESTUDIASTE', 'ESTUDIO', 'ESTUDIOS', 'ESTUVIERA', 'ESTUVIERAN', 'ESTUVIERON', 'ESTUVO', 'ETAPA', 'ETAPAS', 'ETCATERA', 'ETIQUETA', 'ETIQUETAS', 'EUA', 'EUROPA', 'EUROPEA', 'EUROPEAS', 'EUROPEOS', 'EVITAR', 'EVOLUCION', 'EXACTAMENTE', 'EXCESIVA', 'EXCESO', 'EXCLAMO', 'EXISTE', 'EXISTEN', 'EXISTENCIA', 'EXISTIA', 'EXISTIAN', 'EXISTIERON', 'EXPANSION', 'EXPEDICION', 'EXPEDICIONES', 'EXPERIENCIA', 'EXPERIENCIAS', 'EXPERIMENTO', 'EXPERIMENTOS', 'EXPLICA', 'EXPLICACION', 'EXPLICACIONES', 'EXPLICAR', 'EXPLICO', 'EXPLIQUEN', 'EXPLORA', 'EXPLORACION', 'EXPLORADORES', 'EXPLORAR', 'EXPLOSION', 'EXPLOTACION', 'EXPONER', 'EXPOSICION', 'EXPRESA', 'EXPRESAR', 'EXPRESION', 'EXPRESIONES', 'EXPROPIACION', 'EXTENDIO', 'EXTENSA', 'EXTENSAS', 'EXTENSION', 'EXTENSIONES', 'EXTERIOR', 'EXTIENDE', 'EXTINCION', 'EXTRACCION', 'EXTRAE', 'EXTRAER', 'EXTRANJERAS', 'EXTRANJERO', 'EXTRANJEROS', 'EXTRAÑA', 'EXTRAÑO', 'EXTREMO', 'EXTREMOS', 'FABRICA', 'FABRICA', 'FABRICACION', 'FABRICAN', 'FABRICAR', 'FABRICAS', 'FABULAS', 'FACIL', 'FACILIDAD', 'FACILITAR', 'FACILMENTE', 'FACTOR', 'FACTORES', 'FALDA', 'FALTA', 'FALTAN', 'FAMILIA', 'FAMILIAR', 'FAMILIARES', 'FAMILIAS', 'FAMOSO', 'FANTASMA', 'FANTASMAS', 'FANTASTICOS', 'FARIAS', 'FAUNA', 'FAVOR', 'FAVORITO', 'FEBRERO', 'FECHA', 'FECHAS', 'FEDERAL', 'FELICES', 'FELICIDAD', 'FELIPE', 'FELIZ', 'FENOMENO', 'FENOMENOS', 'FERIA', 'FERMIN', 'FERNANDO', 'FEROZ', 'FERROCARRIL', 'FERROCARRILES', 'FERTILIZANTES', 'FETO', 'FIBRA', 'FIBRAS', 'FICHA', 'FICHAS', 'FIESTA', 'FIESTAS', 'FIGURA', 'FIGURAS', 'FIJA', 'FIJASTE', 'FIJATE', 'FIJENSE', 'FILAS', 'FILEAS', 'FILIPINAS', 'FIN', 'FINAL', 'FINALES', 'FINALMENTE', 'FINES', 'FIRMA', 'FIRME', 'FISICA', 'FISICAS', 'FISICO', 'FISICOS', 'FIX', 'FLAUTA', 'FLECHA', 'FLECHAS', 'FLOR', 'FLORA', 'FLORES', 'FLOTA', 'FOCO', 'FOGG', 'FOLLETO', 'FONDO', 'FORESTAL', 'FORESTALES', 'FORMA', 'FORMABAN', 'FORMACION', 'FORMADA', 'FORMADAS', 'FORMADO', 'FORMADOS', 'FORMAL', 'FORMAN', 'FORMANDO', 'FORMAR', 'FORMARON', 'FORMARSE', 'FORMAS', 'FORMASTE', 'FORMATO', 'FORMEN', 'FORMO', 'FORMULA', 'FORTUNA', 'FOSILES', 'FOTO', 'FOTOGRAFIA', 'FOTOGRAFIAS', 'FOTOS', 'FOTOSINTESIS', 'FRACCION', 'FRACCIONES', 'FRAGMEN', 'FRAGMENTOS', 'FRANCAS', 'FRANCESA', 'FRANCESES', 'FRANCIA', 'FRANCISCA', 'FRANCISCO', 'FRANJA', 'FRASCO', 'FRASCOS', 'FRASE', 'FRASES', 'FRAY', 'FRECUENCIA', 'FRECUENCIAS', 'FRECUENTE', 'FRECUENTEMENTE', 'FRECUENTES', 'FRENTE', 'FRIA', 'FRIAS', 'FRIJOL', 'FRIJOLES', 'FRIO', 'FRIOS', 'FRONTERA', 'FRONTERAS', 'FRUTA', 'FRUTALES', 'FRUTAS', 'FRUTOS', 'FUE', 'FUEGO', 'FUENTE', 'FUENTES', 'FUERA', 'FUERAN', 'FUERON', 'FUERTE', 'FUERTES', 'FUERZA', 'FUERZAS', 'FUI', 'FUIMOS', 'FUNCION', 'FUNCIONA', 'FUNCIONAMIENTO', 'FUNCIONAN', 'FUNCIONAR', 'FUNCIONARIOS', 'FUNCIONES', 'FUNDA', 'FUNDACION', 'FUNDAMENTAL', 'FUNDARON', 'FUNDO', 'FUSILADO', 'FUTBOL', 'FUTURO', 'GABRIELA', 'GALAXIAS', 'GALICIA', 'GALLETA', 'GALLETAS', 'GALLINA', 'GALLINAS', 'GALLO', 'GANA', 'GANADERIA', 'GANADO', 'GANAR', 'GANARON', 'GANAS', 'GANE', 'GANO', 'GARCIA', 'GARFIO', 'GAS', 'GASES', 'GASOLINA', 'GASTO', 'GATO', 'GATOS', 'GELATINA', 'GEMELOS', 'GENERA', 'GENERACION', 'GENERACIONES', 'GENERAL', 'GENERALES', 'GENERALMENTE', 'GENERAN', 'GENERAR', 'GENIO', 'GENTE', 'GENTES', 'GEOGRAFIA', 'GEOGRAFICAS', 'GEOGRAFO', 'GEOMATRICAS', 'GEPETO', 'GERARDO', 'GIGANTE', 'GIGANTES', 'GIRA', 'GIRAR', 'GIRASOL', 'GLANDULAS', 'GLOBO', 'GLOBOS', 'GLORIA', 'GLOSARIO', 'GNOMO', 'GOBERNADOR', 'GOBERNANTE', 'GOBERNANTES', 'GOBERNAR', 'GOBIERNO', 'GOBIERNOS', 'GOLFO', 'GOLPE', 'GOMEZ', 'GONZALEZ', 'GORDO', 'GORILA', 'GOTAS', 'GRACIAS', 'GRADO', 'GRADOS', 'GRAFICA', 'GRAFICAS', 'GRAMO', 'GRAMOS', 'GRAN', 'GRANADA', 'GRANDE', 'GRANDES', 'GRANJA', 'GRANO', 'GRANOS', 'GRASA', 'GRAVE', 'GRAVES', 'GRECIA', 'GRIEGO', 'GRIEGOS', 'GRILLITO', 'GRILLO', 'GRIS', 'GRITABA', 'GRITO', 'GRITO', 'GRITOS', 'GROSOR', 'GRUESA', 'GRUESO', 'GRUPO', 'GRUPOS', 'GUADALAJARA', 'GUADALUPE', 'GUAJOLOTES', 'GUANAJUATO', 'GUARDAR', 'GUATEMALA', 'GUERRA', 'GUERRAS', 'GUERRERO', 'GUERREROS', 'GUIA', 'GUILLERMO', 'GUINEA', 'GUION', 'GULLIVER', 'GUSANO', 'GUSANOS', 'GUSTA', 'GUSTABA', 'GUSTADO', 'GUSTAN', 'GUSTARIA', 'GUSTE', 'GUSTO', 'GUSTO', 'GUSTOS', 'GUZMAN', 'HAB', 'HABER', 'HABIA', 'HABIAN', 'HABILIDADES', 'HABITA', 'HABITABAN', 'HABITAN', 'HABITANTES', 'HABITOS', 'HABLA', 'HABLABA', 'HABLABAN', 'HABLAN', 'HABLANDO', 'HABLAR', 'HABLEMOS', 'HABRA', 'HABRAS', 'HABRIA', 'HACE', 'HACEMOS', 'HACEN', 'HACER', 'HACERLA', 'HACERLE', 'HACERLO', 'HACERSE', 'HACES', 'HACIA', 'HACIA', 'HACIAN', 'HACIENDA', 'HACIENDAS', 'HACIENDO', 'HADA', 'HAGA', 'HAGAMOS', 'HAGAN', 'HAGAS', 'HAGO', 'HAITI', 'HALLAZGOS', 'HAMBRE', 'HAN', 'HARA', 'HARA', 'HAREMOS', 'HARIAS', 'HARINA', 'HAROE', 'HAROES', 'HAS', 'HASTA', 'HAY', 'HAYA', 'HAYAN', 'HAYAS', 'HAZ', 'HAZLO', 'HECHAS', 'HECHO', 'HECHOS', 'HELADO', 'HELADOS', 'HEMBRA', 'HEMBRAS', 'HEMISFERIO', 'HEMOS', 'HERENCIA', 'HERIDO', 'HERMANA', 'HERMANO', 'HERMANOS', 'HERMOSA', 'HERMOSAS', 'HERMOSO', 'HERNAN', 'HERNANDEZ', 'HERRAMIENTAS', 'HEXAGONO', 'HICE', 'HICIERON', 'HICISTE', 'HIDALGO', 'HIELO', 'HIELOS', 'HIERBA', 'HIERBAS', 'HIERRO', 'HIGIENE', 'HIJA', 'HIJO', 'HIJOS', 'HILANDERA', 'HILO', 'HILOS', 'HIMNO', 'HISTORIA', 'HISTORIADORES', 'HISTORIAS', 'HISTORIETA', 'HISTORIETAS', 'HIZO', 'HOGAR', 'HOJA', 'HOJAS', 'HOLA', 'HOMBRE', 'HOMBRES', 'HOMO', 'HONDURAS', 'HONOR', 'HORA', 'HORAS', 'HORIZONTAL', 'HORIZONTALES', 'HORIZONTE', 'HORMIGAS', 'HORMONAS', 'HORNO', 'HOSPITAL', 'HOSPITALES', 'HOY', 'HRS', 'HUBIERA', 'HUBIERAN', 'HUBO', 'HUECO', 'HUELLA', 'HUELLAS', 'HUERTA', 'HUESO', 'HUESOS', 'HUEVO', 'HUEVOS', 'HUICHOLES', 'HULE', 'HUMANA', 'HUMANAS', 'HUMANIDAD', 'HUMANO', 'HUMANOS', 'HUMEDA', 'HUMEDAD', 'HUMEDAS', 'HUMEDO', 'HUMO', 'HURACANES', 'IBA', 'IBAMOS', 'IBAN', 'IDEA', 'IDEAS', 'IDENTIFICA', 'IDENTIFICAR', 'IDIOMA', 'IDIOMAS', 'IDO', 'IGLESIA', 'IGLESIAS', 'IGNACIO', 'IGUAL', 'IGUALDAD', 'IGUALES', 'IGUALMENTE', 'ILUMINA', 'ILUSTRACION', 'ILUSTRACIONES', 'IMAGEN', 'IMAGENES', 'IMAGINA', 'IMAGINACION', 'IMAGINAR', 'IMAGINARIAS', 'IMAGINARIO', 'IMAGINAS', 'IMAGINATE', 'IMAN', 'IMANES', 'IMPERIO', 'IMPORTA', 'IMPORTANCIA', 'IMPORTANTE', 'IMPORTANTES', 'IMPOSIBLE', 'IMPRENTA', 'IMPUESTOS', 'INAS', 'INAUGURACION', 'INCA', 'INCAS', 'INCENDIO', 'INCENDIOS', 'INCLINACION', 'INCLINADO', 'INCLUIR', 'INCLUSO', 'INCLUYE', 'INDEPENDENCIA', 'INDEPENDIENTE', 'INDEPENDIENTES', 'INDIA', 'INDIAS', 'INDICA', 'INDICACIONES', 'INDICAN', 'INDICAR', 'INDICE', 'INDICO', 'INDIGENA', 'INDIGENAS', 'INDIOS', 'INDISPENSABLE', 'INDIVIDUOS', 'INDONESIA', 'INDUSTRIA', 'INDUSTRIAL', 'INDUSTRIALES', 'INDUSTRIAS', 'INFANCIA', 'INFANTIL', 'INFECCIONES', 'INFERIOR', 'INFLUENCIA', 'INFLUYE', 'INFLUYEN', 'INFORMACION', 'INFORME', 'INGLAS', 'INGLATERRA', 'INGLESAS', 'INGLESES', 'INGREDIENTES', 'INICIA', 'INICIAL', 'INICIAR', 'INICIARON', 'INICIO', 'INICIO', 'INMEDIATAMENTE', 'INMEDIATO', 'INMENSO', 'INMIGRANTES', 'INMUNOLOGICO', 'INQUISICION', 'INSECTO', 'INSECTOS', 'INSTANTE', 'INSTITUTO', 'INSTRUCCIONES', 'INSTRUCTIVO', 'INSTRUMENTO', 'INSTRUMENTOS', 'INSURGENTE', 'INSURGENTES', 'INTEGRANTES', 'INTELIGENCIA', 'INTELIGENTE', 'INTENSA', 'INTENSIDAD', 'INTENSO', 'INTENTA', 'INTENTO', 'INTERAS', 'INTERCAMBIA', 'INTERCAMBIO', 'INTERESANTE', 'INTERESANTES', 'INTERESE', 'INTERESES', 'INTERIOR', 'INTERNACIONAL', 'INTERNACIONALES', 'INTERPRETACIONES', 'INTERVENCION', 'INTRODUCCION', 'INTRODUCE', 'INUNDACIONES', 'INVASION', 'INVASORES', 'INVENCION', 'INVENTA', 'INVENTADO', 'INVENTAR', 'INVENTARON', 'INVENTO', 'INVENTO', 'INVENTOS', 'INVERTEBRADOS', 'INVESTIGA', 'INVESTIGACION', 'INVESTIGACIONES', 'INVESTIGADORES', 'INVESTIGAR', 'INVIERNO', 'INVITA', 'INVITACION', 'INVITADO', 'INVITO', 'IRAN', 'IRSE', 'ISABEL', 'ISLA', 'ISLAM', 'ISLAS', 'ISOSCELES', 'ITALIA', 'ITALIANO', 'ITURBIDE', 'ITZA', 'ITZEL', 'IVAN', 'IZQUIERDA', 'IZQUIERDO', 'IZTACCIHUATL', 'JABON', 'JACARANDA', 'JAGUAR', 'JAIME', 'JALISCIENSES', 'JALISCO', 'JAMAS', 'JAPON', 'JARABE', 'JARDIN', 'JARDINES', 'JAULA', 'JAVIER', 'JEFE', 'JEFES', 'JESUS', 'JIRAFA', 'JIRAFAS', 'JITOMATE', 'JOAQUIN', 'JOEL', 'JORGE', 'JOSA', 'JOVEN', 'JOVENES', 'JOYAS', 'JUAN', 'JUANA', 'JUAREZ', 'JUEGA', 'JUEGAN', 'JUEGO', 'JUEGOS', 'JUEGUEN', 'JUEVES', 'JUEZ', 'JUGABAN', 'JUGADOR', 'JUGADORES', 'JUGANDO', 'JUGAR', 'JUGO', 'JUGUEMOS', 'JUGUETE', 'JUGUETES', 'JULIA', 'JULIAN', 'JULIO', 'JUNIO', 'JUNTA', 'JUNTAS', 'JUNTO', 'JUNTOS', 'JUPITER', 'JUSTICIA', 'JUSTO', 'JUVENTUD', 'KILO', 'KILOGRAMO', 'KILOGRAMOS', 'KILOMETRO', 'KILOMETRO', 'KILOS', 'KOX', 'LABORES', 'LADO', 'LADOS', 'LADRILLOS', 'LADRON', 'LADRONES', 'LAELO', 'LAGO', 'LAGOS', 'LAGRIMAS', 'LAGUNA', 'LAGUNAS', 'LALO', 'LAMINAS', 'LANA', 'LANZA', 'LANZAR', 'LANZO', 'LAPICES', 'LAPIZ', 'LARGA', 'LARGAS', 'LARGO', 'LARGOS', 'LAS', 'LATA', 'LATAS', 'LATINA', 'LATITUD', 'LAURA', 'LAVA', 'LAVAR', 'LAZALO', 'LEAN', 'LECCION', 'LECCIONES', 'LECHE', 'LECHERO', 'LECHUGA', 'LECTORES', 'LECTURA', 'LECTURAS', 'LEE', 'LEEN', 'LEER', 'LEERLO', 'LEIDO', 'LEISTE', 'LEJANO', 'LEJANOS', 'LEJOS', 'LENGUA', 'LENGUAJE', 'LENGUAS', 'LENTAMENTE', 'LENTE', 'LENTEJAS', 'LENTES', 'LENTO', 'LEON', 'LEONARDO', 'LEONES', 'LERDO', 'LES', 'LETRA', 'LETRAS', 'LETY', 'LEVANTA', 'LEVANTAR', 'LEVANTO', 'LEY', 'LEYENDA', 'LEYENDAS', 'LEYENDO', 'LEYES', 'LEÑA', 'LIA', 'LIBERAL', 'LIBERALES', 'LIBERTAD', 'LIBRE', 'LIBRES', 'LIBRO', 'LIBROS', 'LIEBRE', 'LIGA', 'LILIPUT', 'LIMITE', 'LIMITES', 'LIMON', 'LIMPIA', 'LIMPIAR', 'LIMPIEZA', 'LIMPIO', 'LIMPIOS', 'LINDO', 'LINEA', 'LINEAS', 'LIQUIDA', 'LIQUIDO', 'LIQUIDOS', 'LISTA', 'LISTAS', 'LISTO', 'LISTON', 'LITERATURA', 'LITOGRAFIA', 'LITRO', 'LITROS', 'LLAMA', 'LLAMABA', 'LLAMABAN', 'LLAMADA', 'LLAMADAS', 'LLAMADO', 'LLAMADOS', 'LLAMAMOS', 'LLAMAN', 'LLAMAR', 'LLAMARON', 'LLAMAS', 'LLAMO', 'LLANTAS', 'LLANURA', 'LLANURAS', 'LLAVE', 'LLAVES', 'LLEGA', 'LLEGABA', 'LLEGABAN', 'LLEGADA', 'LLEGADO', 'LLEGAMOS', 'LLEGAN', 'LLEGANDO', 'LLEGAR', 'LLEGARON', 'LLEGAS', 'LLEGO', 'LLEGUA', 'LLEGUE', 'LLENA', 'LLENAR', 'LLENO', 'LLENO', 'LLENOS', 'LLEVA', 'LLEVABA', 'LLEVABAN', 'LLEVAN', 'LLEVAR', 'LLEVARON', 'LLEVO', 'LLUEVE', 'LLUVIA', 'LLUVIAS', 'LOBO', 'LOCALICEN', 'LOCALIDAD', 'LOCALIDADES', 'LOCALIZA', 'LOCALIZACION', 'LOCALIZAN', 'LOCALIZAR', 'LODO', 'LOGRA', 'LOGRADO', 'LOGRAR', 'LOGRARLO', 'LOGRARON', 'LOGRO', 'LOLA', 'LONDRES', 'LONGITUD', 'LOPEZ', 'LORENZO', 'LOS', 'LUCES', 'LUCHA', 'LUCHAR', 'LUCIA', 'LUEGO', 'LUGAR', 'LUGARES', 'LUIS', 'LUISITO', 'LUNA', 'LUNAS', 'LUNES', 'LUPA', 'LUPE', 'LUZ', 'MACETA', 'MACHO', 'MACHOS', 'MADERA', 'MADERO', 'MADICA', 'MADICO', 'MADICOS', 'MADRE', 'MADRUGADA', 'MADULA', 'MAESTRA', 'MAESTRO', 'MAESTROS', 'MAGALLANES', 'MAGICO', 'MAGO', 'MAGON', 'MAIZ', 'MAJESTAD', 'MAL', 'MALA', 'MALO', 'MALOS', 'MAMA', 'MAMIFEROS', 'MANCHA', 'MANDO', 'MANDO', 'MANERA', 'MANERAS', 'MANGO', 'MANGOS', 'MANO', 'MANOS', 'MANTENER', 'MANTIENE', 'MANUEL', 'MANZANA', 'MANZANAS', 'MAPA', 'MAPAS', 'MAQUETA', 'MAQUINA', 'MAQUINARIA', 'MAQUINAS', 'MAR', 'MARAVILLOSA', 'MARCA', 'MARCADAS', 'MARCADOS', 'MARCAR', 'MARCHA', 'MARCO', 'MARES', 'MARGARITAS', 'MARIA', 'MARIANO', 'MARICELA', 'MARIDA', 'MARINA', 'MARINAS', 'MARINEROS', 'MARINO', 'MARINOS', 'MARIO', 'MARIPOSA', 'MARIPOSAS', 'MARITIMAS', 'MARTA', 'MARTE', 'MARTES', 'MARTIN', 'MARTINEZ', 'MARZO', 'MAS', 'MAS', 'MASA', 'MASCOTA', 'MATEMATICAS', 'MATERIA', 'MATERIAL', 'MATERIALES', 'MATERIAS', 'MATODO', 'MATODOS', 'MATORRALES', 'MAURICIO', 'MAXICO', 'MAXIMILIANO', 'MAXIMO', 'MAYA', 'MAYAS', 'MAYO', 'MAYOR', 'MAYORDOMO', 'MAYORES', 'MAYORIA', 'MAYTA', 'MAYTE', 'MAZORCAS', 'MAÑANA', 'MAÑANAS', 'MECANICA', 'MECANICO', 'MECATE', 'MECHE', 'MEDALLA', 'MEDALLAS', 'MEDIA', 'MEDIADOS', 'MEDIANA', 'MEDIANO', 'MEDIANTE', 'MEDICINA', 'MEDICINAS', 'MEDICION', 'MEDIDA', 'MEDIDAS', 'MEDIO', 'MEDIOS', 'MEDIR', 'MEDITERRANEO', 'MEJOR', 'MEJORAR', 'MEJORES', 'MEMBRANA', 'MEMORIA', 'MENCIONA', 'MENCIONAN', 'MENOR', 'MENORES', 'MENOS', 'MENSAJE', 'MENSAJES', 'MENSTRUACION', 'MENUDO', 'MERCADO', 'MERCADOS', 'MERCANCIA', 'MERCANCIAS', 'MERCURIO', 'MERIDIANO', 'MERIDIANOS', 'MES', 'MESA', 'MESES', 'MESETA', 'MESETAS', 'MESOAMARICA', 'MESOAMERICANOS', 'MESOPOTAMIA', 'MESTIZOS', 'META', 'METAL', 'METALES', 'METE', 'METRO', 'METROS', 'MEXICA', 'MEXICALI', 'MEXICANA', 'MEXICANAS', 'MEXICANO', 'MEXICANOS', 'MEXICAS', 'MEZCLA', 'MEZCLAS', 'MIA', 'MIARCOLES', 'MICHOACAN', 'MICROBIO', 'MICROBIOS', 'MICROORGANISMOS', 'MICROSCOPIO', 'MIDA', 'MIDAN', 'MIDE', 'MIDEN', 'MIEDO', 'MIEL', 'MIEMBROS', 'MIENTRAS', 'MIGRACION', 'MIGRACIONES', 'MIGUEL', 'MIL', 'MILES', 'MILILITROS', 'MILIMETROS', 'MILITAR', 'MILITARES', 'MILLAR', 'MILLARES', 'MILLON', 'MILLONES', 'MIN', 'MINA', 'MINAS', 'MINERAL', 'MINERALES', 'MINERIA', 'MINEROS', 'MINISTRO', 'MINUTO', 'MINUTOS', 'MIO', 'MIRA', 'MIRABA', 'MIRANDO', 'MIRAR', 'MIREYA', 'MIRO', 'MIS', 'MISION', 'MISMA', 'MISMAS', 'MISMO', 'MISMOS', 'MISTERIOSO', 'MITAD', 'MOCTEZUMA', 'MODELO', 'MODELOS', 'MODERNA', 'MODERNAS', 'MODERNO', 'MODIFICA', 'MODO', 'MODOS', 'MOLINO', 'MOLINOS', 'MOMENTO', 'MOMENTOS', 'MONARCA', 'MONARQUIA', 'MONEDA', 'MONEDAS', 'MONICA', 'MONO', 'MONOS', 'MONSTRUO', 'MONTAÑA', 'MONTAÑAS', 'MONTAÑOSAS', 'MONTE', 'MONTERREY', 'MONTES', 'MONTON', 'MONTONES', 'MORADO', 'MORELIA', 'MORELOS', 'MORENO', 'MORGAN', 'MORIR', 'MORTALIDAD', 'MOSAICO', 'MOSAICOS', 'MOSCAS', 'MOSTRAR', 'MOTIVO', 'MOTIVOS', 'MOTOR', 'MOTORES', 'MOVER', 'MOVERSE', 'MOVIMIENTO', 'MOVIMIENTOS', 'MOÑO', 'MOÑOS', 'MUCHA', 'MUCHACHO', 'MUCHACHOS', 'MUCHAS', 'MUCHISIMO', 'MUCHISIMOS', 'MUCHO', 'MUCHOS', 'MUEBLES', 'MUERE', 'MUEREN', 'MUERTE', 'MUERTO', 'MUERTOS', 'MUESTRA', 'MUESTRAN', 'MUEVE', 'MUEVEN', 'MUJER', 'MUJERES', 'MULTIPLICACION', 'MULTIPLICACIONES', 'MULTIPLICAR', 'MULTITUD', 'MUNDIAL', 'MUNDO', 'MUNICIPAL', 'MUNICIPIO', 'MUNICIPIOS', 'MURAL', 'MURALES', 'MURIERON', 'MURIO', 'MUROS', 'MUSCULOS', 'MUSEO', 'MUSEOS', 'MUSICA', 'MUSULMANES', 'MUY', 'MUÑECO', 'MUÑECOS', 'NACE', 'NACEN', 'NACER', 'NACIDO', 'NACIERON', 'NACIMIENTO', 'NACIMIENTOS', 'NACIO', 'NACION', 'NACIONAL', 'NACIONALES', 'NACIONALIDAD', 'NACIONES', 'NADA', 'NADAR', 'NADIE', 'NAHUATL', 'NAPOLEON', 'NARANJA', 'NARANJADA', 'NARANJAS', 'NARIZ', 'NARRA', 'NARRACION', 'NARRACIONES', 'NARRADOR', 'NATALIDAD', 'NATURAL', 'NATURALES', 'NATURALEZA', 'NAVE', 'NAVEGANTES', 'NAVEGAR', 'NAVES', 'NAYARIT', 'NECESARIA', 'NECESARIAS', 'NECESARIO', 'NECESARIOS', 'NECESIDAD', 'NECESIDADES', 'NECESITA', 'NECESITABA', 'NECESITAMOS', 'NECESITAN', 'NECESITAS', 'NECESITES', 'NEGRA', 'NEGRAS', 'NEGRITA', 'NEGRO', 'NEGROS', 'NERVIOSO', 'NEURONAS', 'NICARAGUA', 'NICOLAS', 'NIDO', 'NIDOS', 'NIEVE', 'NIEVES', 'NINGUN', 'NINGUNA', 'NINGUNO', 'NIVEL', 'NIVELES', 'NIÑA', 'NIÑAS', 'NIÑO', 'NIÑOS', 'NOBLES', 'NOBLEZA', 'NOCHE', 'NOCHES', 'NOMADAS', 'NOMBRADO', 'NOMBRE', 'NOMBRES', 'NOPAL', 'NOPALES', 'NORESTE', 'NORMA', 'NORMAL', 'NOROESTE', 'NORTE', 'NORTEAMARICA', 'NOS', 'NOSOTROS', 'NOTA', 'NOTABLE', 'NOTABLES', 'NOTAS', 'NOTICIA', 'NOTICIAS', 'NOVELA', 'NOVELAS', 'NOVIEMBRE', 'NOVIO', 'NUBE', 'NUBES', 'NUBLADO', 'NUCLEO', 'NUDO', 'NUECES', 'NUESTRA', 'NUESTRAS', 'NUESTRO', 'NUESTROS', 'NUEVA', 'NUEVAMENTE', 'NUEVAS', 'NUEVE', 'NUEVO', 'NUEVOS', 'NUM', 'NUMARICA', 'NUMERACION', 'NUMERO', 'NUMEROS', 'NUMEROSAS', 'NUMEROSO', 'NUMEROSOS', 'NUNCA', 'NUTRIENTES', 'OAXACA', 'OBJETO', 'OBJETOS', 'OBLIGACIONES', 'OBRA', 'OBRAS', 'OBREGON', 'OBREROS', 'OBSERVA', 'OBSERVACIONES', 'OBSERVADO', 'OBSERVAN', 'OBSERVAR', 'OBSERVAS', 'OBSERVASTE', 'OBSERVATORIO', 'OBSERVEN', 'OBSERVO', 'OBTENER', 'OBTENIAN', 'OBTENIDO', 'OBTIENE', 'OBTIENEN', 'OBTUVIERON', 'OBTUVISTE', 'OBTUVO', 'OCAANO', 'OCAANOS', 'OCASION', 'OCASIONES', 'OCCIDENTAL', 'OCCIDENTE', 'OCEANIA', 'OCHENTA', 'OCHO', 'OCTAVIO', 'OCTUBRE', 'OCUPA', 'OCUPACION', 'OCUPAN', 'OCUPAR', 'OCUPARON', 'OCUPO', 'OCURRA', 'OCURRAN', 'OCURRE', 'OCURREN', 'OCURRIDO', 'OCURRIERON', 'OCURRIO', 'OCURRIR', 'OESTE', 'OFICIAL', 'OFICINA', 'OFICINAS', 'OFICIO', 'OFICIOS', 'OFRECE', 'OFRECEN', 'OFRECIO', 'OIDO', 'OIGO', 'OIR', 'OJALA', 'OJO', 'OJOS', 'OLA', 'OLAS', 'OLFATO', 'OLGA', 'OLLA', 'OLMECA', 'OLOR', 'OLORES', 'OLVIDES', 'ONCE', 'ONDAS', 'ONU', 'OPERACION', 'OPERACIONES', 'OPINAS', 'OPINION', 'OPINIONES', 'OPORTUNIDAD', 'OPORTUNIDADES', 'ORACION', 'ORACIONES', 'ORBITA', 'ORDEN', 'ORDENA', 'ORDENAR', 'ORDENES', 'ORDENO', 'OREJAS', 'ORGANICEN', 'ORGANICENSE', 'ORGANISMO', 'ORGANISMOS', 'ORGANIZA', 'ORGANIZACION', 'ORGANIZACIONES', 'ORGANIZADA', 'ORGANIZAN', 'ORGANIZAR', 'ORGANIZARON', 'ORGANIZARSE', 'ORGANIZATE', 'ORGANIZO', 'ORGANO', 'ORGANOS', 'ORIENTAL', 'ORIENTE', 'ORIFICIO', 'ORIGEN', 'ORIGINAL', 'ORIGINALES', 'ORILLA', 'ORILLAS', 'ORIZABA', 'ORO', 'OROZCO', 'ORTOGRAFIA', 'OSCAR', 'OSCURA', 'OSCURIDAD', 'OSCURO', 'OSO', 'OSOS', 'OTIS', 'OTOÑO', 'OTRA', 'OTRAS', 'OTRO', 'OTROS', 'OVARIOS', 'OVEJAS', 'OVIPAROS', 'OVULO', 'OVULOS', 'OXIGENO', 'OYE', 'OYO', 'PABLO', 'PACIFICO', 'PACO', 'PADRE', 'PADRES', 'PAGA', 'PAGAR', 'PAGINA', 'PAGINAS', 'PAGO', 'PAGO', 'PAIS', 'PAISAJE', 'PAISAJES', 'PAISES', 'PAJARO', 'PAJAROS', 'PALABRA', 'PALABRAS', 'PALACIO', 'PALACIOS', 'PALANCA', 'PALENQUE', 'PALETAS', 'PALITROCHE', 'PALMA', 'PALO', 'PALOS', 'PAN', 'PANAL', 'PANAMA', 'PANDULO', 'PANGEA', 'PANTALLA', 'PANTALON', 'PAPA', 'PAPA', 'PAPALOTE', 'PAPAS', 'PAPEL', 'PAPELERIA', 'PAPELITO', 'PAPELITOS', 'PAQUETE', 'PAQUETES', 'PAR', 'PARA', 'PARAGUAY', 'PARALELAS', 'PARALELOGRAMO', 'PARALELOS', 'PARAR', 'PARDIDA', 'PARECE', 'PARECEN', 'PARECIA', 'PARECIDA', 'PARECIDAS', 'PARECIDO', 'PARECIDOS', 'PARECIO', 'PARED', 'PAREDES', 'PAREJA', 'PAREJAS', 'PARES', 'PAREZCA', 'PARIS', 'PARQUE', 'PARQUES', 'PARRAFO', 'PARRAFOS', 'PARTE', 'PARTES', 'PARTICIPACION', 'PARTICIPAN', 'PARTICIPANTES', 'PARTICIPAR', 'PARTICIPARON', 'PARTICULAR', 'PARTICULARES', 'PARTICULAS', 'PARTIDA', 'PARTIDO', 'PARTIDOS', 'PARTIR', 'PARTO', 'PASA', 'PASABA', 'PASABAN', 'PASADO', 'PASAJEROS', 'PASAN', 'PASANDO', 'PASAR', 'PASARIA', 'PASARON', 'PASE', 'PASEO', 'PASO', 'PASO', 'PASOS', 'PASPARTU', 'PASTA', 'PASTELES', 'PASTIZALES', 'PASTO', 'PASTOR', 'PASTOS', 'PATA', 'PATAS', 'PATIO', 'PATO', 'PATOS', 'PATRIA', 'PATRIMONIO', 'PAULA', 'PAZ', 'PAÑUELO', 'PECERA', 'PECES', 'PECHO', 'PEDAZO', 'PEDAZOS', 'PEDIR', 'PEDRO', 'PEGA', 'PEGAMENTO', 'PEGO', 'PELICULA', 'PELIGRO', 'PELIGROS', 'PELIGROSAS', 'PELIGROSO', 'PELO', 'PELOTA', 'PENA', 'PENE', 'PENINSULA', 'PENSA', 'PENSABA', 'PENSABAN', 'PENSADO', 'PENSAMIENTO', 'PENSAMIENTOS', 'PENSANDO', 'PENSAR', 'PENSARON', 'PENSO', 'PEOR', 'PEPE', 'PEQUEÑA', 'PEQUEÑAS', 'PEQUEÑO', 'PEQUEÑOS', 'PERDER', 'PERDIDO', 'PERDIERON', 'PERDIO', 'PERDON', 'PERICO', 'PERIMETRO', 'PERIODICO', 'PERIODICOS', 'PERIODISTA', 'PERIODO', 'PERIODOS', 'PERLAS', 'PERMANENTES', 'PERMISO', 'PERMITE', 'PERMITEN', 'PERMITIDO', 'PERMITIERON', 'PERMITIO', 'PERO', 'PERPENDICULARES', 'PERRITO', 'PERRO', 'PERROS', 'PERSONA', 'PERSONAJE', 'PERSONAJES', 'PERSONAL', 'PERSONALES', 'PERSONAS', 'PERTENECE', 'PERTENECEN', 'PERU', 'PESA', 'PESADO', 'PESADOS', 'PESAN', 'PESAR', 'PESCA', 'PESCADO', 'PESO', 'PESOS', 'PETROLEO', 'PETROLERA', 'PETROLERAS', 'PEZ', 'PICO', 'PIDE', 'PIDELE', 'PIDEN', 'PIDIO', 'PIE', 'PIEDRA', 'PIEDRAS', 'PIEDRITAS', 'PIEL', 'PIELES', 'PIENSA', 'PIENSAN', 'PIENSAS', 'PIENSEN', 'PIENSO', 'PIERDE', 'PIERDEN', 'PIERNA', 'PIERNAS', 'PIES', 'PIEZA', 'PIEZAS', 'PINO', 'PINOCHO', 'PINOS', 'PINTA', 'PINTAR', 'PINTOR', 'PINTURA', 'PINTURAS', 'PIPA', 'PIRAMIDE', 'PIRAMIDES', 'PIRATA', 'PIRATAS', 'PISO', 'PISTA', 'PISTAS', 'PITA', 'PIZARRON', 'PIÑA', 'PLACAS', 'PLAN', 'PLANA', 'PLANAS', 'PLANCHA', 'PLANEACION', 'PLANES', 'PLANETA', 'PLANETAS', 'PLANO', 'PLANOS', 'PLANTA', 'PLANTAS', 'PLASTICO', 'PLASTICOS', 'PLASTILINA', 'PLATA', 'PLATANO', 'PLATICA', 'PLATICAR', 'PLATILLO', 'PLATILLOS', 'PLATIQUEN', 'PLATO', 'PLAYA', 'PLAYAS', 'PLAZA', 'PLIEGO', 'PLOMO', 'PLUMA', 'PLUMAS', 'PLURICELULARES', 'POBLACION', 'POBLACIONES', 'POBLADAS', 'POBLADO', 'POBLADORES', 'POBLADOS', 'POBRE', 'POBRES', 'POBREZA', 'POCA', 'POCAS', 'POCO', 'POCOS', 'PODEMOS', 'PODER', 'PODEROSO', 'PODEROSOS', 'PODIA', 'PODIAN', 'PODIDO', 'PODRA', 'PODRAN', 'PODRAS', 'PODRIA', 'PODRIAN', 'PODRIAS', 'POEMA', 'POEMAS', 'POESIA', 'POETA', 'POLAR', 'POLARES', 'POLEA', 'POLEN', 'POLICIA', 'POLIEDROS', 'POLIGONO', 'POLIGONOS', 'POLITICA', 'POLITICAS', 'POLITICO', 'POLITICOS', 'POLLO', 'POLLOS', 'POLO', 'POLOS', 'POLVO', 'POLVORA', 'PON', 'PONE', 'PONEN', 'PONER', 'PONERSE', 'PONGAN', 'PONIA', 'PONIENDO', 'PONIENTE', 'POPOCATAPETL', 'POPOTE', 'POPULAR', 'POPULARES', 'POR', 'PORCENTAJE', 'PORCENTAJES', 'PORCINO', 'PORFIRIATO', 'PORFIRIO', 'PORQUE', 'PORTUGAL', 'PORTUGUAS', 'PORTUGUESES', 'POSEEN', 'POSIBILIDAD', 'POSIBILIDADES', 'POSIBLE', 'POSIBLES', 'POSICION', 'POSTERIORMENTE', 'POTABLE', 'POTOSI', 'POZO', 'PRACTICA', 'PRACTICA', 'PRACTICAMENTE', 'PRACTICAN', 'PRACTICAR', 'PRACTICAS', 'PRADERAS', 'PRECIO', 'PRECIOS', 'PRECISAMENTE', 'PRECISION', 'PREDOMINAN', 'PREFIEREN', 'PREGUNTA', 'PREGUNTALE', 'PREGUNTAR', 'PREGUNTAS', 'PREGUNTO', 'PREHISPANICA', 'PREMIO', 'PRENDAS', 'PREOCUPADO', 'PREPARA', 'PREPARADO', 'PREPARAN', 'PREPARAR', 'PREPAREN', 'PRESA', 'PRESAS', 'PRESENCIA', 'PRESENTA', 'PRESENTACION', 'PRESENTAN', 'PRESENTAR', 'PRESENTE', 'PRESENTES', 'PRESENTO', 'PRESIDENCIA', 'PRESIDENTE', 'PRESION', 'PREVENCION', 'PREVENIR', 'PRIETO', 'PRIMA', 'PRIMARIA', 'PRIMARIAS', 'PRIMAS', 'PRIMAVERA', 'PRIMER', 'PRIMERA', 'PRIMERAS', 'PRIMERO', 'PRIMEROS', 'PRIMOS', 'PRINCESA', 'PRINCIPAL', 'PRINCIPALES', 'PRINCIPALMENTE', 'PRINCIPE', 'PRINCIPIO', 'PRINCIPIOS', 'PRINCIPITO', 'PRISMA', 'PRISMAS', 'PRIVILEGIOS', 'PROBABILIDAD', 'PROBABLE', 'PROBABLEMENTE', 'PROBAR', 'PROBLEMA', 'PROBLEMAS', 'PROCEDIMIENTO', 'PROCEDIMIENTOS', 'PROCESO', 'PROCESOS', 'PRODUCCION', 'PRODUCE', 'PRODUCEN', 'PRODUCIAN', 'PRODUCIDO', 'PRODUCIR', 'PRODUCTIVAS', 'PRODUCTO', 'PRODUCTOR', 'PRODUCTORES', 'PRODUCTOS', 'PRODUJO', 'PROFESOR', 'PROFUNDAS', 'PROFUNDIDAD', 'PROGRAMA', 'PROGRAMAS', 'PROGRESO', 'PROMEDIO', 'PROMETIO', 'PROMULGO', 'PRONTO', 'PROPIA', 'PROPIAS', 'PROPIEDAD', 'PROPIEDADES', 'PROPIO', 'PROPIOS', 'PROPORCION', 'PROPORCIONA', 'PROPORCIONALES', 'PROPORCIONAN', 'PROPOSITO', 'PROPUSO', 'PROSPERIDAD', 'PROTECCION', 'PROTEGE', 'PROTEGER', 'PROTEGERSE', 'PROTEINAS', 'PROVIENE', 'PROVIENEN', 'PROVOCA', 'PROVOCADO', 'PROVOCAN', 'PROVOCAR', 'PROVOCO', 'PROXIMO', 'PROYECCION', 'PROYECTO', 'PRUEBA', 'PUBLICA', 'PUBLICA', 'PUBLICAS', 'PUBLICO', 'PUBLICO', 'PUBLICOS', 'PUDIERA', 'PUDIERAN', 'PUDIERON', 'PUDISTE', 'PUDO', 'PUEBLA', 'PUEBLO', 'PUEBLOS', 'PUEDA', 'PUEDAN', 'PUEDAS', 'PUEDE', 'PUEDEN', 'PUEDES', 'PUEDO', 'PUENTE', 'PUENTES', 'PUERTA', 'PUERTAS', 'PUERTO', 'PUERTOS', 'PUES', 'PUESTO', 'PUESTOS', 'PULGA', 'PULGADA', 'PULGADAS', 'PULMONES', 'PULSERAS', 'PUNTA', 'PUNTEADA', 'PUNTO', 'PUNTOS', 'PUNTUACION', 'PURA', 'PUSE', 'PUSIERON', 'PUSO', 'QUA', 'QUE', 'QUEDA', 'QUEDADO', 'QUEDAN', 'QUEDAR', 'QUEDARA', 'QUEDARON', 'QUEDARSE', 'QUEDE', 'QUEDEN', 'QUEDO', 'QUERATARO', 'QUEREMOS', 'QUERER', 'QUERIA', 'QUERIAN', 'QUERIDA', 'QUERIDO', 'QUESITOS', 'QUESO', 'QUESOS', 'QUETZALCOATL', 'QUIAN', 'QUIANES', 'QUIEN', 'QUIENES', 'QUIERAN', 'QUIERAS', 'QUIERE', 'QUIEREN', 'QUIERES', 'QUIERO', 'QUIMICA', 'QUIMICOS', 'QUINCE', 'QUINTANA', 'QUINTO', 'QUISIERA', 'QUISO', 'QUITA', 'QUITAR', 'QUIZA', 'QUIZAS', 'RADIO', 'RAICES', 'RAIZ', 'RAMA', 'RAMAS', 'RAMON', 'RANA', 'RANAS', 'RANCHO', 'RAPIDA', 'RAPIDAMENTE', 'RAPIDEZ', 'RAPIDO', 'RAPIDOS', 'RARO', 'RASGOS', 'RATA', 'RATO', 'RATON', 'RATONES', 'RAUL', 'RAYO', 'RAYOS', 'RAZA', 'RAZON', 'RAZONES', 'REAL', 'REALES', 'REALICEN', 'REALIDAD', 'REALIZA', 'REALIZADO', 'REALIZAN', 'REALIZAR', 'REALIZARON', 'REALIZO', 'REALMENTE', 'REBAJADO', 'REBELION', 'RECADO', 'RECETA', 'RECETAS', 'RECIAN', 'RECIBE', 'RECIBEN', 'RECIBIDO', 'RECIBIO', 'RECIBIR', 'RECIPIENTE', 'RECIPIENTES', 'RECOGER', 'RECOJAN', 'RECOLECCION', 'RECOMENDACIONES', 'RECONOCER', 'RECORDAR', 'RECORDARAS', 'RECORRE', 'RECORRER', 'RECORRIDO', 'RECORRIO', 'RECORTA', 'RECORTABLE', 'RECREO', 'RECTA', 'RECTANGULO', 'RECTANGULOS', 'RECTAS', 'RECTOS', 'RECUADRO', 'RECUADROS', 'RECUERDA', 'RECUERDAS', 'RECUERDEN', 'RECUERDO', 'RECUERDOS', 'RECUPERAR', 'RECURSO', 'RECURSOS', 'RED', 'REDACTA', 'REDACTAR', 'REDES', 'REDONDA', 'REDUCIR', 'REELECCION', 'REFIERE', 'REFIEREN', 'REFLEXION', 'REFLEXIONA', 'REFORMA', 'REFRAN', 'REFRANES', 'REFRESCO', 'REFRESCOS', 'REFUGIO', 'REGALO', 'REGAR', 'REGION', 'REGIONES', 'REGISTRA', 'REGISTRAR', 'REGISTRO', 'REGLA', 'REGLAMENTO', 'REGLAS', 'REGRESA', 'REGRESAR', 'REGRESO', 'REGRESO', 'REGULAR', 'REGULARES', 'REINA', 'REINO', 'REINOS', 'RELACION', 'RELACIONA', 'RELACIONADA', 'RELACIONADAS', 'RELACIONADOS', 'RELACIONAN', 'RELACIONES', 'RELATIVAMENTE', 'RELATO', 'RELATOS', 'RELIEVE', 'RELIGION', 'RELIGIONES', 'RELIGIOSA', 'RELIGIOSAS', 'RELIGIOSOS', 'RELOJ', 'RELOJES', 'RENACIMIENTO', 'RENGLON', 'RENOVABLES', 'REPARTIERON', 'REPARTIR', 'REPARTO', 'REPARTOS', 'REPASAR', 'REPASO', 'REPENTE', 'REPETIR', 'REPITE', 'REPORTERO', 'REPRESENTA', 'REPRESENTABAN', 'REPRESENTACION', 'REPRESENTACIONES', 'REPRESENTADO', 'REPRESENTAN', 'REPRESENTANTES', 'REPRESENTAR', 'REPRODUCCION', 'REPRODUCEN', 'REPRODUCIRSE', 'REPTILES', 'REPUBLICA', 'REQUIERE', 'REQUIEREN', 'RESERVAS', 'RESISTENCIA', 'RESISTENTE', 'RESISTIR', 'RESOLVER', 'RESPECTO', 'RESPETAR', 'RESPETO', 'RESPIRACION', 'RESPIRAN', 'RESPIRAR', 'RESPIRATORIO', 'RESPONDE', 'RESPONDER', 'RESPONDIO', 'RESPONSABILIDAD', 'RESPONSABILIDADES', 'RESPUESTA', 'RESPUESTAS', 'RESTA', 'RESTO', 'RESTOS', 'RESUELVE', 'RESULTA', 'RESULTADO', 'RESULTADOS', 'RESULTAN', 'RESULTO', 'RESUMEN', 'RETO', 'RETRATO', 'REUNE', 'REUNETE', 'REUNIERON', 'REUNIO', 'REUNION', 'REVAS', 'REVISA', 'REVISAR', 'REVISEN', 'REVISTAS', 'REVOLUCION', 'REVOLUCIONARIO', 'REVOLUCIONARIOS', 'REY', 'REYES', 'RICA', 'RICARDO', 'RICAS', 'RICO', 'RICOS', 'RIEGO', 'RIESGO', 'RIESGOS', 'RINCON', 'RIO', 'RIOS', 'RIQUEZA', 'RIQUEZAS', 'RITMO', 'ROCA', 'ROCAS', 'ROCIO', 'RODEA', 'RODEADA', 'RODEAN', 'ROJA', 'ROJAS', 'ROJO', 'ROJOS', 'ROMA', 'ROMANO', 'ROMANOS', 'ROMBO', 'ROMBOIDE', 'ROMERO', 'ROMPECABEZAS', 'RONDA', 'ROO', 'ROPA', 'ROSA', 'ROSAS', 'ROSTRO', 'ROTACION', 'RUBAN', 'RUEDA', 'RUEDAS', 'RUIDO', 'RUMBO', 'RURAL', 'RURALES', 'RUSIA', 'RUTA', 'RUTAS', 'SABADO', 'SABANA', 'SABE', 'SABEMOS', 'SABEN', 'SABER', 'SABES', 'SABIA', 'SABIAN', 'SABIAS', 'SABIO', 'SABOR', 'SABROSO', 'SACA', 'SACAR', 'SACERDOTES', 'SACO', 'SACO', 'SAINT', 'SAL', 'SALA', 'SALADA', 'SALE', 'SALEN', 'SALES', 'SALGA', 'SALIA', 'SALIAN', 'SALIDA', 'SALIERON', 'SALIO', 'SALIR', 'SALON', 'SALTAN', 'SALTAR', 'SALTO', 'SALTO', 'SALTOS', 'SALUD', 'SALVADOR', 'SAN', 'SANGRE', 'SANO', 'SANTA', 'SANTIAGO', 'SANTO', 'SAPO', 'SAPOS', 'SASTRE', 'SATALITE', 'SATALITES', 'SATISFACER', 'SEA', 'SEAN', 'SEBASTIAN', 'SECA', 'SECAS', 'SECCION', 'SECCIONES', 'SECO', 'SECOS', 'SECRETO', 'SECRETOS', 'SECTORES', 'SECUNDARIA', 'SECUNDARIAS', 'SED', 'SEDA', 'SEGMENTO', 'SEGMENTOS', 'SEGUIA', 'SEGUIDO', 'SEGUIR', 'SEGUN', 'SEGUNDA', 'SEGUNDO', 'SEGUNDOS', 'SEGURA', 'SEGURAMENTE', 'SEGURIDAD', 'SEGURO', 'SEIS', 'SELVA', 'SELVAS', 'SEMANA', 'SEMANAS', 'SEMBRAR', 'SEMEJANTE', 'SEMEJANTES', 'SEMEJANZAS', 'SEMILLAS', 'SENCILLA', 'SENCILLAS', 'SENCILLO', 'SENCILLOS', 'SENTIA', 'SENTIAN', 'SENTIDO', 'SENTIDOS', 'SENTIMIENTOS', 'SENTIR', 'SENTO', 'SEP', 'SEPAN', 'SEPARA', 'SEPARACION', 'SEPARADOS', 'SEPARAR', 'SEPAS', 'SEPTIEMBRE', 'SEQUIAS', 'SER', 'SERA', 'SERAN', 'SERES', 'SERGIO', 'SERIA', 'SERIAN', 'SERIE', 'SERIES', 'SERIO', 'SERPIENTE', 'SERPIENTES', 'SERVANDO', 'SERVICIO', 'SERVICIOS', 'SERVIR', 'SERVIRAN', 'SESENTA', 'SEXO', 'SEXTO', 'SEXUAL', 'SEXUALES', 'SEÑALA', 'SEÑALAN', 'SEÑALES', 'SEÑOR', 'SEÑORA', 'SEÑORAS', 'SEÑORES', 'SEÑORIO', 'SEÑORIOS', 'SEÑORITA', 'SIDO', 'SIEMBRA', 'SIEMPRE', 'SIENDO', 'SIENTE', 'SIENTES', 'SIERRA', 'SIERRAS', 'SIETE', 'SIGAN', 'SIGLO', 'SIGLOS', 'SIGNIFICA', 'SIGNIFICADO', 'SIGNIFICADOS', 'SIGNIFICAN', 'SIGNO', 'SIGNOS', 'SIGUE', 'SIGUEN', 'SIGUIENDO', 'SIGUIENTE', 'SIGUIENTES', 'SIGUIERON', 'SIGUIO', 'SILABA', 'SILABAS', 'SILBATO', 'SILENCIO', 'SILVESTRES', 'SIMBOLO', 'SIMBOLOGIA', 'SIMBOLOS', 'SIMETRIA', 'SIMILAR', 'SIMPLE', 'SIMPLES', 'SIN', 'SINALOA', 'SINO', 'SINTIO', 'SIQUIERA', 'SIRVE', 'SIRVEN', 'SISTEMA', 'SISTEMAS', 'SITIO', 'SITIOS', 'SITUACION', 'SITUACIONES', 'SOBRA', 'SOBRAN', 'SOBRARON', 'SOBRE', 'SOBRES', 'SOBREVIVIR', 'SOBRO', 'SOCIAL', 'SOCIALES', 'SOCIEDAD', 'SOCIEDADES', 'SOFIA', 'SOL', 'SOLA', 'SOLAMENTE', 'SOLAR', 'SOLARES', 'SOLDADO', 'SOLDADOS', 'SOLIDA', 'SOLIDO', 'SOLIDOS', 'SOLO', 'SOLO', 'SOLUCION', 'SOLUCIONES', 'SOMBRA', 'SOMBRAS', 'SOMBRERO', 'SOMOS', 'SON', 'SONIA', 'SONIDO', 'SONIDOS', 'SONORA', 'SOPA', 'SOPLA', 'SOR', 'SORGO', 'SORPRESA', 'SOSTENER', 'SOY', 'SUAREZ', 'SUATER', 'SUAVE', 'SUBE', 'SUBIO', 'SUBIR', 'SUBMARINO', 'SUBMARINOS', 'SUBRAYA', 'SUBRAYADAS', 'SUBSTANCIAS', 'SUBSUELO', 'SUBTEMAS', 'SUBTITULO', 'SUCEDE', 'SUCEDIA', 'SUCEDIDO', 'SUCEDIO', 'SUCESO', 'SUCESOS', 'SUELE', 'SUELEN', 'SUELO', 'SUENA', 'SUERTE', 'SUEÑO', 'SUEÑOS', 'SUFICIENTE', 'SUFICIENTES', 'SUFRIR', 'SUGERENCIAS', 'SUIZA', 'SUJETO', 'SUMA', 'SUMAR', 'SUMAS', 'SUPERFICIE', 'SUPERFICIES', 'SUPERIOR', 'SUPERIORES', 'SUPERMERCADO', 'SUPO', 'SUR', 'SURESTE', 'SURGIERON', 'SUS', 'SUSTANCIA', 'SUSTANCIAS', 'SUSTITUIR', 'SUSTO', 'SUYO', 'TABACO', 'TABASCO', 'TABLA', 'TABLAS', 'TABLERO', 'TACHA', 'TACNICA', 'TACNICAS', 'TACNICOS', 'TACO', 'TACOS', 'TAIGA', 'TAJIN', 'TAL', 'TALA', 'TALES', 'TALLER', 'TALLERES', 'TALLO', 'TALLOS', 'TAMAULIPAS', 'TAMAÑO', 'TAMAÑOS', 'TAMBIAN', 'TAMPICO', 'TAMPOCO', 'TAN', 'TANGRAM', 'TANIA', 'TANQUE', 'TANTA', 'TANTAS', 'TANTO', 'TANTOS', 'TAPA', 'TAPAS', 'TARAHUMARA', 'TARDA', 'TARDE', 'TARDES', 'TARDO', 'TAREA', 'TAREAS', 'TARJETA', 'TARJETAS', 'TAXCO', 'TAZA', 'TAZAS', 'TEATRO', 'TECHO', 'TECHOS', 'TECNOLOGIA', 'TECNOLOGIAS', 'TEJADA', 'TEJEDOR', 'TEJIDO', 'TEJIDOS', 'TELA', 'TELAFONO', 'TELAGRAFO', 'TELAS', 'TELEGRAMA', 'TELESCOPIO', 'TELEVISION', 'TELON', 'TEMA', 'TEMAS', 'TEMBLOR', 'TEMBLORES', 'TEMOR', 'TEMPERATURA', 'TEMPERATURAS', 'TEMPLADO', 'TEMPLADOS', 'TEMPLO', 'TEMPLOS', 'TEMPORADA', 'TEMPORAL', 'TEMPRANO', 'TEN', 'TENDRA', 'TENDRAN', 'TENDRAS', 'TENDRIA', 'TENEMOS', 'TENER', 'TENGA', 'TENGAN', 'TENGAS', 'TENGO', 'TENIA', 'TENIAN', 'TENIDO', 'TENOCHTITLAN', 'TEO', 'TEOTIHUACAN', 'TEQUILA', 'TERCER', 'TERCERA', 'TERCERO', 'TERCIARIAS', 'TERESA', 'TERMINA', 'TERMINADO', 'TERMINAN', 'TERMINAR', 'TERMINEN', 'TERMINES', 'TERMINO', 'TERMOMETRO', 'TERRAQUEO', 'TERREMOTO', 'TERREMOTOS', 'TERRENO', 'TERRENOS', 'TERRESTRE', 'TERRESTRES', 'TERRIBLE', 'TERRIBLES', 'TERRITORIO', 'TERRITORIOS', 'TERROR', 'TESEO', 'TESORO', 'TESOROS', 'TESTICULOS', 'TESTIMONIOS', 'TEXAS', 'TEXTO', 'TEXTOS', 'TIA', 'TIBURON', 'TIEMPO', 'TIEMPOS', 'TIENDA', 'TIENDAS', 'TIENE', 'TIENEN', 'TIENES', 'TIERRA', 'TIERRAS', 'TIGRE', 'TIJERAS', 'TINTA', 'TIO', 'TIOS', 'TIPO', 'TIPOS', 'TIRA', 'TIRAR', 'TIRAS', 'TIRO', 'TITERES', 'TITULO', 'TITULOS', 'TLACUACHE', 'TLAXCALA', 'TOCA', 'TOCAN', 'TOCAR', 'TOCARON', 'TOCO', 'TODA', 'TODAS', 'TODAVIA', 'TODO', 'TODOS', 'TOLTECAS', 'TOMA', 'TOMA', 'TOMADO', 'TOMAN', 'TOMANDO', 'TOMAR', 'TOMARON', 'TOMAS', 'TOMEN', 'TOMO', 'TOMO', 'TONATIUH', 'TONELADAS', 'TONICA', 'TOQUE', 'TORMENTA', 'TORNO', 'TORRE', 'TORRES', 'TORTAS', 'TORTILLAS', 'TORTUGA', 'TORTUGAS', 'TOS', 'TOTAL', 'TOTALMENTE', 'TOÑO', 'TRABAJA', 'TRABAJABAN', 'TRABAJADORES', 'TRABAJAN', 'TRABAJANDO', 'TRABAJAR', 'TRABAJEMOS', 'TRABAJO', 'TRABAJOS', 'TRADICION', 'TRADICIONAL', 'TRADICIONALES', 'TRADICIONES', 'TRAE', 'TRAIGO', 'TRAJE', 'TRAJERON', 'TRAJES', 'TRAJO', 'TRAMO', 'TRANQUILO', 'TRANSFORMA', 'TRANSFORMACION', 'TRANSFORMACIONES', 'TRANSFORMADO', 'TRANSFORMAR', 'TRANSMISION', 'TRANSMITE', 'TRANSMITEN', 'TRANSMITIR', 'TRANSPARENTE', 'TRANSPARENTES', 'TRANSPORTAR', 'TRANSPORTE', 'TRANSPORTES', 'TRAPECIO', 'TRAPECIOS', 'TRAPO', 'TRAS', 'TRASLACION', 'TRASPLANTE', 'TRATA', 'TRATABA', 'TRATADO', 'TRATAMIENTO', 'TRATAN', 'TRATAR', 'TRATEN', 'TRATO', 'TRATOS', 'TRAVAS', 'TRAYECTO', 'TRAZA', 'TRAZAR', 'TRECE', 'TREINTA', 'TREN', 'TRES', 'TRIANGULO', 'TRIANGULOS', 'TRIBUS', 'TRIBUTOS', 'TRIGO', 'TRISTE', 'TRISTEZA', 'TRIUNFO', 'TRONCO', 'TRONCOS', 'TRONO', 'TROPAS', 'TROPICAL', 'TROPICALES', 'TROPICO', 'TROZO', 'TROZOS', 'TRUENO', 'TRUENOS', 'TUBO', 'TUERTO', 'TULA', 'TUMBAS', 'TUNAS', 'TUNDRA', 'TURISMO', 'TURNO', 'TURNOS', 'TUS', 'TUVE', 'TUVIERA', 'TUVIERON', 'TUVO', 'TUXPAN', 'UBICA', 'UBICACION', 'UBICAR', 'ULTIMA', 'ULTIMAS', 'ULTIMO', 'ULTIMOS', 'UNA', 'UNAS', 'UNE', 'UNEN', 'UNICA', 'UNICAMENTE', 'UNICO', 'UNIDAD', 'UNIDADES', 'UNIDAS', 'UNIDO', 'UNIDOS', 'UNIERON', 'UNION', 'UNIR', 'UNIVERSAL', 'UNIVERSIDAD', 'UNIVERSIDADES', 'UNIVERSO', 'UNO', 'UNOS', 'URBANA', 'URBANAS', 'URBANO', 'URUGUAY', 'USA', 'USABA', 'USABAN', 'USAMOS', 'USAN', 'USANDO', 'USAR', 'USARON', 'USARSE', 'USAS', 'USASTE', 'USO', 'USO', 'USOS', 'USTED', 'USTEDES', 'UTERO', 'UTIL', 'UTILES', 'UTILICEN', 'UTILIDAD', 'UTILIZA', 'UTILIZABAN', 'UTILIZADO', 'UTILIZADOS', 'UTILIZAMOS', 'UTILIZAN', 'UTILIZANDO', 'UTILIZAR', 'UTILIZARON', 'UTILIZARSE', 'UTILIZASTE', 'UTILIZO', 'UÑAS', 'VACA', 'VACACIONES', 'VACAS', 'VACIA', 'VACIO', 'VACUNAS', 'VAGINA', 'VALE', 'VALIENTE', 'VALLADOLID', 'VALLE', 'VALLES', 'VALOR', 'VALORES', 'VAMOS', 'VAN', 'VAPOR', 'VARA', 'VARIA', 'VARIADO', 'VARIAS', 'VARIEDAD', 'VARIEDADES', 'VARIOS', 'VARTICES', 'VAS', 'VASCONCELOS', 'VASO', 'VASOS', 'VAYA', 'VAYAN', 'VEA', 'VEAN', 'VEAS', 'VECES', 'VECINOS', 'VEGETACION', 'VEGETAL', 'VEGETALES', 'VEHICULO', 'VEHICULOS', 'VEIA', 'VEIAN', 'VEINTE', 'VELA', 'VELAS', 'VELOCIDAD', 'VELOZ', 'VEMOS', 'VEN', 'VENADO', 'VENCER', 'VENDE', 'VENDEN', 'VENDER', 'VENDIO', 'VENEZUELA', 'VENIA', 'VENIAN', 'VENIR', 'VENTA', 'VENTAJA', 'VENTAJAS', 'VENTANA', 'VENTANAS', 'VENUS', 'VENUSTIANO', 'VEO', 'VER', 'VERACRUZ', 'VERANO', 'VERAS', 'VERBO', 'VERBOS', 'VERDAD', 'VERDADERO', 'VERDE', 'VERDES', 'VERDURAS', 'VERIFICA', 'VERLO', 'VERSE', 'VERSION', 'VERSOS', 'VERTEBRADOS', 'VERTICAL', 'VERTICALES', 'VES', 'VESTIDO', 'VESTIDOS', 'VESTIR', 'VEZ', 'VIA', 'VIAJA', 'VIAJAN', 'VIAJAR', 'VIAJE', 'VIAJERO', 'VIAJEROS', 'VIAJES', 'VIAS', 'VICENTE', 'VICTORIA', 'VICTORIANO', 'VIDA', 'VIDRIO', 'VIEJA', 'VIEJAS', 'VIEJITO', 'VIEJO', 'VIEJOS', 'VIENDO', 'VIENE', 'VIENEN', 'VIENTO', 'VIENTOS', 'VIERNES', 'VIERON', 'VILLA', 'VIMOS', 'VINO', 'VIO', 'VIOLENCIA', 'VIRGINIA', 'VIRREINAL', 'VIRREINATO', 'VIRREY', 'VISITA', 'VISITAR', 'VISTA', 'VISTE', 'VISTO', 'VIVA', 'VIVE', 'VIVEN', 'VIVES', 'VIVIA', 'VIVIAN', 'VIVIENDA', 'VIVIENDAS', 'VIVIERON', 'VIVIMOS', 'VIVIO', 'VIVIR', 'VIVO', 'VIVOS', 'VOCES', 'VOLANDO', 'VOLAR', 'VOLCAN', 'VOLCANES', 'VOLO', 'VOLUMEN', 'VOLUNTAD', 'VOLVER', 'VOLVIERON', 'VOLVIO', 'VOTOS', 'VOY', 'VOZ', 'VUELO', 'VUELTA', 'VUELTAS', 'VUELVE', 'VUELVEN', 'XOCHITL', 'YACIMIENTOS', 'YESO', 'YOATZIN', 'YORK', 'YUCATAN', 'ZACATECAS', 'ZAPATA', 'ZAPATOS', 'ZELANDIA', 'ZOCALO', 'ZONA', 'ZONAS', 'ZOOLOGICO', 'ZORRA', 'ZORRO']
dataDibujos = ['''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
          \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
      |   \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
     /|   \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
     /|\\  \033[33;1m|\033[0m
          \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
     /|\\  \033[33;1m|\033[0m
     /    \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m''',
           '''\033[1;35m
      \033[31;1m+\033[0m\033[33;1m-\033[0m\033[31;1m-\033[0m\033[33;1m-\033[0m\033[31;1m+\033[0m
      \033[33;1m|\033[0m   \033[33;1m|\033[0m
      O   \033[31;1m|\033[0m
     /|\\  \033[33;1m|\033[0m
     / \\  \033[31;1m|\033[0m
          \033[33;1m|\033[0m
    \033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\033[33;1m=\033[0m\033[31;1m=\033[0m\n \033[1;35mU L T I M O   I N T E N T O\033[0m''']
