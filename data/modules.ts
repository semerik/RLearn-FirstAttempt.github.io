import type { Module } from '~/types'

export const MODULES: Module[] = [
  {
    id: 'mod1',
    num: '01',
    name: 'Introducción a R y entorno',
    description: 'Primer contacto con R, la consola, los scripts y los objetos básicos del lenguaje.',
    topics: [
      {
        id: 'descripcion',
        name: 'Descripción del módulo y comandos base',
        theory: `
          <p>Este módulo te lleva desde la primera ejecución de código hasta la creación de objetos simples. La idea es que el usuario pueda abrir R o RStudio, escribir instrucciones, ejecutar resultados y entender qué está pasando en la consola.</p>
          <p>Si tu interfaz selecciona el primer tema al hacer click en un módulo, este bloque funciona como la pantalla inicial del módulo: resume el objetivo general y presenta los comandos que aparecerán con más frecuencia.</p>
          <p><strong>Comandos y palabras clave que usarás aquí:</strong></p>
          <ul style="padding-left:20px;line-height:2.1;margin:10px 0">
            <li><code class="inline">print()</code> — muestra resultados en consola de forma explícita.</li>
            <li><code class="inline">cat()</code> — imprime texto concatenado, útil para mensajes más limpios.</li>
            <li><code class="inline">c()</code> — combina valores en un vector.</li>
            <li><code class="inline">class()</code> — indica la clase de un objeto.</li>
            <li><code class="inline">help()</code> y <code class="inline">?</code> — abren la ayuda de una función o tema.</li>
            <li><code class="inline">getwd()</code> y <code class="inline">setwd()</code> — consultan y cambian el directorio de trabajo.</li>
            <li><code class="inline">ls()</code> y <code class="inline">rm()</code> — listan y eliminan objetos del entorno.</li>
          </ul>
          <div class="note-box">En R, todo lo que escribes en consola se evalúa de arriba hacia abajo. Primero se crea el objeto, luego se puede imprimir, revisar o reutilizar en otros cálculos.</div>
        `,
        exercises: [
          {
            id: 'e1_1',
            title: 'Primer mensaje en consola',
            description: 'Escribe una instrucción que imprima exactamente <code class="inline">"Bienvenido a R"</code> usando <code class="inline">print()</code>.',
            expected: '[1] "Bienvenido a R"',
            hint: 'print("Bienvenido a R")',
          },
          {
            id: 'e1_2',
            title: 'Texto concatenado',
            description: 'Usa <code class="inline">cat()</code> para mostrar en una sola línea el texto <code class="inline">Aprender R es útil</code>.',
            expected: 'Aprender R es útil',
            hint: 'cat("Aprender", "R", "es", "útil")',
          },
        ],
      },
      {
        id: 'entorno',
        name: 'Entorno de trabajo, consola y scripts',
        theory: `
          <p>R distingue entre la consola, donde ejecutas instrucciones inmediatas, y los scripts, donde guardas código reutilizable. Trabajar con scripts ayuda a organizar ejercicios, repetir análisis y mantener un historial limpio.</p>
          <pre class="code-block"># Comentarios: no se ejecutan
x &lt;- 10
y &lt;- 5
print(x + y)</pre>
          <p>Los comentarios empiezan con <code class="inline">#</code>. Son útiles para explicar una línea, dividir secciones o dejar notas para más adelante. El operador <code class="inline">&lt;-</code> crea y asigna objetos.</p>
          <p>Una rutina básica de trabajo es: abrir el entorno, revisar <code class="inline">getwd()</code>, guardar tu script, ejecutar una sección y verificar el resultado en consola.</p>
          <div class="note-box">Un buen hábito en R es escribir código corto, legible y dividido por pasos. Eso hace más fácil depurar errores y volver a ejecutar análisis completos.</div>
        `,
        exercises: [
          {
            id: 'e1_3',
            title: 'Suma en consola',
            description: 'Crea las variables <code class="inline">a &lt;- 12</code> y <code class="inline">b &lt;- 8</code>. Luego imprime su suma.',
            expected: '[1] 20',
            hint: 'a <- 12; b <- 8; print(a + b)',
          },
          {
            id: 'e1_4',
            title: 'Restar y multiplicar',
            description: 'Crea <code class="inline">masa &lt;- 25</code> y <code class="inline">factor &lt;- 4</code>. Imprime el resultado de <code class="inline">masa * factor</code>.',
            expected: '[1] 100',
            hint: 'masa <- 25; factor <- 4; print(masa * factor)',
          },
        ],
      },
      {
        id: 'objetos',
        name: 'Objetos, tipos de datos y operadores',
        theory: `
          <p>En R todo se guarda en objetos. Los objetos más básicos suelen ser numéricos, enteros, texto o lógicos. Cada tipo permite distintas operaciones y R puede convertirlos automáticamente cuando es necesario.</p>
          <pre class="code-block">numero &lt;- 3.14
entero &lt;- 5L
texto &lt;- "química"
logico &lt;- TRUE

class(numero)
class(entero)
class(texto)
class(logico)</pre>
          <p>Operadores importantes: <code class="inline">+</code>, <code class="inline">-</code>, <code class="inline">*</code>, <code class="inline">/</code>, <code class="inline">^</code>, <code class="inline">&lt;-</code> para asignar y <code class="inline">==</code> para comparar. En esta etapa también conviene diferenciar entre creación de objetos y resultado de una operación.</p>
          <div class="note-box">Si mezclas tipos incompatibles, R suele convertir todo al tipo más general. Por ejemplo, un vector con números y texto termina como carácter.</div>
        `,
        exercises: [
          {
            id: 'e1_5',
            title: 'Identifica la clase',
            description: 'Crea <code class="inline">x &lt;- 12.5</code> e imprime su clase con <code class="inline">class()</code>.',
            expected: '[1] "numeric"',
            hint: 'x <- 12.5; print(class(x))',
          },
          {
            id: 'e1_6',
            title: 'Tipo lógico',
            description: 'Crea <code class="inline">es_solido &lt;- FALSE</code> e imprime su clase.',
            expected: '[1] "logical"',
            hint: 'es_solido <- FALSE; print(class(es_solido))',
          },
        ],
      },
      {
        id: 'calculos',
        name: 'Primeras operaciones matemáticas',
        theory: `
          <p>R fue diseñado para trabajar con datos numéricos de forma natural. Sus funciones básicas permiten resumir, medir y transformar valores sin necesidad de escribir lógica compleja.</p>
          <pre class="code-block">valores &lt;- c(2, 4, 6, 8, 10)
abs(-7)
sum(valores)
mean(valores)
length(valores)
round(3.14159, 2)
seq(1, 5)
rep(3, times = 4)</pre>
          <p>Las funciones <code class="inline">sum()</code>, <code class="inline">mean()</code> y <code class="inline">length()</code> aparecen en casi cualquier análisis. <code class="inline">abs()</code> sirve para convertir un valor negativo en positivo, <code class="inline">seq()</code> crea secuencias y <code class="inline">rep()</code> repite valores.</p>
          <div class="note-box">Cuando trabajes con datos experimentales, estas funciones te ayudan a revisar rápidamente magnitudes, promedios y tamaños de muestra.</div>
        `,
        exercises: [
          {
            id: 'e1_7',
            title: 'Promedio simple',
            description: 'Crea el vector <code class="inline">c(2, 4, 6, 8)</code> y calcula su promedio con <code class="inline">mean()</code>.',
            expected: '[1] 5',
            hint: 'datos <- c(2,4,6,8); print(mean(datos))',
          },
          {
            id: 'e1_8',
            title: 'Cantidad de elementos',
            description: 'Crea el vector <code class="inline">c("Na", "K", "Ca")</code> e imprime su longitud con <code class="inline">length()</code>.',
            expected: '[1] 3',
            hint: 'elementos <- c("Na", "K", "Ca"); print(length(elementos))',
          },
        ],
      },
      {
        id: 'ayuda',
        name: 'Ayuda, documentación y buenas prácticas',
        theory: `
          <p>Aprender a consultar la ayuda es tan importante como aprender a escribir código. R trae documentación integrada y cada función puede explorarse desde la consola sin salir del entorno.</p>
          <pre class="code-block">?sum
help(mean)
example(mean)</pre>
          <p>Además, conviene seguir algunas reglas simples: nombres descriptivos, una sola tarea por bloque, comentarios breves y uso consistente de espacios. Es mejor escribir <code class="inline">masa_molar</code> que <code class="inline">mm</code>, porque así el código se entiende más rápido.</p>
          <div class="note-box">Las buenas prácticas no cambian el resultado, pero sí reducen errores y hacen que tu trabajo sea mucho más fácil de revisar y ampliar.</div>
        `,
        exercises: [
          {
            id: 'e1_9',
            title: 'Usa un nombre descriptivo',
            description: 'Crea <code class="inline">masa_molar_nacl &lt;- 58.44</code> e imprime el valor.',
            expected: '[1] 58.44',
            hint: 'masa_molar_nacl <- 58.44; print(masa_molar_nacl)',
          },
          {
            id: 'e1_10',
            title: 'Redondeo inicial',
            description: 'Calcula <code class="inline">round(7/3, 2)</code> e imprímelo.',
            expected: '[1] 2.33',
            hint: 'print(round(7/3, 2))',
          },
        ],
      },
    ],
  },
  {
    id: 'mod2',
    num: '02',
    name: 'Fundamentos del lenguaje',
    description: 'Vectores, matrices, listas, factores, texto y funciones propias en R.',
    topics: [
      {
        id: 'base',
        name: 'Palabras reservadas y funciones fundamentales',
        theory: `
          <p>En este módulo vas a usar muchas funciones básicas que ya vienen con R. También aparecen palabras reservadas y estructuras sintácticas que forman parte del lenguaje. Entenderlas desde el inicio evita confusiones cuando el código crezca.</p>
          <p><strong>Palabras reservadas y funciones que se usarán con frecuencia:</strong></p>
          <ul style="padding-left:20px;line-height:2.1;margin:10px 0">
            <li><code class="inline">TRUE</code>, <code class="inline">FALSE</code> y <code class="inline">NA</code> — valores lógicos y faltantes.</li>
            <li><code class="inline">NULL</code> — representa ausencia de objeto.</li>
            <li><code class="inline">c()</code> — une valores en un vector.</li>
            <li><code class="inline">sum()</code> — suma valores numéricos.</li>
            <li><code class="inline">mean()</code> — calcula el promedio.</li>
            <li><code class="inline">length()</code> — cuenta elementos.</li>
            <li><code class="inline">abs()</code> — devuelve el valor absoluto.</li>
            <li><code class="inline">seq()</code> y <code class="inline">rep()</code> — crean secuencias y repeticiones.</li>
          </ul>
          <div class="note-box">Estas funciones aparecen una y otra vez porque son la base para construir ejemplos, pruebas rápidas y análisis numéricos más grandes.</div>
        `,
        exercises: [
          {
            id: 'e2_1',
            title: 'Suma de valores',
            description: 'Crea <code class="inline">v &lt;- c(1, 2, 3, 4)</code> e imprime la suma total.',
            expected: '[1] 10',
            hint: 'v <- c(1,2,3,4); print(sum(v))',
          },
          {
            id: 'e2_2',
            title: 'Valor absoluto',
            description: 'Imprime el valor absoluto de <code class="inline">-14</code> usando <code class="inline">abs()</code>.',
            expected: '[1] 14',
            hint: 'print(abs(-14))',
          },
        ],
      },
      {
        id: 'vectores',
        name: 'Vectores, coerción e indexación',
        theory: `
          <p>El vector es la estructura más importante de R. Todo lo que no sea un objeto complejo termina comportándose como un vector o como una colección de vectores. Cuando mezclas tipos distintos en un mismo vector, R los convierte al tipo más general.</p>
          <pre class="code-block">v1 &lt;- c(1, 2, 3)
v2 &lt;- c("a", "b", "c")
mezcla &lt;- c(1, "a")   # se convierte en character

v1[2]
v1[c(1, 3)]
v1[v1 &gt; 1]</pre>
          <p>La indexación te permite seleccionar por posición, por nombre o por condición lógica. Eso hace posible filtrar datos sin escribir bucles manuales.</p>
          <div class="note-box">Si un vector contiene texto, números y lógicos al mismo tiempo, normalmente terminará convertido en texto. A eso se le llama coerción implícita.</div>
        `,
        exercises: [
          {
            id: 'e2_3',
            title: 'Crear un vector',
            description: 'Crea el vector <code class="inline">c(5, 10, 15, 20)</code> e imprime su segundo elemento.',
            expected: '[1] 10',
            hint: 'v <- c(5,10,15,20); print(v[2])',
          },
          {
            id: 'e2_4',
            title: 'Filtrar por condición',
            description: 'Con el vector <code class="inline">c(2, 8, 1, 9, 4)</code>, imprime solo los valores mayores que 5.',
            expected: '[1] 8 9',
            hint: 'v <- c(2,8,1,9,4); print(v[v > 5])',
          },
        ],
      },
      {
        id: 'estructuras',
        name: 'Matrices, arreglos y listas',
        theory: `
          <p>Las matrices son vectores con dimensión. En una matriz cada elemento tiene una fila y una columna, por lo que puedes organizar datos numéricos de forma tabular sin recurrir todavía a data frames.</p>
          <pre class="code-block">M &lt;- matrix(1:9, nrow = 3, ncol = 3)
M[1, 3]
t(M)

lista &lt;- list(nombre = "NaCl", masa = 58.44, soluble = TRUE)
lista$nombre
lista[[2]]</pre>
          <p>Las listas son más flexibles que los vectores porque pueden guardar objetos de distinto tipo: números, texto, vectores y hasta otras listas. Son útiles para guardar resultados intermedios o colecciones heterogéneas.</p>
          <div class="note-box">Cuando necesites mezclar tipos diferentes sin perder información, usa listas. Cuando quieras hacer operaciones numéricas masivas, usa vectores o matrices.</div>
        `,
        exercises: [
          {
            id: 'e2_5',
            title: 'Matriz 2x2',
            description: 'Crea una matriz con los valores <code class="inline">1:4</code> usando <code class="inline">nrow = 2</code>. Imprime el elemento de la fila 2, columna 1.',
            expected: '[1] 2',
            hint: 'M <- matrix(1:4, nrow = 2); print(M[2,1])',
          },
          {
            id: 'e2_6',
            title: 'Acceso a lista',
            description: 'Crea una lista con <code class="inline">nombre = "agua"</code> y <code class="inline">pH = 7</code>. Imprime el valor de <code class="inline">pH</code>.',
            expected: '[1] 7',
            hint: 'x <- list(nombre = "agua", pH = 7); print(x$pH)',
          },
        ],
      },
      {
        id: 'texto',
        name: 'Factores, texto y fechas',
        theory: `
          <p>R también trabaja con variables categóricas, texto y fechas. Los factores ayudan a representar categorías con un conjunto fijo de niveles; las cadenas permiten manejar nombres, etiquetas y resultados; y las fechas facilitan el análisis temporal.</p>
          <pre class="code-block">tipo &lt;- factor(c("ácido", "base", "ácido"))
texto &lt;- paste("R", "y", "química")
fecha &lt;- as.Date("2026-04-24")

levels(tipo)
substr("analítica", 1, 4)
format(fecha, "%d/%m/%Y")</pre>
          <p>Funciones útiles aquí: <code class="inline">paste()</code>, <code class="inline">toupper()</code>, <code class="inline">tolower()</code>, <code class="inline">nchar()</code>, <code class="inline">substr()</code>, <code class="inline">as.Date()</code> y <code class="inline">format()</code>.</p>
          <div class="note-box">En datos reales, texto y fechas suelen necesitar limpieza antes del análisis. Aprender estas funciones te ahorra muchos errores de importación y comparación.</div>
        `,
        exercises: [
          {
            id: 'e2_7',
            title: 'Concatenar texto',
            description: 'Usa <code class="inline">paste()</code> para formar el texto <code class="inline">"R es potente"</code>.',
            expected: '[1] "R es potente"',
            hint: 'print(paste("R", "es", "potente"))',
          },
          {
            id: 'e2_8',
            title: 'Longitud de una cadena',
            description: 'Imprime la cantidad de caracteres de <code class="inline">"química"</code> con <code class="inline">nchar()</code>.',
            expected: '[1] 7',
            hint: 'print(nchar("química"))',
          },
        ],
      },
      {
        id: 'funciones',
        name: 'Funciones propias y depuración básica',
        theory: `
          <p>Las funciones te permiten convertir un bloque de instrucciones en una herramienta reutilizable. Una buena función recibe argumentos, hace un cálculo y devuelve un resultado claro.</p>
          <pre class="code-block">promedio_2 <- function(a, b) {
  resultado <- (a + b) / 2
  return(resultado)
}

media_segura <- function(x) {
  if (length(x) == 0) {
    stop("El vector está vacío")
  }
  mean(x)
}</pre>
          <p>En una función puedes usar <code class="inline">return()</code> para devolver un resultado explícito y <code class="inline">stop()</code> para frenar la ejecución cuando algo no tiene sentido.</p>
          <div class="note-box">Una función bien escrita evita repetir código, mejora la lectura y hace que los ejercicios grandes sean mucho más fáciles de mantener.</div>
        `,
        exercises: [
          {
            id: 'e2_9',
            title: 'Promedio de dos valores',
            description: 'Crea <code class="inline">promedio_2</code> para devolver el promedio de dos números. Prueba con <code class="inline">promedio_2(10, 6)</code>.',
            expected: '[1] 8',
            hint: 'promedio_2 <- function(a, b){ (a + b) / 2 }; print(promedio_2(10, 6))',
          },
          {
            id: 'e2_10',
            title: 'Función de valor absoluto',
            description: 'Crea una función <code class="inline">mi_abs(x)</code> que devuelva el valor absoluto de <code class="inline">x</code>. Pruébala con <code class="inline">-9</code>.',
            expected: '[1] 9',
            hint: 'mi_abs <- function(x){ abs(x) }; print(mi_abs(-9))',
          },
        ],
      },
    ],
  },
  {
    id: 'mod3',
    num: '03',
    name: 'Control de flujo',
    description: 'Decisiones, ciclos y control de ejecución para resolver problemas paso a paso.',
    topics: [
      {
        id: 'reservadas',
        name: 'Palabras reservadas del control de flujo',
        theory: `
          <p>El control de flujo permite que un programa tome decisiones, repita procesos o corte la ejecución cuando sea necesario. En este módulo vas a usar estructuras que ya forman parte del lenguaje, así que conviene reconocerlas bien desde el inicio.</p>
          <p><strong>Palabras reservadas y comandos principales:</strong></p>
          <ul style="padding-left:20px;line-height:2.1;margin:10px 0">
            <li><code class="inline">if</code> y <code class="inline">else</code> — ejecutan bloques distintos según una condición.</li>
            <li><code class="inline">for</code> — repite una tarea recorriendo una secuencia.</li>
            <li><code class="inline">while</code> — repite mientras una condición siga siendo verdadera.</li>
            <li><code class="inline">repeat</code> — repite indefinidamente hasta que uses <code class="inline">break</code>.</li>
            <li><code class="inline">break</code> — detiene un bucle.</li>
            <li><code class="inline">next</code> — salta a la siguiente iteración.</li>
            <li><code class="inline">switch()</code> — elige entre varias opciones.</li>
            <li><code class="inline">return()</code> — devuelve un resultado dentro de una función.</li>
          </ul>
          <div class="note-box">En control de flujo, la claridad es fundamental: una condición bien escrita vale más que varias líneas difíciles de seguir.</div>
        `,
        exercises: [
          {
            id: 'e3_1',
            title: 'Reconoce una condición',
            description: 'Escribe una condición que imprima <code class="inline">"Aprobado"</code> cuando <code class="inline">nota &gt;= 7</code>. Usa una variable llamada <code class="inline">nota</code> con valor 8.',
            expected: '[1] "Aprobado"',
            hint: 'nota <- 8; if (nota >= 7) { print("Aprobado") }',
          },
          {
            id: 'e3_2',
            title: 'Estructura básica',
            description: 'Crea una instrucción <code class="inline">if/else</code> que imprima <code class="inline">"Par"</code> cuando <code class="inline">n = 4</code> y <code class="inline">"Impar"</code> en caso contrario.',
            expected: '[1] "Par"',
            hint: 'n <- 4; if (n %% 2 == 0) { print("Par") } else { print("Impar") }',
          },
        ],
      },
      {
        id: 'condicionales',
        name: 'Condicionales y decisiones',
        theory: `
          <p>Las condiciones permiten clasificar datos según rangos, estados o reglas. La estructura <code class="inline">if</code> evalúa una sola condición, mientras que <code class="inline">if else</code> y <code class="inline">ifelse()</code> sirven para construir decisiones más completas.</p>
          <pre class="code-block">pH &lt;- 3.2

if (pH &lt; 7) {
  print("Ácido")
} else if (pH == 7) {
  print("Neutro")
} else {
  print("Básico")
}

temperaturas &lt;- c(-5, 10, 25)
ifelse(temperaturas &gt; 20, "calor", "normal")</pre>
          <p>Operadores comparativos como <code class="inline">==</code>, <code class="inline">!=</code>, <code class="inline">&lt;</code>, <code class="inline">&gt;</code>, <code class="inline">&lt;=</code> y <code class="inline">&gt;=</code> son la base de cualquier decisión.</p>
          <div class="note-box">Cuando trabajes con muchas observaciones, <code class="inline">ifelse()</code> suele ser más cómodo que repetir varios <code class="inline">if</code>.</div>
        `,
        exercises: [
          {
            id: 'e3_3',
            title: 'Clasificación de pH',
            description: 'Con <code class="inline">pH &lt;- 2.8</code>, imprime <code class="inline">"Ácido fuerte"</code> si el valor es menor que 3, <code class="inline">"Ácido débil"</code> si es menor que 7 y <code class="inline">"Neutro o básico"</code> en otro caso.',
            expected: '[1] "Ácido fuerte"',
            hint: 'pH <- 2.8; if (pH < 3) { print("Ácido fuerte") } else if (pH < 7) { print("Ácido débil") } else { print("Neutro o básico") }',
          },
          {
            id: 'e3_4',
            title: 'Clasificación de temperatura',
            description: 'Con <code class="inline">temp &lt;- 105</code>, imprime <code class="inline">"Vapor"</code> si temp es mayor que 100, <code class="inline">"Líquido"</code> si está entre 0 y 100, y <code class="inline">"Sólido"</code> si es menor que 0.',
            expected: '[1] "Vapor"',
            hint: 'temp <- 105; if (temp > 100) { print("Vapor") } else if (temp >= 0) { print("Líquido") } else { print("Sólido") }',
          },
        ],
      },
      {
        id: 'bucles',
        name: 'Bucles: for, while y repeat',
        theory: `
          <p>Los bucles sirven para repetir acciones cuando un problema necesita recorrer varios valores. Aunque R prefiere soluciones vectorizadas, los bucles siguen siendo muy útiles para entender la lógica de ejecución y para tareas donde cada paso depende del anterior.</p>
          <pre class="code-block">for (i in 1:5) {
  cat(i, "\n")
}

contador &lt;- 1
while (contador &lt;= 3) {
  print(contador^2)
  contador &lt;- contador + 1
}

x &lt;- 0
repeat {
  x &lt;- x + 1
  if (x &gt;= 4) break
}</pre>
          <div class="note-box"><code class="inline">for</code> sirve para recorrer secuencias; <code class="inline">while</code> depende de una condición; y <code class="inline">repeat</code> necesita una salida explícita con <code class="inline">break</code>.</div>
        `,
        exercises: [
          {
            id: 'e3_5',
            title: 'Múltiplos con for',
            description: 'Usa un bucle <code class="inline">for</code> para imprimir los primeros 5 múltiplos de 3.',
            expected: '3\n6\n9\n12\n15',
            hint: 'for(i in 1:5){ cat(i*3, "\n") }',
          },
          {
            id: 'e3_6',
            title: 'Suma acumulada con while',
            description: 'Calcula la suma de 1 a 5 usando <code class="inline">while</code> e imprime el total final.',
            expected: '[1] 15',
            hint: 'total <- 0; i <- 1; while(i <= 5){ total <- total + i; i <- i + 1 }; print(total)',
          },
        ],
      },
      {
        id: 'control_extra',
        name: 'switch(), break y next',
        theory: `
          <p>Algunas estructuras de control ayudan a afinar la lógica dentro de un bucle o a elegir una salida entre varias opciones. <code class="inline">switch()</code> es útil cuando tienes una selección discreta de casos; <code class="inline">next</code> salta una iteración; y <code class="inline">break</code> corta el ciclo por completo.</p>
          <pre class="code-block">opcion &lt;- "b"
resultado &lt;- switch(opcion,
  a = "Ácido",
  b = "Base",
  c = "Sal"
)

for (i in 1:5) {
  if (i == 3) next
  print(i)
}</pre>
          <div class="note-box">Estas herramientas son especialmente útiles cuando limpias datos o recorres listas y quieres ignorar casos que no cumplen una regla.</div>
        `,
        exercises: [
          {
            id: 'e3_7',
            title: 'Elegir una opción con switch',
            description: 'Usa <code class="inline">switch()</code> con <code class="inline">opcion &lt;- "c"</code> para devolver <code class="inline">"Sal"</code>.',
            expected: '[1] "Sal"',
            hint: 'opcion <- "c"; print(switch(opcion, a = "Ácido", b = "Base", c = "Sal"))',
          },
          {
            id: 'e3_8',
            title: 'Saltarse una iteración',
            description: 'En un <code class="inline">for</code> del 1 al 5, omite el número 3 con <code class="inline">next</code> e imprime los demás.',
            expected: '1\n2\n4\n5',
            hint: 'for(i in 1:5){ if(i == 3) next; cat(i, "\n") }',
          },
        ],
      },
      {
        id: 'funciones_control',
        name: 'Funciones con control de flujo y validación',
        theory: `
          <p>Una función puede contener decisiones y ciclos para resolver tareas más realistas. Es una forma muy práctica de combinar todo lo aprendido: validación de entradas, repeticiones, salidas tempranas y resultados claros.</p>
          <pre class="code-block">clasificar_nota &lt;- function(nota) {
  if (nota &lt; 0 || nota &gt; 10) {
    stop("La nota debe estar entre 0 y 10")
  }
  if (nota &gt;= 7) {
    return("Aprobado")
  }
  "Reprobado"
}</pre>
          <div class="note-box">Validar entradas dentro de una función hace que tu código sea más robusto y te ayuda a detectar errores antes de seguir calculando.</div>
        `,
        exercises: [
          {
            id: 'e3_9',
            title: 'Clasificar una nota',
            description: 'Crea una función <code class="inline">clasificar_nota(nota)</code> que devuelva <code class="inline">"Aprobado"</code> si la nota es mayor o igual que 7 y <code class="inline">"Reprobado"</code> en otro caso. Prueba con 8.',
            expected: '[1] "Aprobado"',
            hint: 'clasificar_nota <- function(nota){ if(nota >= 7){ return("Aprobado") } "Reprobado" }; print(clasificar_nota(8))',
          },
          {
            id: 'e3_10',
            title: 'Validación simple',
            description: 'Crea una función que detenga la ejecución si el valor recibido es negativo y, si no lo es, devuelva el mismo valor. Prueba con <code class="inline">5</code>.',
            expected: '[1] 5',
            hint: 'validar <- function(x){ if(x < 0) stop("Negativo") else return(x) }; print(validar(5))',
          },
        ],
      },
    ],
  },
  {
    id: 'mod4',
    num: '04',
    name: 'Manipulación de datos',
    description: 'Trabajo con data frames, tidyverse, dplyr y herramientas útiles para análisis químico.',
    topics: [
      {
        id: 'paquetes',
        name: 'Descripción del módulo y ecosistema de paquetes',
        theory: `
          <p>En este módulo vas a mover, limpiar, resumir y unir datos. El trabajo moderno en R se apoya mucho en el ecosistema <code class="inline">tidyverse</code>, especialmente en <code class="inline">dplyr</code>, <code class="inline">tidyr</code>, <code class="inline">readr</code> y <code class="inline">ggplot2</code>.</p>
          <p><strong>Comandos y paquetes clave:</strong></p>
          <ul style="padding-left:20px;line-height:2.1;margin:10px 0">
            <li><code class="inline">install.packages()</code> — instala paquetes desde CRAN.</li>
            <li><code class="inline">library()</code> — carga un paquete en la sesión.</li>
            <li><code class="inline">read_csv()</code> y <code class="inline">read.csv()</code> — importan archivos tabulares.</li>
            <li><code class="inline">select()</code>, <code class="inline">filter()</code>, <code class="inline">mutate()</code>, <code class="inline">arrange()</code> — transforman columnas y filas.</li>
            <li><code class="inline">group_by()</code> y <code class="inline">summarise()</code> — agrupan y resumen datos.</li>
            <li><code class="inline">left_join()</code>, <code class="inline">inner_join()</code> — combinan tablas.</li>
            <li><code class="inline">pivot_longer()</code> y <code class="inline">pivot_wider()</code> — cambian la forma de la tabla.</li>
            <li><code class="inline">ChemmineR</code> y <code class="inline">mdatools</code> — útiles en química y quimiometría para trabajar con estructuras moleculares y análisis multivariante.</li>
          </ul>
          <div class="note-box">Si tus datos vienen de laboratorio, casi siempre primero tendrás que importarlos, revisarlos, limpiarlos y recién después analizarlos.</div>
        `,
        exercises: [
          {
            id: 'e4_1',
            title: 'Carga un paquete',
            description: 'Escribe la instrucción para cargar <code class="inline">dplyr</code> en la sesión.',
            expected: '[1] "dplyr"',
            hint: 'library(dplyr)',
          },
          {
            id: 'e4_2',
            title: 'Objeto base',
            description: 'Crea un data frame llamado <code class="inline">muestras</code> con dos columnas: <code class="inline">id = c(1,2,3)</code> y <code class="inline">valor = c(10,20,30)</code>. Imprime su número de filas.',
            expected: '[1] 3',
            hint: 'muestras <- data.frame(id = c(1,2,3), valor = c(10,20,30)); print(nrow(muestras))',
          },
        ],
      },
      {
        id: 'importacion',
        name: 'Importar, revisar y seleccionar datos',
        theory: `
          <p>Importar datos es el punto de entrada de casi cualquier proyecto. Después de leerlos, debes revisar nombres de columnas, tipos de datos, valores faltantes y estructura general antes de transformarlos.</p>
          <pre class="code-block">datos &lt;- data.frame(
  muestra = c("A", "B", "C"),
  ph = c(6.8, 7.2, 5.9),
  temperatura = c(22, 25, 21)
)

select(datos, muestra, ph)
filter(datos, ph &lt; 7)
arrange(datos, ph)</pre>
          <p>Funciones como <code class="inline">select()</code> y <code class="inline">filter()</code> te ayudan a escoger columnas o filas concretas, mientras que <code class="inline">arrange()</code> ordena según una variable.</p>
          <div class="note-box">Después de importar, revisa siempre si los nombres de las columnas están correctos y si los tipos quedaron como esperabas.</div>
        `,
        exercises: [
          {
            id: 'e4_3',
            title: 'Filtrar observaciones',
            description: 'Crea un data frame con <code class="inline">pH = c(6.8, 7.4, 5.5)</code> y muestra solo las filas donde <code class="inline">pH &lt; 7</code>. Imprime cuántas filas quedan.',
            expected: '[1] 2',
            hint: 'df <- data.frame(pH = c(6.8, 7.4, 5.5)); print(nrow(df[df$pH < 7, ]))',
          },
          {
            id: 'e4_4',
            title: 'Seleccionar columnas',
            description: 'Crea un data frame con columnas <code class="inline">nombre</code>, <code class="inline">masa</code> y <code class="inline">estado</code>. Imprime solo la columna <code class="inline">masa</code>.',
            expected: '[1] 1.2 3.4 2.1',
            hint: 'df <- data.frame(nombre = c("A","B","C"), masa = c(1.2,3.4,2.1), estado = c("s","l","s")); print(df$masa)',
          },
        ],
      },
      {
        id: 'dplyr',
        name: 'Transformación con dplyr',
        theory: `
          <p><code class="inline">dplyr</code> organiza la manipulación de datos en verbos muy fáciles de leer. El flujo típico es seleccionar, filtrar, crear nuevas variables y ordenar el resultado.</p>
          <pre class="code-block">datos %&gt;%
  filter(ph &lt; 7) %&gt;%
  mutate(poh = 14 - ph) %&gt;%
  arrange(desc(poh))</pre>
          <p>Los verbos más importantes son <code class="inline">mutate()</code>, <code class="inline">filter()</code>, <code class="inline">select()</code>, <code class="inline">rename()</code>, <code class="inline">arrange()</code>, <code class="inline">distinct()</code> y <code class="inline">slice()</code>. Con ellos puedes construir pipelines muy claros.</p>
          <div class="note-box">El operador <code class="inline">%&gt;%</code> conecta pasos. Eso hace que tu análisis se lea de arriba hacia abajo como una receta.</div>
        `,
        exercises: [
          {
            id: 'e4_5',
            title: 'Crear una nueva variable',
            description: 'Con <code class="inline">ph &lt;- c(6, 8)</code>, calcula <code class="inline">poh = 14 - ph</code> y imprime el resultado.',
            expected: '[1] 8 6',
            hint: 'ph <- c(6,8); print(14 - ph)',
          },
          {
            id: 'e4_6',
            title: 'Ordenar resultados',
            description: 'Crea el vector <code class="inline">c(5, 1, 9, 3)</code> y ordénalo de menor a mayor.',
            expected: '[1] 1 3 5 9',
            hint: 'v <- c(5,1,9,3); print(sort(v))',
          },
        ],
      },
      {
        id: 'agrupacion',
        name: 'Agrupación, resúmenes y joins',
        theory: `
          <p>Una parte esencial de la manipulación de datos es resumir por grupos. Con <code class="inline">group_by()</code> y <code class="inline">summarise()</code> puedes obtener medias, conteos y totales por categoría. Con los joins puedes unir tablas que comparten una clave.</p>
          <pre class="code-block">datos &lt;- data.frame(
  grupo = c("A", "A", "B", "B"),
  valor = c(10, 12, 20, 22)
)

datos %&gt;%
  group_by(grupo) %&gt;%
  summarise(promedio = mean(valor))

left_join(tabla1, tabla2, by = "id")</pre>
          <div class="note-box">Agrupar y resumir es ideal para informes. Un join, en cambio, es útil cuando parte de la información está repartida en varias tablas.</div>
        `,
        exercises: [
          {
            id: 'e4_7',
            title: 'Promedio por grupo',
            description: 'Con un data frame que tenga <code class="inline">grupo = c("A", "A", "B", "B")</code> y <code class="inline">valor = c(10, 14, 20, 26)</code>, calcula el promedio del grupo A.',
            expected: '[1] 12',
            hint: 'df <- data.frame(grupo = c("A","A","B","B"), valor = c(10,14,20,26)); print(mean(df$valor[df$grupo == "A"]))',
          },
          {
            id: 'e4_8',
            title: 'Conteo de filas',
            description: 'Crea una tabla con 6 observaciones repartidas entre dos grupos e imprime cuántas filas pertenecen al grupo B.',
            expected: '[1] 3',
            hint: 'df <- data.frame(grupo = c("A","A","A","B","B","B"), valor = 1:6); print(sum(df$grupo == "B"))',
          },
        ],
      },
      {
        id: 'quimica',
        name: 'Flujo de trabajo para química y exportación',
        theory: `
          <p>En química suele haber tablas con concentraciones, absorbancias, pH, tiempos y réplicas. El flujo de trabajo normal es importar, revisar, limpiar, transformar, resumir y exportar. Si además trabajas con quimiometría o estructuras moleculares, paquetes como <code class="inline">ChemmineR</code> y <code class="inline">mdatools</code> pueden complementar el análisis.</p>
          <pre class="code-block"># Ejemplo de tabla de laboratorio
lab &lt;- data.frame(
  muestra = c("M1", "M2", "M3"),
  conc = c(0.1, 0.2, 0.3),
  abs = c(0.102, 0.198, 0.301)
)

lab %&gt;%
  mutate(ratio = abs / conc) %&gt;%
  summarise(promedio_ratio = mean(ratio))</pre>
          <p>Para exportar, puedes usar <code class="inline">write.csv()</code> o funciones equivalentes de <code class="inline">readr</code>. Mantener los datos limpios desde el principio evita errores al reportar resultados finales.</p>
          <div class="note-box">En análisis químico, conservar unidades, nombres de muestras y metadatos es tan importante como calcular el resultado numérico.</div>
        `,
        exercises: [
          {
            id: 'e4_9',
            title: 'Razón absorbancia/concentración',
            description: 'Con <code class="inline">conc = c(0.1, 0.2)</code> y <code class="inline">abs = c(0.101, 0.198)</code>, calcula la razón <code class="inline">abs/conc</code> y imprime el promedio.',
            expected: '[1] 0.9975',
            tolerance: 0.001,
            hint: 'conc <- c(0.1,0.2); abs <- c(0.101,0.198); print(mean(abs/conc))',
          },
          {
            id: 'e4_10',
            title: 'Exportación simulada',
            description: 'Crea un data frame con dos columnas y usa <code class="inline">nrow()</code> para confirmar cuántas observaciones contiene antes de exportarlo.',
            expected: '[1] 2',
            hint: 'df <- data.frame(muestra = c("X1","X2"), valor = c(5,6)); print(nrow(df))',
          },
        ],
      },
    ],
  },
]
