const btnAdicionarTarefa = document.querySelector(`.app__button--add-task`);
const formAdicionarTarefa = document.querySelector(`.app__form-add-task`);
const ulTarefas = document.querySelector(`.app__section-task-list`)
const textarea = document.querySelector(`.app__form-textarea`);
let tarefasList = JSON.parse(localStorage.getItem(`tarefasList`)) || [];
const btnRemoverConcluidas = document.querySelector(`#btn-remover-concluidas`);
const btnRemoverTodas = document.querySelector(`#btn-remover-todas`);
let paragrafoDescricaoTarefa = document.querySelector(`.app__section-active-task-description`)
let tarefaEditando = null;
let tarefaSelecionada = null;
let liTarefaSelecionada = null;

function criarElementoTarefa(tarefa){
    const li = document.createElement(`li`);
    li.classList.add(`app__section-task-list-item`)
    const svg = document.createElement(`svg`);
    svg.innerHTML = `
        
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        
    `
    const paragrafo = document.createElement(`p`);
    paragrafo.classList.add(`app__section-task-list-item-description`);
    paragrafo.textContent = tarefa.descricao;

    const botao = document.createElement(`button`);
    botao.classList.add(`app_button-edit`);
    botao.onclick = () => {
        editarTarefa(li);
    }

    const imagemBotao = document.createElement(`img`);
    imagemBotao.setAttribute(`src`, `/imagens/edit.png`);

    botao.append(imagemBotao);
    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    if(tarefa.completa) {

        li.classList.add(`app__section-task-list-item-complete`);
        botao.setAttribute(`disabled`, true);

    }else{
        li.onclick = () => {
            document.querySelectorAll(`.app__section-task-list-item-active`)
                .forEach(element => {
                    element.classList.remove(`app__section-task-list-item-active`);
                })
            if(tarefaSelecionada == tarefa){
                paragrafoDescricaoTarefa.textContent = '';
                tarefaSelecionada = null;
                liTarefaSelecionada = null
                return
            }
            tarefaSelecionada = tarefa
            paragrafoDescricaoTarefa.textContent = tarefa.descricao;
            liTarefaSelecionada = li
            li.classList.add(`app__section-task-list-item-active`);
    
    
        }
    }

    return li
}

function atualizarTarefas(){
    localStorage.setItem(`tarefasList`, JSON.stringify(tarefasList));
}


btnAdicionarTarefa.addEventListener(`click`, () => {
    formAdicionarTarefa.classList.toggle(`hidden`)
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (tarefaEditando) {
        const paragrafo = tarefaEditando.querySelector('.app__section-task-list-item-description');
        paragrafo.textContent = textarea.value;
        const index = Array.from(ulTarefas.children).indexOf(tarefaEditando);
        tarefasList[index].descricao = textarea.value;
        atualizarTarefas()
        tarefaEditando = null;
    } else {
        const tarefa = {
            descricao: textarea.value
        }
        tarefasList.push(tarefa);
        ulTarefas.append(criarElementoTarefa(tarefa));
        atualizarTarefas()
    }

    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
    document.querySelector('.app__form-label').textContent = 'Adicionando tarefa';

});

formAdicionarTarefa.querySelector('.app__form-footer__button--cancel').addEventListener('click', () => {
    textarea.value = '';
    formAdicionarTarefa.classList.add('hidden');
});

tarefasList.forEach(tarefa => {
    ulTarefas.append(criarElementoTarefa(tarefa));    
});

function editarTarefa(li) {
    const formEditarExistente = document.querySelector('.app__form-add-task:not(.hidden)');
    if (formEditarExistente) {
        formEditarExistente.remove();
    }
    const paragrafo = li.querySelector('.app__section-task-list-item-description');
    const formEditarTarefa = formAdicionarTarefa.cloneNode(true);
    formEditarTarefa.querySelector('.app__form-label').textContent = 'Editando tarefa';
    formEditarTarefa.querySelector('.app__form-textarea').value = paragrafo.textContent;
    li.after(formEditarTarefa);
    formEditarTarefa.classList.remove('hidden');
    formEditarTarefa.addEventListener('submit', (evento) => {
        evento.preventDefault();
        paragrafo.textContent = formEditarTarefa.querySelector('.app__form-textarea').value;
        const index = Array.from(ulTarefas.children).indexOf(li);
        tarefasList[index].descricao = paragrafo.textContent;
        atualizarTarefas()
        formEditarTarefa.remove();
    });

    formEditarTarefa.querySelector('.app__form-footer__button--cancel').addEventListener('click', () => {
        formEditarTarefa.remove();
    });

    const botaoDeletar = document.querySelector(`.app__form-footer__button--delete`);
    botaoDeletar.addEventListener(`click`, () => {
        const index = Array.from(ulTarefas.children).indexOf(li);
        tarefasList.splice(index,1);
        atualizarTarefas()
        formEditarTarefa.classList.add('hidden');
        li.remove();
    })
}

document.addEventListener(`FocoFinalizado`, () => {
    if(tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove(`app__section-task-list-item-active`);
        liTarefaSelecionada.classList.add(`app__section-task-list-item-complete`);
        liTarefaSelecionada.querySelector(`button`).setAttribute(`disabled`, true);
        tarefaSelecionada.completa = true;
        atualizarTarefas();

    }
})

btnRemoverConcluidas.onclick = () => {
    const seletor = document.querySelectorAll(`.app__section-task-list-item-complete`);
    seletor.forEach(element => {
        element.remove();        
    });
    tarefasList = tarefasList.filter(tarefa => !tarefa.completa);
    atualizarTarefas();
}

btnRemoverTodas.onclick = () => {
    document.querySelectorAll(`.app__section-task-list-item`).forEach(element =>{element.remove()})
    tarefasList = []
    atualizarTarefas();
}
