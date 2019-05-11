let $prompt = document.getElementById('prompt')
let $prev = document.getElementById('prev')
let $key = document.getElementById('key')

const keystrokeDelay = 150
const fastKeystrokeDelay = 50
const startTime = 2000
const keyboardInput = 'whoami\ncat about.md\n'
const finalMessage = 'feel free to type     \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b'
const secondMessageTime = startTime + (keystrokeDelay * (keyboardInput.length + 2))

let $currentText = keyboardInput
let $textIndex = 0
let $mainIntervalID = null
let history = ['ls']
let hi = 1

const render = v => {
    v.forEach(a => {
        let el = document.createElement('pre')
        el.className += a.c || ''
        el.innerText = a.r
        $prev.appendChild(el)
    })
    window.scrollTo(0, document.body.scrollHeight)
}

const rlink = l => {
    let el = document.createElement('a')
    el.href = l
    el.target = '_blank'
    el.innerText = l
    $prev.appendChild(el)
}

const cout = a => render([{ r: a }])
const cerr = a => render([{ c: 'err', r: a }])
const cok = a => render([{ c: 'ok', r: a }])

let files = {
    'github.link': `https://github.com/andredurao`,
    'about.md': `
    # I'm a software developer from Brazil.

    With 10 years of full-stack web development experience,
    I can offer the technical expertise for web solutions.

    Please review my CV, which provides details and examples of skills in:

    * Backend
      Ruby, Ruby On Rails, Node.js, Java
    * Frontend
      HTML, JS, CSS, Vue.js, React, Bootstrap, JQuery
    * Databases
      PostgreSQL, MySQL / MariaDB, MongoDB 
    * Devops
      AWS, EC2, EB, Docker
    * Methodologies
      Agile, Scrum, TDD, BDD`,
    'cv.md': `
    `
}

let funcs = {
    clear() {
        $prev.innerHTML = ''
    },
    echo(...a) {
        cout(a.join(' '))
    },
    help() {
        cout(`ls: show files and directories
cat <file>: print a file out
cv: open cv PDF file
github: open github page
linkedin: open linkedin page
...
`)
    },
    ls() {
        Object.keys(files).forEach(cout)
    },
    cat(f) {
        f.endsWith('.link') ? rlink(files[f]) : cout(files[f])
    },
    whoami() {
        cok(`andredurao`)
    },
    cv() {
        window.open("AndreResume.pdf")
    },
    github() {
        window.open("https://github.com/andredurao")
    },
    linkedin() {
        window.open("https://www.linkedin.com/in/andre-durao")
    },
}

const parse = i => {
    s = i.split(' ').filter(a => a)
    if (s.length === 0) return
    cout('~ $ ' + i)
    if(funcs[s[0]]){
        funcs[s[0]].apply(undefined, s.slice(1))
    } else {
        cerr(`${s[0]}: command not found`)
    }
}

const tabComplete = a => {
    let s = a.split(' ').filter(b => b)
    if (s.length === 0) return a
    for (l of Object.keys(s.length > 1 ? files : funcs)) {
        if (l.startsWith(s[s.length - 1]))
            return [...s.slice(0, -1), l].join(' ')
    }
    return a
}

const showKey = (key='') => {
    $key.classList.toggle("hidden", false)
    $key.classList.toggle("fade-out", false)
    window.setTimeout(() => {
        $key.classList.toggle("fade-out", true)        
    }, keystrokeDelay)
}

const run = () => {
    parse($prompt.value)
    history.push($prompt.value)
    $prompt.value = ''
    hi = history.length
    showKey()
}

const inputText = () => {
    if($textIndex < $currentText.length){
        const char = $currentText[$textIndex]
        if(char == '\n') {
            run()
        } else if(char == '\b'){
            lastPos = $prompt.value.length - 1
            lastPos = lastPos < 0 ? 0 : lastPos
            $prompt.value = $prompt.value.substr(0, lastPos)
        } else {
            $prompt.value += $currentText[$textIndex]
        }
        $textIndex++
    }
}

$prompt.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        run()
    } else if (e.key === 'ArrowUp') {
        if (hi <= history.length && hi > 0) {
            $prompt.value = history[--hi]
        }
    } else if (e.key === 'ArrowDown') {
        if (hi + 1 < history.length && hi >= 0) {
            $prompt.value = history[++hi]
        }
    } else if (e.key === 'Tab') {
        e.preventDefault()
        $prompt.value = tabComplete($prompt.value)
    } else {
        hi = history.length
    }
    //cout(e.key)
})

$prompt.focus()
$prompt.select()

window.setTimeout(() => {
    $mainIntervalID = window.setInterval(inputText, keystrokeDelay)
}, startTime)

window.setTimeout(() => {
    window.clearInterval($mainIntervalID)
}, startTime + (keystrokeDelay * (keyboardInput.length + 1)))

window.setTimeout(() => {
    $textIndex = 0
    $currentText = finalMessage
    $mainIntervalID = window.setInterval(inputText, fastKeystrokeDelay)
}, secondMessageTime)

window.setTimeout(() => {
    window.clearInterval($mainIntervalID)
}, secondMessageTime + (fastKeystrokeDelay * (finalMessage.length + 1)))