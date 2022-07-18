
const saveBtn = document.querySelector('.todolist__save')
const clearBtn = document.querySelector('.todolist__clear')
const getInput = document.querySelector('.todolist__input')
const mainCon = document.querySelector('.todolist')
const list = document.createElement('ul')
list.setAttribute('class', 'todolist__list')
mainCon.appendChild(list)
let arr = []

// localStorage.clear()

let todoLists = JSON.parse(localStorage.getItem('todolists'))

if (todoLists) {
    arr = todoLists
    
    removeDisplay()
}

saveBtn.addEventListener('click', () => {
        list.style.display = "block"
        save()
})

getInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter" && e.code === "Enter") {
        save()
    }

})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    arr.splice(0, arr.length)
    insertLists()
    removeDisplay()
})

list.addEventListener('click', e => {

    if(e.target.classList.contains('todolist__done')){
        e.target.parentNode.firstElementChild.style.textDecoration = "line-through"
        e.stopPropagation()
    } else if(e.target.classList.contains('todolist__delete')) {
        list.removeChild(e.target.parentElement)
        firstchild = e.target.parentElement.firstElementChild.innerText;

        const findLocalStorageArrayIndex = todoLists.find(item => {
            return item === firstchild
        })

        const findLocalArrayIndex = todoLists.findIndex(items => {
            return items === findLocalStorageArrayIndex
        })

        console.log(findLocalStorageArrayIndex)
        console.log(findLocalArrayIndex)
        
        todoLists.splice(findLocalArrayIndex, 1)
        localStorage.setItem('todolists', JSON.stringify(todoLists))
        removeDisplay()
    }
    e.stopPropagation()
})


function save() {
    if (getInput.value === "" || getInput.value === null){
        window.alert('Enter tasks..')
    } else {
        arr.push(getInput.value)
        localStorage.setItem('todolists', JSON.stringify(arr))
        insertLists()
        getInput.value = ""
        console.log(arr);
    }
}


function insertLists() {
    let listItems = ""
    for(let i = 0; i < arr.length; i++) {
        listItems += `
        <li class="todolist__items">
            <span class="check">${arr[i]}</span>
            <button class="todolist__done"><i class="fa-solid fa-check"></i></button>
            <button class="todolist__delete"><i class="fa-solid fa-xmark"></i></button>
        </li>
        `
    }
    list.innerHTML = listItems
}


function removeDisplay(){
    if(arr.length != 0 || todoLists.length != 0){
        list.style.display = "block"
        insertLists()
    } else {
        console.log('display none')
        list.style.display = "none"
    }
}
