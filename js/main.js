'use strict'

import { lerContatos } from "./contato.js"
import { criarContato } from "./contato.js"

const main = document.querySelector('main')
const btnNovoContato = document.getElementById('novo-contato')
const btnCancelar = document.getElementById('cancelar')
const btnSalvar = document.getElementById('salvar')

const previewImage = document.getElementById('preview-image')
const inputFoto = document.getElementById('foto')

let fotoBase64 = previewImage.src

function exibirContatos(contatos) {
    const containerPrincipal = document.getElementById('container')
    containerPrincipal.innerHTML = ''

    contatos.forEach(contato => {
        const divContato = document.createElement('div')
        divContato.className = 'card-contato'

        const img = document.createElement('img')
        img.src = contato.foto
        img.alt = `Foto de ${contato.nome}`

        const nome = document.createElement('h3')
        nome.textContent = contato.nome

        const celular = document.createElement('p')
        celular.textContent = contato.celular
        
        divContato.appendChild(img)
        divContato.appendChild(nome)
        divContato.appendChild(celular)

        containerPrincipal.appendChild(divContato)
    })
}

async function carregarContatos() {
    const listaDeContatos = await lerContatos()
    
    if (Array.isArray(listaDeContatos)) {
        exibirContatos(listaDeContatos)
    }
}

function limparFormulario() {
    document.getElementById('nome').value = ''
    document.getElementById('email').value = ''
    document.getElementById('celular').value = ''
    document.getElementById('endereco').value = ''
    document.getElementById('cidade').value = ''
    
    inputFoto.value = null
    previewImage.src = fotoBase64 = './img/preview-icon.png'
}

function mostrarFormulario() {
    limparFormulario()
    main.classList.remove('card-show')
    main.classList.add('form-show')
}

function mostrarContatos() {
    main.classList.remove('form-show')
    main.classList.add('card-show')
    carregarContatos()
}

function preverImagem(batatinha) {
    const file = batatinha.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            fotoBase64 = e.target.result
            previewImage.src = fotoBase64
        }
        reader.readAsDataURL(file)
    }
}

async function salvarContato() {
    const novoContato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        foto: fotoBase64
    }

    if (!novoContato.nome) {
        alert('O campo Nome é obrigatório')
        return
    }

    const sucesso = await criarContato(novoContato)

    if (sucesso) {
        alert('Contato salvo com sucesso')
        mostrarContatos()
    } else {
        alert('Falha ao salvar o contato. Verifique a API')
    }
}

btnNovoContato.addEventListener('click', mostrarFormulario)
btnCancelar.addEventListener('click', mostrarContatos)
inputFoto.addEventListener('change', preverImagem)
btnSalvar.addEventListener('click', salvarContato)

document.addEventListener('DOMContentLoaded', carregarContatos)