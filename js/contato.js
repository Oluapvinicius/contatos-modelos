'use strict'

export async function lerContatos() {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos/'

    const response = await fetch (url)
    const contatos = await response.json()

    return contatos
}

export async function criarContato(contato) {
    const url = 'https://bakcend-fecaf-render.onrender.com/contatos/'

    const options = {
        'method': 'POST',
       'headers': {
        'content-type': 'application/json'
       },
       'body': JSON.stringify(contato)
    }
    const response = fetch(url, options)

    console.log((await response).ok)
    return (await response).ok
}

const novoContato = {
    
        "nome": "Paulo Vinicius",
        "celular": "11 9 61518293",
        "foto": "gato.galatico.png",
        "email": "paulovinciiua172@gmail.com",
        "endereco": "Cantinho do Ceu",
        "cidade": "Grajau"
        
}

async function atualizarContato(id, contato) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const options = {
        'method': 'PUT',
       'headers': {
        'content-type': 'application/json'
       },
       'body': JSON.stringify(contato)
    }
    const response = fetch(url, options)

   
    return (await response).ok
}

const novosContato = {
        
        "nome": "Não foi eu :)",
        "celular": "11 9 61518293",
        "foto": "gato.galatico.png",
        "email": "paulovinciiua172@gmail.com",
        "endereco": "Cantinho do Ceu",
        "cidade": "Grajau"
        
}

async function deleteContatos(id) {
    const url = `https://bakcend-fecaf-render.onrender.com/contatos/${id}`

    const options = {
        method : 'DELETE'
    }
    const response = await fetch(url, options)

    console.log(response.ok)
    return response.ok

}
