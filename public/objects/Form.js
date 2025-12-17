import ExtT from "../objects/ExtT.js"

class Form {
	constructor(SB, usuarioId) {
		this.SB = SB
		this.usuarioId = usuarioId
		this.editor = null
		this.currentLatexType = 'inline'
	}

	createMarkdownEditor() {
		const container = document.getElementById('workplace')
		if (!container) return

		container.innerHTML = `
			<div class="container_form">
				<div class="toolbar" id="editorToolbar"></div>					 
				<div class="editor-container"> 
					<div class="editor-content" id="editor" contenteditable="true" data-placeholder="Comienza a escribir aquí..."><h1>Examen de Consultas SQL</h1>
						<h2>Base de Datos: Sistema Harpias</h2>
						<p><strong>Nombre:</strong> ________________________<br><strong>Fecha:</strong> _________________________<br><strong>Duración:</strong> 60 minutos<br><strong>Puntuación Total:</strong> 100 puntos</p>
						<hr>
						<h2>Pregunta 1 (25 puntos)</h2>
						<h3>Análisis y Corrección de Código</h3> 
						<p>El siguiente código SQL intenta obtener todos los estudiantes inscritos en la sala "Clase de Derivadas" junto con su tiempo de permanencia:</p>
<pre><code class="language-sql"><span class="token" style="color: rgb(198, 120, 221);">SELECT</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>name<span class="token" style="color: rgb(171, 178, 191);">,</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>start_datetime<span class="token" style="color: rgb(171, 178, 191);">,</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>lapse_seconds
<span class="token" style="color: rgb(198, 120, 221);">FROM</span> usuario <span class="token" style="color: rgb(198, 120, 221);">AS</span> u
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> usuario_room <span class="token" style="color: rgb(198, 120, 221);">AS</span> ur <span class="token" style="color: rgb(198, 120, 221);">ON</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>usuario_id
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> room <span class="token" style="color: rgb(198, 120, 221);">AS</span> r <span class="token" style="color: rgb(198, 120, 221);">ON</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>room_id <span class="token" style="color: rgb(97, 175, 239);">=</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>id
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> usuario_time <span class="token" style="color: rgb(198, 120, 221);">AS</span> ut <span class="token" style="color: rgb(198, 120, 221);">ON</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>usuario_id <span class="token" style="color: rgb(97, 175, 239);">AND</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>room_id
<span class="token" style="color: rgb(198, 120, 221);">WHERE</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>title <span class="token" style="color: rgb(97, 175, 239);">=</span> <span class="token" style="color: rgb(152, 195, 121);">'Clase de Derivadas'</span> <span class="token" style="color: rgb(97, 175, 239);">AND</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>role_in_room <span class="token" style="color: rgb(97, 175, 239);">=</span> <span class="token" style="color: rgb(152, 195, 121);">'student'</span><span class="token" style="color: rgb(171, 178, 191);">;</span></code></pre>
						<p><strong>a) (10 puntos)</strong> ¿Qué problema tiene esta consulta? ¿Qué pasaría si un estudiante está inscrito en la sala pero aún no ha registrado tiempo?</p>
						<p><strong>b) (15 puntos)</strong> Reescribe la consulta correctamente para que incluya a TODOS los estudiantes inscritos, incluso si no tienen registro de tiempo. La consulta debe mostrar:</p>
						<ul>
						<li>Nombre del estudiante</li>
						<li>Fecha y hora de inicio (si existe)</li>
						<li>Segundos transcurridos (si existe, sino mostrar 0)</li>
						</ul>
						<hr>
						<h2>Pregunta 2 (25 puntos)</h2>
						<h3>Consulta Compleja con Múltiples Joins</h3>
						<p>Necesitas crear un reporte que muestre información completa de los formularios. Escribe una consulta SQL que devuelva:</p>
						<ul>
						<li>ID del formulario</li>
						<li>Título del formulario</li>
						<li>Título de la sala (room)</li>
						<li>Nombre de la materia (subject)</li>
						<li>Nombre del creador del formulario</li>
						<li>Cantidad de herramientas (tools) asociadas</li>
						<li>Cantidad de quizzes asociados</li>
						</ul>
						<p><strong>Requisitos:</strong></p>
						<ul>
						<li>Debe incluir formularios aunque no tengan herramientas o quizzes asociados</li>
						<li>Ordenar por ID del formulario de forma ascendente</li>
						<li>Si el creador fue eliminado, mostrar "Sin información"</li>
						</ul>
						<hr>
						<h2>Pregunta 3 (25 puntos)</h2>
						<h3>Análisis y Depuración</h3>
						<p>Un desarrollador junior escribió la siguiente consulta para obtener las salas más recientes con su materia:</p>
						<pre><code class="language-sql"><span class="token" style="color: rgb(198, 120, 221);">SELECT</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>name<span class="token" style="color: rgb(171, 178, 191);">,</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>start_datetime<span class="token" style="color: rgb(171, 178, 191);">,</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>lapse_seconds
<span class="token" style="color: rgb(198, 120, 221);">FROM</span> usuario <span class="token" style="color: rgb(198, 120, 221);">AS</span> u
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> usuario_room <span class="token" style="color: rgb(198, 120, 221);">AS</span> ur <span class="token" style="color: rgb(198, 120, 221);">ON</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>usuario_id
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> room <span class="token" style="color: rgb(198, 120, 221);">AS</span> r <span class="token" style="color: rgb(198, 120, 221);">ON</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>room_id <span class="token" style="color: rgb(97, 175, 239);">=</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>id
<span class="token" style="color: rgb(198, 120, 221);">JOIN</span> usuario_time <span class="token" style="color: rgb(198, 120, 221);">AS</span> ut <span class="token" style="color: rgb(198, 120, 221);">ON</span> u<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>usuario_id <span class="token" style="color: rgb(97, 175, 239);">AND</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>id <span class="token" style="color: rgb(97, 175, 239);">=</span> ut<span class="token" style="color: rgb(171, 178, 191);">.</span>room_id
<span class="token" style="color: rgb(198, 120, 221);">WHERE</span> r<span class="token" style="color: rgb(171, 178, 191);">.</span>title <span class="token" style="color: rgb(97, 175, 239);">=</span> <span class="token" style="color: rgb(152, 195, 121);">'Clase de Derivadas'</span> <span class="token" style="color: rgb(97, 175, 239);">AND</span> ur<span class="token" style="color: rgb(171, 178, 191);">.</span>role_in_room <span class="token" style="color: rgb(97, 175, 239);">=</span> <span class="token" style="color: rgb(152, 195, 121);">'student'</span><span class="token" style="color: rgb(171, 178, 191);">;</span></code></pre>
						<p><strong>a) (10 puntos)</strong> Identifica el error en esta consulta y explica por qué causaría un problema.</p>
						<p><strong>b) (15 puntos)</strong> Corrige la consulta y modifícala para que además muestre:</p>
						<ul>
						<li>Descripción de la sala</li>
						<li>Fecha de inicio (start_datetime)</li>
						<li>Cantidad de formularios asociados a cada sala</li>
						<li>Solo las salas que tienen al menos un estudiante inscrito</li>
						</ul>
						<hr>
						<h2>Pregunta 4 (25 puntos)</h2>
						<h3>Consulta Avanzada con Agregaciones</h3>
						<p>Crea una consulta que genere un reporte de actividad de usuarios. La consulta debe mostrar:</p>
						<ul>
						<li>Nombre del usuario</li>
						<li>Total de herramientas (tools) creadas</li>
						<li>Total de quizzes creados</li>
						<li>Total de formularios creados</li>
						<li>Total de horas registradas en todas las salas (suma de lapse_seconds convertido a horas con 2 decimales)</li>
						</ul>
						<p><strong>Requisitos:</strong></p>
						<ul>
						<li>Solo incluir usuarios que hayan creado al menos una herramienta O un quiz O un formulario</li>
						<li>Ordenar por total de horas registradas de mayor a menor</li>
						<li>Si un usuario no tiene registro de tiempo, mostrar 0.00 horas</li>
						<li>Usa alias descriptivos para todas las columnas</li>
						</ul>
						<p><strong>Pista:</strong> Necesitarás usar GROUP BY y funciones de agregación como COUNT() y SUM()</p>
						<hr>
						<h2>Criterios de Evaluación</h2>
						<h3>Pregunta 1</h3>
						<ul>
						<li>Identificación correcta del problema: 10 puntos</li>
						<li>Consulta corregida y funcional: 15 puntos</li>
						</ul>
						<h3>Pregunta 2</h3>
						<ul>
						<li>Estructura correcta de JOINs: 10 puntos</li>
						<li>Uso correcto de agregaciones: 8 puntos</li>
						<li>Manejo de valores NULL: 7 puntos</li>
						</ul>
						<h3>Pregunta 3</h3>
						<ul>
						<li>Identificación del error: 10 puntos</li>
						<li>Corrección y extensión correcta: 15 puntos</li>
						</ul>
						<h3>Pregunta 4</h3>
						<ul>
						<li>Estructura correcta de la consulta: 10 puntos</li>
						<li>Agregaciones y cálculos correctos: 10 puntos</li>
						<li>Ordenamiento y formato: 5 puntos</li>
						</ul>
						<hr>
						<h2>Notas Importantes</h2>
						<ol>
						<li>Todas las consultas deben estar correctamente escritas sintácticamente</li>
						<li>Considera el tipo de JOIN apropiado para cada caso</li>
						<li>Presta atención a los valores NULL y cómo manejarlos</li>
						<li>Usa alias descriptivos para mejorar la legibilidad</li>
						<li>Recuerda que PostgreSQL usa comillas dobles para identificadores y comillas simples para strings</li>
						</ol>
						<p><strong>¡Buena suerte!</strong></p>
						</div>
				</div>
			</div>
				
			<div id="latexModal" class="modal">
				<div class="modal-content">
					<h2>Insertar fórmula LaTeX</h2> 
					<textarea id="latexInput" rows="4" placeholder="Escribe tu fórmula LaTeX aquí..."></textarea>
					<div id="latexPreview" style="margin: 1rem 0; min-height: 2rem; color: var(--c2)"></div>
					<div class="modal-buttons">
						<button id="btnLatexCancel">Cancelar</button>
						<button id="btnLatexInsert">Insertar</button>
					</div>
				</div>
			</div>

			<div id="sourceModal" class="modal">
				<div class="modal-content" style="max-width: 800px">
					<h2>Código fuente Markdown</h2>
					<textarea id="sourceInput" rows="15" style="font-family: cC, monospace; width: calc(100% - 2rem)"></textarea>
					<div class="modal-buttons">
						<button id="btnSourceCancel">Cancelar</button>
						<button id="btnSourceApply">Aplicar</button>
					</div>
				</div>
			</div>
		`

		this.buildToolbar()
		this.initializeEditor()
	}

