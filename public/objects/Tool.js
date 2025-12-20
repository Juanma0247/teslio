import ExtT from "../objects/ExtT.js"

class Tool {
	constructor() {
		this.workplace = document.querySelector(".workplace")
		this.pyodide = null
		this.fsReady = false
		this.blockCounter = 0
		this.editors = {}
		this.currentFile = null
		this.installing = false
		this.init()
	}
 
	init = () => {
		this.createLayout()
		this.createEvents()
		this.loadPyodide()
	}

	createLayout = () => {
		this.container = document.createElement("div")
		this.container.className = "tool_container"

		this.sidebar = document.createElement("div")
		this.sidebar.className = "tool_sidebar"

		this.btnRun = document.createElement("button")
		this.btnRun.className = "tool_btn_run"
		this.btnRun.textContent = "Run"

		this.btnClear = document.createElement("button")
		this.btnClear.className = "tool_btn_clear"
		this.btnClear.textContent = "Clear"

		this.btnNew = document.createElement("button")
		this.btnNew.className = "tool_btn_new"
		this.btnNew.textContent = "New Block"

		this.filesArea = document.createElement("div")
		this.filesArea.className = "tool_files"

		this.sidebar.appendChild(this.btnRun)
		this.sidebar.appendChild(this.btnClear)
		this.sidebar.appendChild(this.btnNew)
		this.sidebar.appendChild(this.filesArea)

		this.blocks = document.createElement("div")
		this.blocks.className = "tool_blocks"

		this.output = document.createElement("pre")
		this.output.className = "tool_output"

		this.container.appendChild(this.sidebar)
		this.container.appendChild(this.blocks)
		this.container.appendChild(this.output)

		this.workplace.appendChild(this.container)
	}

		createInterfaceElements = () => {
			const splitContainer = document.createElement('div')
			splitContainer.className = 'tool-split-container' 			
			this.editorPanel = document.createElement('div')
			this.editorPanel.className = 'tool-editor-panel'
			this.editorPanel.id = 'editorPanel'
			this.editorPanel.style.width = '50%'
			this.editorPanelEnd = document.createElement('div')
			this.editorPanelEnd.id = 'editorPanelEnd'
			this.editorPanel.appendChild(this.editorPanelEnd)
			this.divider = document.createElement('div')
			this.divider.className = 'tool-divider'
			this.divider.id = 'divider'
			this.outputPanel = document.createElement('div')
			this.outputPanel.className = 'tool-output-panel'
			this.outputPanel.id = 'outputPanel'
			this.outputPanel.style.width = '50%'
			splitContainer.appendChild(this.editorPanel)
			splitContainer.appendChild(this.divider)
			splitContainer.appendChild(this.outputPanel)
			this.addButtonCont = document.createElement('div')
			this.addButtonCont.className = 'tool-add-button-cont'
			this.addBlockBtn = document.createElement('button')
			this.addBlockBtn.className = 'tool-add-block-btn'
			this.addBlockBtn.id = 'addBlockBtn'
			this.addBlockBtn.textContent = 'Agregar Bloque'
			this.addButtonCont.appendChild(this.addBlockBtn)
			this.container.appendChild(splitContainer)
			this.container.appendChild(this.addButtonCont)
			this.addBlockBtnCont = this.addButtonCont
			this.blockCounter = 0
		}

