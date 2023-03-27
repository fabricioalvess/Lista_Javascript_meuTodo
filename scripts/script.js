const formulario = document.getElementById('form')
const ul = document.getElementById('listaDoForm')
const itens = []

formulario.addEventListener('submit', evento =>{
    evento.preventDefault()
   const produto = evento.target.elements[0]
   const quantidade =  evento.target.elements[1]

   const novoItem = {
    "produto": produto.value,
    "quantidade": quantidade.value
   }
   itens.push(novoItem)

   console.log(novoItem)

   criarNovoElemento(novoItem)
})

function criarNovoElemento(props){
    const li = document.createElement('li')
    const strong = document.createElement('strong')
    strong.innerHTML = props.quantidade

    li.appendChild(strong)
    li.innerHTML += props.produto

    ul.appendChild(li)

}