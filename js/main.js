const previousText = document.getElementById('previous')
const currentText = document.getElementById('current')

let current = ''
let previous = ''
let operation = null
let overwrite = false

function updateDisplay(){
  currentText.textContent = current === '' ? '0' : current
  previousText.textContent = previous && operation ? `${previous} ${operation}` : ''
}

function appendNumber(num){
  if(overwrite){
    current = num === '.' ? '0.' : num
    overwrite = false
    return
  }
  if(num === '.' && current.includes('.')) return
  if(current === '0' && num !== '.') current = num
  else current = current + num
}

function chooseOperation(op){
  if(current === '' && previous === '') return
  if(previous === ''){
    previous = current || '0'
    operation = op
    current = ''
  } else if(current === ''){
    operation = op
  } else {
    compute()
    operation = op
    previous = current
    current = ''
  }
}

function compute(){
  const prev = parseFloat(previous)
  const curr = parseFloat(current)
  if(isNaN(prev) || isNaN(curr)) return
  let result = 0
  switch(operation){
    case '+': result = prev + curr; break
    case '-': result = prev - curr; break
    case '*': result = prev * curr; break
    case '/': result = curr === 0 ? 'Error' : prev / curr; break
    default: return
  }
  current = result === 'Error' ? 'Error' : (Math.round((result + Number.EPSILON) * 1e12) / 1e12).toString()
  previous = ''
  operation = null
  overwrite = true
}

function clearAll(){
  current = ''
  previous = ''
  operation = null
  overwrite = false
}

function deleteDigit(){
  if(overwrite){
    current = ''
    overwrite = false
    return
  }
  current = current.toString().slice(0,-1)
}

// Attach event listeners
document.querySelectorAll('[data-number]').forEach(btn => {
  btn.addEventListener('click', () => {
    appendNumber(btn.dataset.number)
    updateDisplay()
  })
})

document.querySelectorAll('[data-operation]').forEach(btn => {
  btn.addEventListener('click', () => {
    chooseOperation(btn.dataset.operation)
    updateDisplay()
  })
})

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
  clearAll()
  updateDisplay()
})

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
  deleteDigit()
  updateDisplay()
})

document.querySelector('[data-action="equals"]').addEventListener('click', () => {
  if(operation == null || current === '' || previous === '') return
  compute()
  updateDisplay()
})

// Keyboard support
window.addEventListener('keydown', e => {
  if((/\d/).test(e.key)){
    appendNumber(e.key)
    updateDisplay()
  }
  if(e.key === '.'){
    appendNumber('.')
    updateDisplay()
  }
  if(['+','-','*','/'].includes(e.key)){
    chooseOperation(e.key)
    updateDisplay()
  }
  if(e.key === 'Enter' || e.key === '='){
    if(operation == null || current === '' || previous === '') return
    compute()
    updateDisplay()
  }
  if(e.key === 'Backspace'){
    deleteDigit()
    updateDisplay()
  }
  if(e.key.toLowerCase() === 'c'){
    clearAll()
    updateDisplay()
  }
})

// Initialize
updateDisplay()