	buildToolbar() {
		const bar = document.getElementById('editorToolbar')
		const groups = [
			[
				{ src: 'bold', action: () => this.formatDoc('bold') },
				{ src: 'italic', action: () => this.formatDoc('italic') },
				{ src: 'underlined', action: () => this.formatDoc('underline') },
				{ src: 'strikethrough_s', action: () => this.formatDoc('strikeThrough') }
			],
			[
				{ src: 'H1', action: () => this.formatDoc('formatBlock', '<h1>') },
				{ src: 'H2', action: () => this.formatDoc('formatBlock', '<h2>') },
				{ src: 'H3', action: () => this.formatDoc('formatBlock', '<h3>') },
				{ src: 'H4', action: () => this.formatDoc('formatBlock', '<h4>') },				
				{ src: 'normal_style', action: () => this.formatDoc('formatBlock', '<p>') }
			],
			[
				{ src: 'list_bulleted', action: () => this.formatDoc('insertUnorderedList') },
				{ src: 'list_numbered', action: () => this.formatDoc('insertOrderedList') },
				{ src: 'cite_format', action: () => this.formatDoc('formatBlock', '<blockquote>') }
			],
			[
				{ src: 'code', action: () => this.insertCode() },
				{ src: 'code_blocks', action: () => this.insertCodeBlock() },
				{ src: 'function', action: () => this.openLatexModal('inline') },
				{ src: 'function_block', action: () => this.openLatexModal('block') }
			],
			[
				{ src: 'link', action: () => this.insertLink() },
				{ src: 'ink_eraser', action: () => this.formatDoc('removeFormat') }
			],
			[
				{ src: 'markdown', action: () => this.exportMarkdown() },
				{ src: 'preview', action: () => this.viewSource() }
			]
		]

		groups.forEach(group => {
			const div = document.createElement('div')
			div.className = 'toolbar-group'
			group.forEach(btn => {
				const img = document.createElement('img')
				img.classList.add("form_button_img")  
				if (btn.src == "normal_style") {
					img.classList.add("form_button_img_normal_style")  
				}
				img.src = `./img/ico/${btn.src}.svg`
				img.addEventListener('click', btn.action)
				div.appendChild(img)
				ExtT.changeIcoColor(img, "--c2")
				img.addEventListener("mouseenter", () => {
					ExtT.changeIcoColor(img, "--c1")
				})
				img.addEventListener("mouseleave", () => {
					ExtT.changeIcoColor(img, "--c2")
				})

			})
			bar.appendChild(div)
		})
	}