	extractImports = code => {
		const imports = new Set()
		const lines = code.split('\n')
		const stdlibModules = new Set([
			'math', 'random', 'datetime', 'time', 'os', 'sys', 'json',
			'collections', 're', 'itertools', 'functools', 'operator',
			'pathlib', 'string', 'textwrap', 'unicodedata', 'io',
			'statistics', 'decimal', 'fractions', 'cmath', 'array'
		])
		const packageMap = {
			'numpy': 'numpy',
			'np': 'numpy',
			'pandas': 'pandas',
			'pd': 'pandas',
			'matplotlib': 'matplotlib',
			'plt': 'matplotlib',
			'scipy': 'scipy',
			'sympy': 'sympy',
			'sp': 'sympy',
			'sklearn': 'scikit-learn',
			'seaborn': 'seaborn',
			'sns': 'seaborn',
			'PIL': 'pillow',
			'cv2': 'opencv-python',
			'requests': 'requests',
			'bs4': 'beautifulsoup4',
			'lxml': 'lxml'
		}
		for (let line of lines) {
			line = line.trim()
			const importMatch = line.match(/^import\s+(\w+)/)
			if (importMatch) {
				const pkg = importMatch[1]
				if (!stdlibModules.has(pkg)) imports.add(packageMap[pkg] || pkg)
			}
			const fromMatch = line.match(/^from\s+(\w+)/)
			if (fromMatch) {
				const pkg = fromMatch[1]
				if (!stdlibModules.has(pkg)) imports.add(packageMap[pkg] || pkg)
			}
		}
		return Array.from(imports)
	}

	installPackages = async (packages, blockId) => {
		const outputDiv = document.getElementById(`output-content-${blockId}`)
		if (!packages || packages.length === 0) return
		for (let pkg of packages) {
			try {
				if (outputDiv) outputDiv.textContent = `Instalando ${pkg}...`
				await this.pyodide.loadPackage(pkg)
			} catch (error) {
				console.warn(`No se pudo instalar ${pkg}:`, error)
			}
		}
	}

	loadProjectFont = async () => {
		try {
			const fontPath = './font/latinModernRoman.otf'
			const response = await fetch(fontPath)
			if (!response.ok) throw new Error(`No se pudo cargar la fuente: ${response.status}`)
			const arrayBuffer = await response.arrayBuffer()
			const uint8Array = new Uint8Array(arrayBuffer)
			this.pyodide.FS.writeFile('/font.otf', uint8Array)
			this.fontFile = 'latinModernRoman.otf'
			await this.setupMatplotlibFont()
		} catch (error) {
			console.error('Error cargando fuente:', error)
		}
	}

