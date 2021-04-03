const submitBtn = document.querySelector('#submit-btn') 
const apiUrl = document.querySelector('#api-url')
const viewArea = document.querySelector('#view-area')
const requests = document.querySelector('#requests')

const requestNums = parseInt(requests.value)


submitBtn.addEventListener('click', () => {
  let i;
  for (i = 0; i < requestNums; i++) {
    sendRequest()
    console.log(i)
  }
})

async function sendRequest() {
  const link = apiUrl.value
  console.log(requestNums)

  try{
        const response = await fetch(link, {
            method: 'get'
          })
        const data = await response.json()
        let pre = document.createElement("pre");
        pre.innerText = JSON.stringify(data, undefined, 2)
        
        viewArea.appendChild(pre)
        
    
        
        console.log(JSON.stringify(data, undefined, 2))
        // location.reload()

    }catch(err){
        console.log(err)
    }
}
