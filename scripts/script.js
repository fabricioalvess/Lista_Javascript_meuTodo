const formulario = document.getElementById('form')
const listadeItens = document.getElementById('campoLista')
const ul = document.getElementById('listaDoForm')
const textoForm = document.getElementById('textoForm')
const itens = JSON.parse(localStorage.getItem('item')) || []

itens.forEach(item =>{
    criarNovoElemento(item)
})

formulario.addEventListener('submit', evento =>{

    evento.preventDefault()
   const produto = evento.target.elements[0]
   const quantidade =  evento.target.elements[1]

   const existe = itens.find(item => item.produto === produto.value)

   const novoItem = {
    "produto": produto.value,
    "quantidade": quantidade.value
   }


   if(existe){
        novoItem.id = existe.id
        atualizaElemento(novoItem)
   }else{
        novoItem.id = itens.length
        criarNovoElemento(novoItem)
        itens.push(novoItem)
   }


   localStorage.setItem('item', JSON.stringify(itens))
   mostrarItem()

   produto.value=''
   quantidade.value=''


})

function criarNovoElemento(props){

    const li = document.createElement('li')
    const strong = document.createElement('strong')
    strong.innerHTML = props.quantidade
    strong.dataset.id=props.id
    li.appendChild(strong)
    li.innerHTML += props.produto
    ul.appendChild(li)

}
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML= item.quantidade
}
