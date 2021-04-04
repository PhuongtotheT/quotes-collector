const submitBtn = document.querySelector('#submit-btn') 
const submitBtn2 = document.querySelector('#submit-btn2') 
const apiUrl = document.querySelector('#api-url')
const viewArea = document.querySelector('#view-area')
const requests = document.querySelector('#requests')
const charName = document.querySelector('#name')

submitBtn.addEventListener('click', requestQuotes)
submitBtn2.addEventListener('click', saveQuotes)

function run(num, callback) {
  for (i = 0; i < num; i++) {
    callback()
  }
}

async function requestQuotes() {
  const requestsNum = parseInt(requests.value) || 1
  viewArea.innerHTML = ''

  run(requestsNum, () => {sendRequest().then((data) => display(data)) }) // synchronous - slower

  
}

async function sendRequest() {
  const link = apiUrl.value
  try {
    const response = await fetch(link, {
        method: 'get'
      })
    const data = await response.json()
  // async operation not waiting for each response - faster but not in order
  // let h4 = document.createElement('h4');
  // let pre = document.createElement('pre');
  // pre.innerText = JSON.stringify(data, undefined, 2)
  // h4.innerText = `Request# ${i + 1}`
  // viewArea.appendChild(h4)
  // viewArea.appendChild(pre)
    console.log(data)
    return data
  } catch(err) {
    console.log(err)
  }
}

async function display(data, i) {
  let h4 = document.createElement('h4');
  let pre = document.createElement('pre');
  pre.innerText = JSON.stringify(data, undefined, 2)
  h4.innerText = 'Request'
  viewArea.appendChild(h4)
  viewArea.appendChild(pre)
}

async function saveQuotes() {
  const link = apiUrl.value
  const cName = charName.value

  try{
        const data = await sendRequest()
        const response = await fetch('addQuote', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': cName,
              'data': data[0]
            })
          })
          console.log(data)
    }catch(err){
        console.log(err)
    }
}