	setupMatplotlibFont = async () => {
		if (!this.fontFile) return
		try {
			await this.pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
try:
    import seaborn as sns
    sns.set(style="whitegrid")
except:
    pass
fname = '/font.otf'
fm.fontManager.addfont(fname)
font_name = fm.FontProperties(fname=fname).get_name()
plt.rcParams.update({
    'font.family': 'serif',
    'font.serif': [font_name],
    'pdf.fonttype': 42,
    'ps.fonttype': 42,
    "mathtext.fontset": "custom",
    "mathtext.rm": font_name,
    "mathtext.it": font_name,
    "mathtext.bf": font_name,
})
try:
    sns.set_theme(rc={'font.family': 'serif', 'font.serif': [font_name]})
except:
    pass
plt.close('all')
print(f"✅ Fuente configurada: {font_name}")
			`)
		} catch (error) {
			console.error('Error configurando fuente:', error)
		}
	}

	loadPyodide = async () => {
		try {
			this.addBlockBtnCont.style.display = 'none' 
			this.pyodide = await loadPyodide({
				indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
			})
			await this.pyodide.loadPackage(['matplotlib', 'numpy'])
			await this.pyodide.runPythonAsync(`
import matplotlib
matplotlib.use('AGG')
import matplotlib.pyplot as plt
_global_namespace = {} 
			`)
			this.pyodideReady = true
			await this.addCodeBlock().then((blockId) => {
			this.editors[blockId].setValue(`import numpy as np
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.colors import LinearSegmentedColormap
from mpl_toolkits.mplot3d import Axes3D

u = np.linspace(0, 2 * np.pi, 100)
v = np.linspace(0, 2 * np.pi, 100)
u, v = np.meshgrid(u, v)
R = 2
r = 0.5
x = (R + r * np.cos(v)) * np.cos(u)
y = (R + r * np.cos(v)) * np.sin(u)
z = r * np.sin(v) + np.sin(3 * u) * 0.3

colors_list = ['#888888', '#4A90E2']
n_bins = 100
cmap = LinearSegmentedColormap.from_list('custom', colors_list, N=n_bins)
fig = plt.figure(figsize=(12, 9))
ax = fig.add_subplot(111, projection='3d')
surf = ax.plot_surface(x, y, z, cmap=cmap, alpha=0.8, linewidth=0, antialiased=True)
colorbar = fig.colorbar(surf, shrink=0.5, aspect=5)
colorbar.set_label('Gradiente', rotation=270, labelpad=15)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
ax.set_title('Toro Ondulado 3D')
ax.view_init(elev=30, azim=60)
plt.tight_layout()
plt.show()
`)
		ExtT.loaderStop() 		
		})  
			this.addBlockBtnCont.style.display = 'flex'
			await this.loadProjectFont()
		} catch (error) {
			console.error('Error cargando pyodide', error)
		}
	}

	addCodeBlock = () => {
		return new Promise((resolve) => {  // Añadir return y Promise
			this.blockCounter++
			const blockId = this.blockCounter
			const codeBlock = document.createElement('div')
			// codeBlock.style.height = "300px" 
			codeBlock.className = 'tool-code-block'
			codeBlock.id = `block-${blockId}`
			const editorWrapper = document.createElement('div')
			editorWrapper.className = 'tool-editor-wrapper'
			editorWrapper.id = `editor-${blockId}`
			codeBlock.appendChild(editorWrapper)
			const outputBlock = document.createElement('div')
			outputBlock.className = 'tool-code-block'
			outputBlock.id = `output-${blockId}`
			
			const copylButton = document.createElement('button')
			copylButton.className = 'tool-block-copyl-btn'
			copylButton.disabled = !this.pyodideReady		
			const img_copylButton = ExtT.createElement("img", "img_copylButton", copylButton) 
			img_copylButton.classList.add('tool_ico_button') 
			img_copylButton.src = "./img/ico/copyl.svg" 		
			ExtT.changeIcoColor(img_copylButton, "--c2")
			img_copylButton.addEventListener("mouseenter", () => {
				ExtT.changeIcoColor(img_copylButton, "--c1") 
			})
			img_copylButton.addEventListener("mouseleave", () => { 
				ExtT.changeIcoColor(img_copylButton, "--c2")
			})
			copylButton.addEventListener('click', () => this.copyCodeBlock(blockId))
			
			const copyrButton = document.createElement('button')
			copyrButton.className = 'tool-block-copyr-btn'
			copyrButton.disabled = !this.pyodideReady
			const img_copyrButton = ExtT.createElement("img", "img_copyrButton", copyrButton) 
			img_copyrButton.classList.add('tool_ico_button')
			img_copyrButton.src = "./img/ico/copyr.svg" 		
			ExtT.changeIcoColor(img_copyrButton, "--c2")
			img_copyrButton.addEventListener("mouseenter", () => {
				ExtT.changeIcoColor(img_copyrButton, "--c1") 
			})
			img_copyrButton.addEventListener("mouseleave", () => { 
				ExtT.changeIcoColor(img_copyrButton, "--c2")
			})
			copyrButton.addEventListener('click', () => this.copyConsoleBlock(blockId))

			const deleteButton = document.createElement('button')
			deleteButton.className = 'tool-block-delete-btn'
			deleteButton.disabled = !this.pyodideReady
			const img_deleteButton = ExtT.createElement("img", "img_deleteButton", deleteButton) 
			img_deleteButton.classList.add('tool_ico_button')
			img_deleteButton.src = "./img/ico/delete.svg" 		
			ExtT.changeIcoColor(img_deleteButton, "--c2")
			img_deleteButton.addEventListener("mouseenter", () => {
				ExtT.changeIcoColor(img_deleteButton, "--c1") 
			})
			img_deleteButton.addEventListener("mouseleave", () => { 
				ExtT.changeIcoColor(img_deleteButton, "--c2")
			})
			deleteButton.addEventListener('click', () => this.deleteBlock(blockId))

			const runButton = document.createElement('button')
			runButton.className = 'tool-block-run-btn'
			runButton.disabled = !this.pyodideReady
			const img_runButton = ExtT.createElement("img", "img_runButton", runButton) 
			img_runButton.classList.add('tool_ico_button')
			img_runButton.src = "./img/ico/play.svg" 		
			ExtT.changeIcoColor(img_runButton, "--c2")
			img_runButton.addEventListener("mouseenter", () => {
				ExtT.changeIcoColor(img_runButton, "--c1") 
			})
			img_runButton.addEventListener("mouseleave", () => { 
				ExtT.changeIcoColor(img_runButton, "--c2") 
			})
			runButton.addEventListener('click', () => this.runBlock(blockId))

			const outputContent = document.createElement('div')
			outputContent.className = 'tool-output-content'
			outputContent.id = `output-content-${blockId}`
			const plotsContainer = document.createElement('div')
			plotsContainer.className = 'tool-plots-container'
			plotsContainer.id = `plots-${blockId}`
			outputBlock.appendChild(copylButton)
			outputBlock.appendChild(copyrButton)
			outputBlock.appendChild(deleteButton)
			outputBlock.appendChild(runButton)
			outputBlock.appendChild(outputContent)
			outputBlock.appendChild(plotsContainer)
			const editorPanelEnd = this.editorPanelEnd
			this.editorPanel.insertBefore(codeBlock, editorPanelEnd)
			this.outputPanel.appendChild(outputBlock)

			setTimeout(() => {
				this.initEditor(blockId)
				this.syncBlockHeights(blockId)
				resolve(blockId) // Resolver la promesa con el blockId
			}, 100)
		})  // Cerrar Promise
	}

	syncBlockHeights = blockId => {
		const codeBlock = document.getElementById(`block-${blockId}`)
		const outputBlock = document.getElementById(`output-${blockId}`)
		if (!codeBlock || !outputBlock) return
		let last = 0
		let raf = null
		const update = () => {
			const codeH = codeBlock.scrollHeight
			const outputBlockH = outputBlock.scrollHeight
			let t = Math.max(codeH, outputBlockH)
			if (Math.abs(t - last) <= 1) return
			last = t
			if (raf) cancelAnimationFrame(raf)
			raf = requestAnimationFrame(() => {
				codeBlock.style.height = t + 'px'
				outputBlock.style.height = t + 'px'
			})
		}
		const ro = new ResizeObserver(update)
		ro.observe(codeBlock)
		ro.observe(outputBlock)
		const editor = this.editors[blockId]
		if (editor && editor.session) {
			editor.session.on('change', update)
			editor.session.on('changeScrollTop', update)
		}
		update()
	}

	initEditor = blockId => {
		const editor = ace.edit(`editor-${blockId}`)
		editor.setTheme('ace/theme/one_dark')
		editor.session.setMode('ace/mode/python')
		editor.setOptions({
			fontSize: '1rem',
			showPrintMargin: false,
			enableSnippets: true,
			tabSize: 2,
			useSoftTabs: true,
			minLines: 10,
			maxLines: Infinity
		})
		editor.commands.addCommand({
			name: 'runCode',
			bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
			exec: () => this.runBlock(blockId)
		})
		this.editors[blockId] = editor
		const textarea = editor.textInput.getElement()
		textarea.setAttribute('autocomplete', 'off')
		textarea.setAttribute('autocorrect', 'off')
		textarea.setAttribute('autocapitalize', 'off')
		textarea.setAttribute('spellcheck', 'false')
		textarea.setAttribute('data-gramm', 'false')
		textarea.setAttribute('data-gramm_editor', 'false')
		textarea.setAttribute('data-enable-grammarly', 'false')
		const container = editor.container
		container.setAttribute('autocomplete', 'off')
		container.setAttribute('autocorrect', 'off')
		container.setAttribute('autocapitalize', 'off')
		container.setAttribute('spellcheck', 'false')
		setTimeout(() => {
			const completer = editor.completer
			if (completer && completer.popup) {
				completer.popup.container.style.marginTop = '20px'
				completer.popup.container.style.marginLeft = '30px'
			}
		}, 100)
	}

	runBlock = async blockId => {
		if (!this.pyodideReady || !this.pyodide) return
		const editor = this.editors[blockId]
		if (!editor) return
		const code = editor.getValue()
		if (!code) return
		const outputDiv = document.getElementById(`output-content-${blockId}`)
		const plotsDiv = document.getElementById(`plots-${blockId}`)
		if (outputDiv) {
			outputDiv.className = 'output-content executing'
			outputDiv.textContent = 'Analizando dependencias...'
		}
		if (plotsDiv) plotsDiv.innerHTML = ''
		try {
			const packages = this.extractImports(code)
			if (packages.length > 0) await this.installPackages(packages, blockId)
			if (outputDiv) outputDiv.textContent = '...'
			let outputText = []
			this.pyodide.setStdout({ batched: text => outputText.push(text) })
			await this.pyodide.runPythonAsync(`
import io
import base64
import matplotlib.pyplot as plt
_plots = []
_svg_plots = []
_original_show = plt.show
def custom_show():
    buf_png = io.BytesIO()
    plt.savefig(buf_png, format='png', dpi=1000, bbox_inches='tight')
    buf_png.seek(0)
    img_base64 = base64.b64encode(buf_png.read()).decode('utf-8')
    _plots.append(img_base64)
    buf_svg = io.BytesIO()
    plt.savefig(buf_svg, format='svg', bbox_inches='tight')
    buf_svg.seek(0)
    svg_base64 = base64.b64encode(buf_svg.read()).decode('utf-8')
    _svg_plots.append(svg_base64)
    plt.close()
plt.show = custom_show
`)
			const transformComplete = this.transformCodeForAutoComplete(code)
			const normalizedCode = transformComplete.replace(/\r\n/g, '\n').replace(/\r/g, '\n')
			const escapedCode = normalizedCode.replace(/\\/g, '\\\\').replace(/"""/g, '\\"""')
			await this.pyodide.runPythonAsync(editor.getValue())
			const plots = this.pyodide.globals.get('_plots').toJs()
			const svgPlots = this.pyodide.globals.get('_svg_plots').toJs()
			if (outputText.length > 0) {
				if (outputDiv) {
					outputDiv.className = 'output-content success'
					outputDiv.style.whiteSpace = 'pre-wrap'
					outputDiv.textContent = outputText.join('\n')
				}
			} else if (plots.length > 0) {
				if (outputDiv) outputDiv.className = 'output-content success'
			} else {
				if (outputDiv) outputDiv.className = 'output-content success'
			}
			if (plots.length > 0) {
				plots.forEach((pngData, idx) => {
					const plotItem = document.createElement('div')
					plotItem.className = 'tool-plot-item'
					const plotHeader = document.createElement('div')
					plotHeader.className = 'tool-plot-header'
					const plotButtons = document.createElement('div')
					plotButtons.className = 'tool-plot-buttons'
					const btnPng = document.createElement('button')
					btnPng.className = 'tool-download-btn png'
					btnPng.textContent = 'PNG'
					const btnSvg = document.createElement('button')
					btnSvg.className = 'tool-download-btn svg'
					btnSvg.textContent = 'SVG'
					const plotImg = document.createElement('img')
					plotImg.className = 'tool-plot-image'
					plotImg.src = `data:image/png;base64,${pngData}`
					plotImg.alt = `Graph ${idx + 1}`
					btnPng.addEventListener('click', () => this.downloadPlot(pngData, 'png', blockId, idx + 1))
					btnSvg.addEventListener('click', () => this.downloadPlot(svgPlots[idx], 'svg', blockId, idx + 1))
					plotButtons.appendChild(btnPng)
					plotButtons.appendChild(btnSvg)
					plotHeader.appendChild(plotButtons)
					plotItem.appendChild(plotHeader)
					plotItem.appendChild(plotImg)
					plotsDiv.appendChild(plotItem)
				})
			}
		} catch (error) {
			if (outputDiv) outputDiv.className = 'output-content error'
			let msg = (error && error.message) || ''
			const lines = msg.split('\n')
			let errorType = ''
			let lineNumber = ''
			let description = ''
			for (let line of lines.reverse()) {
				line = line.trim()
				if (line.match(/^[A-Za-z]*Error:/)) {
					const parts = line.split(':')
					errorType = parts[0]
					description = parts.slice(1).join(':').trim()
					break
				}
			}
			for (let line of lines) {
				const m = line.match(/File "<string>", line (\d+)/)
				if (m) {
					lineNumber = m[1]
					break
				}
			}
			const finalMsg = `${errorType} (línea ${lineNumber}): ${description}`
			if (outputDiv) outputDiv.textContent = finalMsg
			console.error(error)
		}
	}

	transformCodeForAutoComplete = code => {
		const reservedWords = [
			"break", "continue", "pass", "return", "import", "from",
			"def", "class", "if", "elif", "else", "for", "while",
			"try", "except", "finally", "with", "lambda", "yield",
			"raise", "global", "nonlocal", "assert", "del", "as",
			"is", "not", "and", "or", "in"
		]
		const isReservedWord = w => reservedWords.includes(w)
		const newLines = []
		const importMap = {
			np: 'import numpy as np',
			plt: 'import matplotlib.pyplot as plt'
		}
		for (const shortName in importMap) {
			const re = new RegExp(`\\b${shortName}\\b`)
			const alreadyImported = new RegExp(`(^|\\n)\\s*(import\\s+.*\\b${shortName}\\b|from\\s+.*\\b${shortName}\\b)`)
			if (re.test(code) && !alreadyImported.test(code)) newLines.push(importMap[shortName])
		}
		const lines = code.split('\n')
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i]
			let trimmed = line.trim()
			const indent = (line.match(/^\s*/)[0]) || ''
			const colonKeywords = ["if", "elif", "else", "for", "while", "def", "class", "try", "except", "finally", "with"]
			if (!trimmed.endsWith(':')) {
				const firstWord = trimmed.split(/[\s\(]/)[0]
				if (colonKeywords.includes(firstWord)) trimmed = `${line}:`
			}
			if (/^for\s+[A-Za-z_][A-Za-z0-9_]*\s+in\s+.+:\s*$/.test(trimmed)) {
				const m = trimmed.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+?):\s*$/)
				if (m) {
					const v = m[1]
					let expr = m[2].trim()
					if (!/^\s*range\s*\(|^[\[\(\{]/.test(expr)) {
						if (expr.includes(',')) {
							const nums = expr.split(",").map(s => s.trim()).filter(s => s !== "")
							if (nums.length === 2) expr = `range(${nums.join(", ")})`
							else if (nums.length >= 3) expr = `range(${nums.join(", ")})`
						} else {
							if (/^[A-Za-z0-9_\.]+$/.test(expr)) expr = `range(${expr})`
						}
					}
					newLines.push(`${indent}for ${v} in ${expr}:`)
					continue
				}
			}
			const firstWord = trimmed.split(/[\s\(]/)[0]
			if (isReservedWord(firstWord)) {
				newLines.push(line)
				continue
			}
			if (/^[^=]*=[^=]/.test(trimmed) && !trimmed.includes("==") && !trimmed.includes("!=") && !trimmed.includes("<=") && !trimmed.includes(">=")) {
				newLines.push(line)
				continue
			}
			if (trimmed.startsWith("def ") || trimmed.startsWith("class ")) {
				newLines.push(line)
				continue
			}
			if (trimmed.startsWith("@")) {
				newLines.push(line)
				continue
			}
			if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
				newLines.push(line)
				continue
			}
			if (trimmed.endsWith(":")) {
				newLines.push(line)
				continue
			}
			if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(trimmed)) {
				newLines.push(`${indent}print(${trimmed})`)
				continue
			}
			if (/^[\d\.]+(e[\+\-]?\d+)?$/.test(trimmed) || /^["'].*["']$/.test(trimmed)) {
				newLines.push(`${indent}print(${trimmed})`)
				continue
			}
			if (/^[\[\(\{].*[\]\)\}]$/.test(trimmed)) {
				newLines.push(`${indent}print(${trimmed})`)
				continue
			}
			if (/\[.*for.*in.*\]/.test(trimmed) || /\{.*for.*in.*\}/.test(trimmed)) {
				newLines.push(`${indent}print(${trimmed})`)
				continue
			}
			newLines.push(line)
		}
		return newLines.join('\n')
	}

	copyCodeBlock = async blockId => {
		const editor = this.editors[blockId]
		if (!editor) return
		const code = editor.getValue().trim()
		try {
			await navigator.clipboard.writeText(code)
			console.log('Código copiado al portapapeles')
		} catch (err) {
			console.error('Error al copiar código:', err)
		}
	}
 
	copyConsoleBlock = async blockId => {
		const el = document.getElementById(`output-content-${blockId}`)
		if (!el) return
		try {
			await navigator.clipboard.writeText(el.textContent)
			console.log('Salida copiada al portapapeles')
		} catch (err) {
			console.error('Error al copiar salida:', err)
		}
	}

	deleteBlock = blockId => {
		const codeBlock = document.getElementById(`block-${blockId}`)
		const outputBlock = document.getElementById(`output-${blockId}`)
		if (codeBlock) codeBlock.remove()
		if (outputBlock) outputBlock.remove()
		if (this.editors[blockId]) {
			this.editors[blockId].destroy()
			delete this.editors[blockId]
		}
	}

	downloadPlot = (data, format, blockId, plotNum) => {
		const link = document.createElement('a')
		link.href = `data:image/${format};base64,${data}`
		link.download = `grafica_bloque${blockId}_${plotNum}.${format}`
		link.click()
	}

	createEvents = () => {
		this.createInterfaceElements()
		if (this.divider) {
			this.divider.addEventListener('mousedown', () => this.isDragging = true)
		}
		document.addEventListener('mousemove', e => {
			if (!this.isDragging) return
			const container = this.container.querySelector('.split-container') || this.container
			const containerWidth = container.offsetWidth
			const newPosition = (e.clientX / containerWidth) * 100
			if (newPosition >= 20 && newPosition <= 80) {
				this.editorPanel.style.width = `${newPosition}%`
				this.outputPanel.style.width = `${100 - newPosition}%`
			}
		})
		document.addEventListener('mouseup', () => this.isDragging = false)
		this.addBlockBtn.addEventListener('click', () => this.addCodeBlock())
	}

	exportProject = () => {
		const blocks = Object.keys(this.editors).map(id => {
			return {
				id,
				code: this.editors[id].getValue()
			}
		})
		const blob = new Blob([JSON.stringify(blocks, null, 2)], { type: 'application/json' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'project.json'
		a.click()
		URL.revokeObjectURL(url)
	}

	importProject = async file => {
		const text = await file.text()
		const data = JSON.parse(text)
		for (const b of data) {
			this.addCodeBlock()
			const id = this.blockCounter
			const ed = this.editors[id]
			if (ed) ed.setValue(b.code)
		}
	}

	close = () => {
		for (const id in this.editors) {
			try {
				this.editors[id].destroy()
			} catch {}
		}
		this.editors = {}
		this.container.remove()
	}

}

export default Tool
