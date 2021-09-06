const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
  ]; 

  const listItems = []

  let dragStartIndex

  const swapItems = (start,end) =>{
      const itemOne = listItems[start].querySelector('.draggable')
      const itemTwo = listItems[end].querySelector('.draggable')

      listItems[start].appendChild(itemTwo)
      listItems[end].appendChild(itemOne)
  }

  const checkOrder = () =>{
      listItems.forEach((item,index)=>{
          const personName = item.querySelector('.draggable').innerText.trim()

          if(personName !== richestPeople[index]){
              item.classList.add('wrong')
          }else{
              item.classList.remove('wrong')
              item.classList.add('right')
          }
      })
  }

  function dragStart(){
      //console.log('Event: ','dragstart')
      dragStartIndex = +this.closest('li').getAttribute('data-index')
      console.log(dragStartIndex)
  }

  function dragEnter(){
    //console.log('Event: ','dragenter')
    this.classList.add('over')
  }

  function dragLeave(){
    //console.log('Event: ','dragleave')
    this.classList.remove('over')
  }

  function dragOver(e){
    //console.log('Event: ','dragover')
    e.preventDefault()
  }

  function dragDrop(){
    //console.log('Event: ','drop')
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
  }

  const addEventListeners = () =>{
      const draggbles =  document.querySelectorAll('.draggable')
      const dragListItems = document.querySelectorAll('.draggable-list li')

      draggbles.forEach(draggable => {
          draggable.addEventListener('dragstart', dragStart)
      })

      dragListItems.forEach(item=>{
          item.addEventListener('dragover', dragOver)
          item.addEventListener('drop', dragDrop)
          item.addEventListener('dragenter', dragEnter)
          item.addEventListener('dragleave', dragLeave)
      })
  }

  const createList = () =>{
      [...richestPeople]
      .map(x=>({value: x, sort:Math.random()}))
      .sort((a,b)=>a.sort - b.sort)
      .map(x=>x.value)
      .forEach((person,index)=>{
          const listItem = document.createElement('li')

          listItem.setAttribute('data-index', index)

          listItem.innerHTML= `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable=true>
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
          `
          listItems.push(listItem)

          draggable_list.appendChild(listItem)
      })

      addEventListeners()
  }

  createList()

  check.addEventListener('click',checkOrder)
