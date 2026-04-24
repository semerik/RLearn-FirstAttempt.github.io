import type { Module } from '~/types'

export const MODULES: Module[] = [
  // ── MÓDULO 1: LÓGICA BÁSICA ──────────────────────────────
  {
    id: 'mod1',
    num: '01',
    name: 'LÓGICA BÁSICA',
    description: 'Fundamentos de programación en R',
    topics: [
      {
        id: 'tipos',
        name: 'Tipos de Datos',
        theory: `
          <p>En R, los tipos de datos fundamentales son la base de todo programa. Los principales son:</p>
          <ul style="padding-left:20px;line-height:2.2;margin:10px 0">
            <li><strong style="color:var(--orange)">numeric</strong> — números reales: <code class="inline">3.14</code>, <code class="inline">-2.5</code></li>
            <li><strong style="color:var(--orange)">integer</strong> — enteros: <code class="inline">1L</code>, <code class="inline">42L</code></li>
            <li><strong style="color:var(--orange)">character</strong> — texto: <code class="inline">"hola"</code>, <code class="inline">'R'</code></li>
            <li><strong style="color:var(--orange)">logical</strong> — booleanos: <code class="inline">TRUE</code>, <code class="inline">FALSE</code></li>
            <li><strong style="color:var(--orange)">complex</strong> — complejos: <code class="inline">2+3i</code></li>
          </ul>
          <p>Usa <code class="inline">class()</code> para conocer el tipo de un objeto:</p>
          <pre class="code-block">x &lt;- 42.5
class(x)        # "numeric"

y &lt;- "química"
class(y)        # "character"

z &lt;- TRUE
class(z)        # "logical"

# Conversiones explícitas
as.integer(3.7) # 3
as.character(9) # "9"
as.numeric("5") # 5</pre>
          <div class="note-box">R convierte tipos automáticamente (coerción implícita). Si mezclas numeric y character, el resultado será character.</div>
        `,
        exercises: [
          {
            id: 'e1_1',
            title: 'Identifica tipos de datos',
            description: 'Crea 3 variables: <code class="inline">masa &lt;- 58.44</code>, <code class="inline">compuesto &lt;- "NaCl"</code>, y <code class="inline">soluble &lt;- TRUE</code>. Luego imprime la clase de cada una usando <code class="inline">class()</code>, una por línea.',
            expected: '[1] "numeric"\n[1] "character"\n[1] "logical"',
            hint: 'Usa print(class(masa)), print(class(compuesto)), print(class(soluble)) en líneas separadas.',
          },
          {
            id: 'e1_2',
            title: 'Conversión de tipos',
            description: 'Convierte el número <code class="inline">7</code> a character con <code class="inline">as.character(7)</code>, guárdalo en <code class="inline">x</code> e imprime <code class="inline">class(x)</code>.',
            expected: '[1] "character"',
            hint: 'x <- as.character(7); print(class(x))',
          },
        ],
      },
      {
        id: 'variables',
        name: 'Variables',
        theory: `
          <p>En R el operador de asignación es <code class="inline">&lt;-</code> (también se puede usar <code class="inline">=</code>, pero la convención es <code class="inline">&lt;-</code>).</p>
          <pre class="code-block">nombre        &lt;- "Hidrógeno"
numero_atomico &lt;- 1
masa_atomica  &lt;- 1.008
es_metal      &lt;- FALSE

# R es sensible a mayúsculas:
Masa &lt;- 10   # distinta de masa</pre>
          <p>Buenas prácticas de nombrado:</p>
          <ul style="padding-left:20px;line-height:2;margin:8px 0">
            <li>snake_case: <code class="inline">masa_molar</code>, <code class="inline">num_moles</code></li>
            <li>Evitar nombres de funciones: no uses <code class="inline">c</code>, <code class="inline">t</code>, <code class="inline">mean</code></li>
            <li>Nombres descriptivos: <code class="inline">masa_molar_nacl</code> en lugar de <code class="inline">mm</code></li>
          </ul>
          <div class="note-box">Asignar con &lt;- en la consola no imprime el valor. Para imprimir, escribe el nombre de la variable o usa print().</div>
        `,
        exercises: [
          {
            id: 'e2_1',
            title: 'Variables del agua',
            description: 'Crea 3 variables: <code class="inline">formula &lt;- "H2O"</code>, <code class="inline">masa_molar &lt;- 18.015</code>, <code class="inline">estado &lt;- "líquido"</code>. Imprime únicamente <code class="inline">masa_molar</code>.',
            expected: '[1] 18.015',
            hint: 'Escribe masa_molar o print(masa_molar) al final.',
          },
          {
            id: 'e2_2',
            title: 'Peso molecular del CO₂',
            description: 'Calcula el peso molecular del CO₂: C=12.011, O=15.999. Guárdalo en <code class="inline">pm_co2</code> e imprímelo.',
            expected: '[1] 44.009',
            hint: 'pm_co2 <- 12.011 + 2 * 15.999; print(pm_co2)',
          },
        ],
      },
      {
        id: 'condicionales',
        name: 'Condicionales',
        theory: `
          <p>Los condicionales dirigen el flujo del programa según condiciones:</p>
          <pre class="code-block">pH &lt;- 3.5

if (pH &lt; 7) {
  print("Ácido")
} else if (pH == 7) {
  print("Neutro")
} else {
  print("Básico")
}</pre>
          <p>Operadores de comparación: <code class="inline">==</code> &nbsp;<code class="inline">!=</code> &nbsp;<code class="inline">&lt;</code> &nbsp;<code class="inline">&gt;</code> &nbsp;<code class="inline">&lt;=</code> &nbsp;<code class="inline">&gt;=</code></p>
          <p style="margin-top:8px">Operadores lógicos: <code class="inline">&amp;</code> (AND) &nbsp;<code class="inline">|</code> (OR) &nbsp;<code class="inline">!</code> (NOT)</p>
          <pre class="code-block"># ifelse vectorizado
temperaturas &lt;- c(-5, 20, 105)
ifelse(temperaturas &gt; 100, "vapor",
  ifelse(temperaturas &lt; 0, "sólido", "líquido"))</pre>
        `,
        exercises: [
          {
            id: 'e3_1',
            title: 'Clasificar pH',
            description: 'Dado <code class="inline">pH &lt;- 2.3</code>, usa if/else para imprimir: "Ácido fuerte" si pH &lt; 3, "Ácido débil" si pH &lt; 7, "No ácido" en otro caso.',
            expected: '[1] "Ácido fuerte"',
            hint: 'if(pH < 3){ print("Ácido fuerte") } else if(pH < 7){ ... }',
          },
          {
            id: 'e3_2',
            title: 'Estado del agua',
            description: 'Dado <code class="inline">temp &lt;- 105</code> (°C), imprime "Vapor" si temp > 100, "Líquido" si 0 ≤ temp ≤ 100, "Sólido" si temp < 0.',
            expected: '[1] "Vapor"',
            hint: 'if(temp > 100){ print("Vapor") } else if(temp >= 0){ ... }',
          },
        ],
      },
      {
        id: 'bucles',
        name: 'Bucles',
        theory: `
          <p>Los bucles repiten operaciones de forma eficiente:</p>
          <pre class="code-block"># for — iterar sobre una secuencia
for (i in 1:5) {
  cat(i * 0.5, "\\n")
}

# while — repetir mientras condición sea TRUE
n &lt;- 1
while (n &lt;= 3) {
  print(n^2)
  n &lt;- n + 1
}

# repeat + break
x &lt;- 0
repeat {
  x &lt;- x + 1
  if (x &gt;= 5) break
}</pre>
          <div class="note-box">En R se prefieren operaciones vectorizadas sobre bucles. Los bucles son útiles cuando la lógica depende de iteraciones previas.</div>
        `,
        exercises: [
          {
            id: 'e4_1',
            title: 'Tabla de diluciones',
            description: 'Usa un bucle <code class="inline">for</code> para imprimir los primeros 5 múltiplos de 0.5 (0.5, 1, 1.5, 2, 2.5) usando <code class="inline">cat()</code> con salto de línea.',
            expected: '0.5 \n1 \n1.5 \n2 \n2.5',
            hint: 'for(i in 1:5){ cat(i*0.5, "\\n") }',
          },
          {
            id: 'e4_2',
            title: 'Suma acumulada',
            description: 'Calcula la suma de 1 a 10 con un bucle <code class="inline">while</code>. Guárdala en <code class="inline">total</code> e imprímela.',
            expected: '[1] 55',
            hint: 'total <- 0; i <- 1; while(i<=10){ total <- total+i; i <- i+1 }; print(total)',
          },
        ],
      },
      {
        id: 'funciones',
        name: 'Funciones',
        theory: `
          <p>Las funciones encapsulan lógica reutilizable:</p>
          <pre class="code-block">calcular_moles &lt;- function(masa, masa_molar) {
  moles &lt;- masa / masa_molar
  return(moles)
}

# La última expresión se retorna automáticamente
densidad &lt;- function(masa, volumen) masa / volumen

# Argumentos con valor por defecto
concentracion &lt;- function(moles, vol_L = 1.0) {
  moles / vol_L
}

calcular_moles(58.44, 58.44) # 1
concentracion(0.5)           # 0.5 M en 1L</pre>
        `,
        exercises: [
          {
            id: 'e5_1',
            title: 'Función de moles',
            description: 'Crea <code class="inline">moles(masa, molar)</code> que retorne <code class="inline">masa/molar</code>. Llámala con <code class="inline">moles(36.5, 36.5)</code> e imprime.',
            expected: '[1] 1',
            hint: 'moles <- function(masa, molar){ return(masa/molar) }; print(moles(36.5, 36.5))',
          },
          {
            id: 'e5_2',
            title: 'Función de densidad',
            description: 'Crea <code class="inline">densidad(masa, volumen)</code> que retorne <code class="inline">masa/volumen</code>. Pruébala con <code class="inline">densidad(200, 50)</code> e imprime.',
            expected: '[1] 4',
            hint: 'densidad <- function(m, v){ m/v }; print(densidad(200, 50))',
          },
        ],
      },
    ],
  },

  // ── MÓDULO 2: R AVANZADO ─────────────────────────────────
  {
    id: 'mod2',
    num: '02',
    name: 'R AVANZADO',
    description: 'Estructuras de datos propias de R',
    topics: [
      {
        id: 'vectores',
        name: 'Vectores y Matrices',
        theory: `
          <p>Los vectores son la estructura atómica de R. Todo en R es un vector:</p>
          <pre class="code-block">pesos &lt;- c(1.008, 4.003, 6.941, 9.012)
nombres &lt;- c("H", "He", "Li", "Be")

# Operaciones vectorizadas (sin loop)
pesos * 2
pesos + 1
sum(pesos)
cumsum(pesos)   # suma acumulada

# Matrices
M &lt;- matrix(1:9, nrow=3, ncol=3)
M[2, 3]         # fila 2, columna 3
t(M)            # transpuesta
M %*% M         # producto matricial</pre>
          <div class="note-box">Las operaciones vectorizadas son más rápidas que los bucles en R. Úsalas siempre que sea posible.</div>
        `,
        exercises: [
          {
            id: 'e6_1',
            title: 'Vector de pesos atómicos',
            description: 'Crea <code class="inline">pesos &lt;- c(1.008, 12.011, 14.007, 15.999)</code> (H, C, N, O). Calcula e imprime la suma con <code class="inline">sum()</code>.',
            expected: '[1] 43.025',
            hint: 'pesos <- c(1.008, 12.011, 14.007, 15.999); print(sum(pesos))',
          },
          {
            id: 'e6_2',
            title: 'Media de mediciones',
            description: 'Con el vector <code class="inline">c(2.1, 3.5, 1.8, 4.2, 2.9)</code>, calcula e imprime la media con <code class="inline">mean()</code>.',
            expected: '[1] 2.9',
            hint: 'datos <- c(2.1, 3.5, 1.8, 4.2, 2.9); print(mean(datos))',
          },
        ],
      },
      {
        id: 'dataframes',
        name: 'Data Frames',
        theory: `
          <p>Los data frames son tablas donde cada columna puede ser de tipo diferente:</p>
          <pre class="code-block">elementos &lt;- data.frame(
  simbolo = c("H","C","N","O"),
  numero  = c(1, 6, 7, 8),
  masa    = c(1.008, 12.011, 14.007, 15.999),
  stringsAsFactors = FALSE
)

# Acceso
elementos$masa       # columna completa
elementos[2, ]       # fila 2
elementos[, "masa"]  # también columna masa

# Información
nrow(elementos); ncol(elementos)
str(elementos)
head(elementos, 3)</pre>
        `,
        exercises: [
          {
            id: 'e7_1',
            title: 'Crear data frame',
            description: 'Crea <code class="inline">soluciones</code> con columnas: <code class="inline">soluto = c("NaCl","HCl","NaOH")</code> y <code class="inline">concentracion = c(0.5,1.0,0.25)</code>. Imprime <code class="inline">nrow(soluciones)</code>.',
            expected: '[1] 3',
            hint: 'soluciones <- data.frame(soluto=c("NaCl","HCl","NaOH"), concentracion=c(0.5,1.0,0.25)); print(nrow(soluciones))',
          },
          {
            id: 'e7_2',
            title: 'Filtrar con subset',
            description: 'Con el mismo data frame del ejercicio anterior, usa <code class="inline">subset(soluciones, concentracion &gt; 0.3)</code> e imprímelo.',
            expected: '  soluto concentracion\n1   NaCl          0.50\n2    HCl          1.00',
            hint: 'Crea el data frame primero, luego: print(subset(soluciones, concentracion > 0.3))',
          },
        ],
      },
      {
        id: 'indexacion',
        name: 'Indexación',
        theory: `
          <p>R ofrece indexación muy flexible:</p>
          <pre class="code-block">v &lt;- c(10, 20, 30, 40, 50)

v[2]             # 20 — por posición
v[c(1, 3, 5)]   # 10 30 50 — múltiples
v[v &gt; 25]       # 30 40 50 — lógica
v[-1]            # 20 30 40 50 — excluir

# Con nombres
pesos &lt;- c(H=1.008, C=12.011, N=14.007)
pesos["C"]       # 12.011

# Data frames
df[df$pH &lt; 7, ]  # filas donde pH &lt; 7
df[, c("col1","col3")]  # columnas seleccionadas</pre>
        `,
        exercises: [
          {
            id: 'e8_1',
            title: 'Filtrar ácidos',
            description: 'Dado <code class="inline">pH &lt;- c(2.1, 7.0, 8.5, 3.2, 6.8, 9.1)</code>, imprime los valores menores a 7 (ácidos) usando indexación lógica. Usa <code class="inline">cat()</code>.',
            expected: '2.1 3.2 6.8',
            hint: 'pH <- c(2.1,7.0,8.5,3.2,6.8,9.1); cat(pH[pH < 7])',
          },
        ],
      },
      {
        id: 'funciones_r',
        name: 'Funciones Nativas de R',
        theory: `
          <p>R tiene un conjunto rico de funciones estadísticas integradas:</p>
          <pre class="code-block">datos &lt;- c(3.2, 5.1, 2.8, 6.4, 4.0, 3.7)

sum(datos)          # suma
mean(datos)         # media aritmética
median(datos)       # mediana
sd(datos)           # desviación estándar
var(datos)          # varianza
min(datos); max(datos)
range(datos)        # c(min, max)
length(datos)       # número de elementos
sort(datos)         # ordenar ascendente
rev(datos)          # invertir orden
cumsum(datos)       # suma acumulada
diff(datos)         # diferencias consecutivas
round(3.14159, 2)   # redondear: 3.14
ceiling(3.1)        # 4
floor(3.9)          # 3</pre>
        `,
        exercises: [
          {
            id: 'e9_1',
            title: 'Desviación estándar',
            description: 'Dado <code class="inline">c(12.3, 14.5, 11.8, 13.2, 15.1, 10.9)</code>, calcula e imprime la desviación estándar con <code class="inline">sd()</code>.',
            expected: '[1] 1.565248',
            tolerance: 0.001,
            hint: 'datos <- c(12.3, 14.5, 11.8, 13.2, 15.1, 10.9); print(sd(datos))',
          },
        ],
      },
    ],
  },

  // ── MÓDULO 3: QUÍMICA CON R ──────────────────────────────
  {
    id: 'mod3',
    num: '03',
    name: 'QUÍMICA CON R',
    description: 'Análisis de datos en química universitaria',
    topics: [
      {
        id: 'concentraciones',
        name: 'Concentraciones y Molaridad',
        theory: `
          <p>La molaridad (M) = moles de soluto / litros de solución:</p>
          <pre class="code-block">calcular_molaridad &lt;- function(masa_g, masa_molar, vol_L) {
  moles     &lt;- masa_g / masa_molar
  molaridad &lt;- moles / vol_L
  return(molaridad)
}

# NaCl: 11.688 g en 1 L de agua
# Masa molar NaCl = 58.44 g/mol
M &lt;- calcular_molaridad(11.688, 58.44, 1.0)
cat("Molaridad:", M, "M\\n")  # 0.2 M

# Ley de dilución: C1*V1 = C2*V2
C1 &lt;- 2.0;  V2 &lt;- 1.0;  C2 &lt;- 0.5
V1 &lt;- (C2 * V2) / C1
cat("Volumen a tomar:", V1 * 1000, "mL\\n")  # 250 mL</pre>
          <div class="note-box">Siempre verifica unidades: masa en gramos, masa_molar en g/mol, volumen en litros.</div>
        `,
        exercises: [
          {
            id: 'e10_1',
            title: 'Molaridad de NaOH',
            description: 'Calcula la molaridad de 20 g de NaOH (masa molar = 40 g/mol) en 500 mL de solución. Guárdalo en <code class="inline">M</code> e imprímelo.',
            expected: '[1] 1',
            hint: 'moles <- 20/40; vol <- 0.5; M <- moles/vol; print(M)',
          },
          {
            id: 'e10_2',
            title: 'Dilución C₁V₁ = C₂V₂',
            description: 'Tienes HCl 2M y quieres 0.5M en 1 L. Calcula cuántos mL necesitas tomar (V₁ = C₂·V₂/C₁, luego multiplica por 1000). Imprime el resultado.',
            expected: '[1] 250',
            hint: 'C1<-2; C2<-0.5; V2<-1; V1_L<-(C2*V2)/C1; print(V1_L*1000)',
          },
        ],
      },
      {
        id: 'ph',
        name: 'Cálculo de pH',
        theory: `
          <p>pH = −log₁₀([H⁺]). R tiene <code class="inline">log10()</code> integrado:</p>
          <pre class="code-block"># Ácido fuerte (ionización completa)
H &lt;- 0.001       # [H+] = 10^-3 mol/L
pH &lt;- -log10(H)  # pH = 3
cat("pH =", pH, "\\n")

# Ácido débil: HA ⇌ H+ + A-
# [H+] = sqrt(Ka * C)
Ka &lt;- 1.8e-5     # Ka del ácido acético
C  &lt;- 0.1        # 0.1 M
H_debil  &lt;- sqrt(Ka * C)
pH_debil &lt;- -log10(H_debil)
cat("pH acético:", round(pH_debil, 2))  # 2.87

# pOH y pH base
pOH &lt;- -log10(0.001)  # 3
pH_base &lt;- 14 - pOH  # 11</pre>
        `,
        exercises: [
          {
            id: 'e11_1',
            title: 'pH de HCl',
            description: 'Calcula el pH de HCl 0.01 M (ácido fuerte). Usa <code class="inline">pH &lt;- -log10(0.01)</code> e imprímelo.',
            expected: '[1] 2',
            hint: 'pH <- -log10(0.01); print(pH)',
          },
          {
            id: 'e11_2',
            title: 'pH de ácido acético',
            description: 'Calcula el pH de ácido acético 0.1 M (Ka = 1.8e-5). H⁺ = sqrt(Ka·C), luego pH = -log10(H⁺). Imprime redondeado a 2 decimales.',
            expected: '[1] 2.87',
            tolerance: 0.01,
            hint: 'Ka<-1.8e-5; C<-0.1; H<-sqrt(Ka*C); pH<--log10(H); print(round(pH,2))',
          },
        ],
      },
      {
        id: 'regresion',
        name: 'Regresión Lineal',
        theory: `
          <p>La regresión lineal es clave en análisis de datos experimentales (Ley de Beer-Lambert):</p>
          <pre class="code-block">conc &lt;- c(0.1, 0.2, 0.3, 0.4, 0.5)
abs  &lt;- c(0.102, 0.198, 0.301, 0.405, 0.498)

modelo &lt;- lm(abs ~ conc)
summary(modelo)

# Extraer coeficientes
coef(modelo)           # intercepto y pendiente
coef(modelo)[2]        # solo pendiente (ε·b)

# R² (coeficiente de determinación)
summary(modelo)$r.squared

# Predecir absorbancia a conc = 0.25
predict(modelo, data.frame(conc = 0.25))</pre>
          <div class="note-box">Ley de Beer-Lambert: A = ε·b·c. La pendiente de la regresión es ε·b (absortividad × longitud de celda).</div>
        `,
        exercises: [
          {
            id: 'e12_1',
            title: 'Curva de calibración',
            description: 'Ajusta una regresión lineal con:<br><code class="inline">conc &lt;- c(0,0.2,0.4,0.6,0.8,1.0)</code><br><code class="inline">abs  &lt;- c(0,0.195,0.401,0.596,0.800,1.002)</code><br>Imprime <code class="inline">round(summary(modelo)$r.squared, 4)</code>.',
            expected: '[1] 1',
            tolerance: 0.001,
            hint: 'conc<-c(0,0.2,0.4,0.6,0.8,1.0); abs<-c(0,0.195,0.401,0.596,0.800,1.002); modelo<-lm(abs~conc); print(round(summary(modelo)$r.squared,4))',
          },
          {
            id: 'e12_2',
            title: 'Predicción de concentración',
            description: 'Con el mismo modelo anterior, predice la absorbancia cuando <code class="inline">conc = 0.35</code> usando <code class="inline">predict()</code>. Imprime redondeado a 3 decimales.',
            expected: '[1] 0.351',
            tolerance: 0.005,
            hint: 'Después del lm(), usa: print(round(predict(modelo, data.frame(conc=0.35)), 3))',
          },
        ],
      },
      {
        id: 'estadistica',
        name: 'Estadística Experimental',
        theory: `
          <p>El análisis estadístico de mediciones repetidas es fundamental en química analítica:</p>
          <pre class="code-block">datos &lt;- c(14.23, 14.27, 14.19, 14.25, 14.22)

media &lt;- mean(datos)
desv  &lt;- sd(datos)
n     &lt;- length(datos)
SEM   &lt;- desv / sqrt(n)   # error estándar

# Intervalo de confianza 95%
t_crit &lt;- qt(0.975, df = n - 1)
IC &lt;- c(media - t_crit*SEM, media + t_crit*SEM)
cat("IC 95%:", round(IC, 4), "\\n")

# Coeficiente de variación (%)
CV &lt;- (desv / media) * 100
cat("CV:", round(CV, 2), "%\\n")

# Test t de una muestra
t.test(datos, mu = 14.2)</pre>
        `,
        exercises: [
          {
            id: 'e13_1',
            title: 'Coeficiente de variación',
            description: 'Para las mediciones <code class="inline">c(9.81, 9.79, 9.83, 9.78, 9.82, 9.80)</code>, calcula e imprime el CV = (sd/mean)×100. Redondea a 2 decimales.',
            expected: '[1] 0.2',
            tolerance: 0.05,
            hint: 'm<-c(9.81,9.79,9.83,9.78,9.82,9.80); cv<-(sd(m)/mean(m))*100; print(round(cv,2))',
          },
          {
            id: 'e13_2',
            title: 'Test t de hipótesis',
            description: 'Con las mediciones <code class="inline">c(7.1, 7.3, 6.9, 7.2, 7.0)</code>, usa <code class="inline">t.test(x, mu=7)</code> e imprime el p-value redondeado a 3 decimales.',
            expected: '[1] 0.777',
            tolerance: 0.005,
            hint: 'x<-c(7.1,7.3,6.9,7.2,7.0); r<-t.test(x,mu=7); print(round(r$p.value,3))',
          },
        ],
      },
      {
        id: 'cinetica',
        name: 'Cinética Química',
        theory: `
          <p>Análisis de datos cinéticos con R — ajuste de orden de reacción:</p>
          <pre class="code-block"># Datos cinéticos: [A] vs tiempo
tiempo &lt;- c(0, 10, 20, 30, 40, 50)
A      &lt;- c(1.000, 0.819, 0.670, 0.549, 0.449, 0.368)

# Orden 1: ln[A] = ln[A0] - k*t  (linealizar)
lnA &lt;- log(A)
modelo1 &lt;- lm(lnA ~ tiempo)
k &lt;- -coef(modelo1)[2]   # constante de velocidad
cat("k (orden 1):", round(k, 4), "s^-1\\n")

# t1/2 para reacción de orden 1
t_medio &lt;- log(2) / k
cat("t1/2:", round(t_medio, 2), "s\\n")

# Graficar
plot(tiempo, lnA, main="Cinética orden 1",
     xlab="Tiempo (s)", ylab="ln[A]")
abline(modelo1, col="red")</pre>
        `,
        exercises: [
          {
            id: 'e14_1',
            title: 'Constante de velocidad',
            description: 'Usando:<br><code class="inline">tiempo &lt;- c(0,10,20,30,40,50)</code><br><code class="inline">A &lt;- c(1.000,0.819,0.670,0.549,0.449,0.368)</code><br>Calcula k de la reacción de orden 1 (k = -pendiente de lm(log(A)~tiempo)). Imprime redondeado a 4 decimales.',
            expected: '[1] 0.02',
            tolerance: 0.002,
            hint: 'modelo<-lm(log(A)~tiempo); k<- -coef(modelo)[2]; print(round(k,4))',
          },
        ],
      },
    ],
  },
]
