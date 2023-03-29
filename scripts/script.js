const formulario = document.getElementById('form')
const listadeItens = document.getElementById('campoLista')
const ul = document.getElementById('listaDoForm')
const textoForm = document.getElementById('textoForm')
const itens = JSON.parse(localStorage.getItem('itens')) || []

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
        itens[existe.id] = novoItem
   }else{
        novoItem.id = itens[itens.length - 1]? (itens[itens.length - 1]).id + 1 : 0;
        criarNovoElemento(novoItem)
        itens.push(novoItem)
   }


   localStorage.setItem('itens', JSON.stringify(itens))

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
    li.appendChild(botaoDeletar(props.id))
    ul.appendChild(li)


}
function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML= item.quantidade
}

function botaoDeletar(id){
    const botaoDeletar = document.createElement('button')
    botaoDeletar.classList.add('botaoDeletar')
    botaoDeletar.innerHTML = 'x'

    botaoDeletar.addEventListener('click', x =>{
       var elementoSelecionado = x.target.parentElement
       DeletarItemLista(elementoSelecionado, id)
    })

    return botaoDeletar
}

function DeletarItemLista(item, id){
    item.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem('itens', JSON.stringify(itens))

}