	initializeEditor() {
		this.editor = document.getElementById('editor')
		const latexInput = document.getElementById('latexInput')
		if (latexInput) {
			latexInput.addEventListener('input', () => {
				const formula = latexInput.value
				const preview = document.getElementById('latexPreview')
				if (formula.trim()) {
					try {
						preview.innerHTML = katex.renderToString(formula, {
							displayMode: this.currentLatexType === 'block',
							throwOnError: false
						})
					} catch {
						preview.innerHTML = '<span style="color: var(--c1)">Error en fórmula</span>'
					}
				} else {
					preview.innerHTML = ''
				}
			})
		}

		document.getElementById('btnLatexCancel').addEventListener('click', () => this.closeLatexModal())
		document.getElementById('btnLatexInsert').addEventListener('click', () => this.insertLatex())

		document.getElementById('btnSourceCancel').addEventListener('click', () => this.closeSourceModal())
		document.getElementById('btnSourceApply').addEventListener('click', () => this.applySource())

		this.editor.addEventListener('keydown', e => {
			if (e.ctrlKey || e.metaKey) {
				switch(e.key.toLowerCase()) {
					case 'b': e.preventDefault(); this.formatDoc('bold'); break
					case 'i': e.preventDefault(); this.formatDoc('italic'); break
					case 'u': e.preventDefault(); this.formatDoc('underline'); break
				}
			}
		})
	}

	formatDoc(cmd, value = null) {
		document.execCommand(cmd, false, value)
		if (this.editor) this.editor.focus()
	}

	insertCode() {
		const sel = window.getSelection()
		const text = sel.toString() || 'codigo'
		document.execCommand('insertHTML', false, `<code>${text}</code>`)
	}

	insertCodeBlock() {
		const code = prompt('Escribe el código:')
		if (code) document.execCommand('insertHTML', false, `<pre><code>${code}</code></pre>`)
	}

	openLatexModal(type) {
		this.currentLatexType = type
		document.getElementById('latexModal').classList.add('active')
		document.getElementById('latexInput').value = ''
		document.getElementById('latexPreview').innerHTML = ''
		document.getElementById('latexInput').focus()
	}

	closeLatexModal() {
		document.getElementById('latexModal').classList.remove('active')
	}

	insertLatex() { 
		const formula = document.getElementById('latexInput').value.trim()
		if (!formula) return
		const latexMarkdown =
			this.currentLatexType === 'block'
			? `$$\n${formula}\n$$`
			: `\\(${formula}\\)`
		const sel = window.getSelection()
		if (!sel.rangeCount) return
		const range = sel.getRangeAt(0)
		range.deleteContents()
		const textNode = document.createTextNode(latexMarkdown)
		range.insertNode(textNode)
		range.setStartAfter(textNode)
		range.setEndAfter(textNode)
		sel.removeAllRanges()
		sel.addRange(range)
		this.closeLatexModal()
		this.renderLatexInEditor()
	}


	renderLatexInEditor() {
		if (!this.editor) return
		const html = this.editor.innerHTML
		const inlineRegex = /\\\((.+?)\\\)/g
		const blockRegex = /\$\$([\s\S]+?)\$\$/g
		let rendered = html
		rendered = rendered.replace(blockRegex, (_, f) => {
			return katex.renderToString(f.trim(), {
				displayMode: true,
				throwOnError: false
			})
		})
		rendered = rendered.replace(inlineRegex, (_, f) => {
			return katex.renderToString(f.trim(), {
				displayMode: false,
				throwOnError: false
			})
		})
		this.editor.innerHTML = rendered
	}



	insertLink() {
		const url = prompt('URL del enlace:')
		if (url) document.execCommand('createLink', false, url)
	}

	htmlToMarkdown(html) {
		let m = html
		m = m.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
		m = m.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
		m = m.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
		m = m.replace(/<(strong|b)[^>]*>(.*?)<\/(strong|b)>/gi, '**$2**')
		m = m.replace(/<(em|i)[^>]*>(.*?)<\/(em|i)>/gi, '*$2*')
		m = m.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
		m = m.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
		m = m.replace(/<ul[^>]*>(.*?)<\/ul>/gis, x => x.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n'))
		m = m.replace(/<ol[^>]*>(.*?)<\/ol>/gis, x => {
			let c = 1
			return x.replace(/<li[^>]*>(.*?)<\/li>/gi, (_, t) => `${c++}. ${t}\n`)
		})
		m = m.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
		m = m.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
		m = m.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
		m = m.replace(/<br\s*\/?>/gi, '\n')
		m = m.replace(/<div[^>]*>/gi, '')
		m = m.replace(/<\/div>/gi, '\n')
		m = m.replace(/<[^>]+>/g, '')
		m = m.replace(/\n{3,}/g, '\n\n')
		return m.trim()
	}

	exportMarkdown() {
		const html = this.editor.innerHTML
		const md = this.htmlToMarkdown(html)
		const blob = new Blob([md], { type: 'text/markdown' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'documento.md'
		a.click()
		URL.revokeObjectURL(url)
	}

	viewSource() {
		const html = this.editor.innerHTML
		const md = this.htmlToMarkdown(html)
		document.getElementById('sourceInput').value = md
		document.getElementById('sourceModal').classList.add('active')
	}

	closeSourceModal() {
		document.getElementById('sourceModal').classList.remove('active')
	}

	applySource() {
		const md = document.getElementById('sourceInput').value
		this.editor.innerHTML = marked.parse(md)
		this.closeSourceModal()
	}

	async init() {
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => this.createMarkdownEditor())
		} else {
			this.createMarkdownEditor()
		}
	}
}

export default Form
