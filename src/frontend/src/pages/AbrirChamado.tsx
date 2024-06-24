import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/AbrirChamado.module.css";
import toast, { Toaster } from "react-hot-toast";
import image from "../img/imagem.png";

function AbrirChamado() {
const navigate = useNavigate();
const [titulo, setTitulo] = useState("");
const [descricao, setDescricao] = useState("");
const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
const [categoriaPersonalizada, setCategoriaPersonalizada] = useState('');
const [imagem, setImagem] = useState<File | null>(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [permissionDenied] = useState(false);
const [nomeArquivo, setNomeArquivo] = useState('');
const [tempo, setTempo] = useState<number | null>(null);


const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const fileName = file.name;
    setNomeArquivo(fileName);
};

useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
}, []);


const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titulo.trim() || !descricao.trim() || (!categoriaSelecionada && !categoriaPersonalizada.trim())) {
        toast.error("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        if (token) {
            const formData = new FormData();
            formData.append("titulo", titulo);
            formData.append("descricao", descricao);
            formData.append("categoria", categoriaSelecionada === 'Outro' ? categoriaPersonalizada : categoriaSelecionada);

            const dataCriacao = new Date();
            dataCriacao.setHours(dataCriacao.getHours() - 3);

            formData.append("dataCriacao", dataCriacao.toISOString());

            if (tempo !== null) {
                const dataFinalizacao = new Date(Date.now() + tempo * 60 * 60 * 1000).toISOString();
                formData.append("dataFinalizacao", dataFinalizacao);
            }

            formData.append("token", token);
            if (imagem) {
                formData.append("imagem", imagem);
            }

            const response = await fetch("http://localhost:5000/abrirchamado", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success('Chamado criado com sucesso!');
                setTimeout(() => {
                    navigate("/atendimento");
                }, 1000);
            } else {
                alert("Erro ao enviar chamado.");
            }
        } else {
            alert("Erro de autenticação.");
        }
    } catch (error) {
        console.error("Erro ao criar chamado:", error);
        alert("Erro ao criar chamado. Por favor, tente novamente.");
    }
};





useEffect(() => {
    switch (categoriaSelecionada) {
        case 'Velocidade de internet baixa':
            setTempo(3);
            break;
        case 'Internet instável':
            setTempo(4);
            break;
        case 'Sem conexão de internet':
            setTempo(5);
            break;
        case 'Outro':
            setTempo(null);
            break;
        default:
            setTempo(null);
    }
}, [categoriaSelecionada]);

const handleDescartar = () => {
    toast.success('Chamado descartado com sucesso!');
    setTimeout(() => {
        navigate("/atendimento");
    }, 1000);
};

if (!isLoggedIn || permissionDenied) {
    return (
        <div>
            <h1>Permissão Negada</h1>
            <p>Você precisa estar logado para acessar esta página.</p>
            <button onClick={() => navigate("/login")}>Ir para a página de Login</button>
        </div>
    );
}



return (
    <div className={styles.containerAbrirChamado}>
        <Toaster position="top-center" reverseOrder={false} />
        <h1>Abrir chamado</h1>
        <p>Nos forneça detalhes sobre o problema para que possamos identificar e oferecer a melhor solução possível</p>
        <form className={styles.formAbrirChamado} onSubmit={handleSubmit} encType="multipart/form-data">
            <label className={styles.labelText} htmlFor="titulo">Título</label> <br />
            <input className={styles.inputTitulo} type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} /> <br />

            <label className={styles.labelText} htmlFor="descricao">Descrição</label> <br />
            <textarea className={styles.textareaDescricao} id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} /> <br />

            <h2 className={styles.categoriasTitulo}>Selecione a categoria</h2>
            <label htmlFor="categoria-baixa" className={styles.labelRadio}>
                <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-baixa" value="Velocidade de internet baixa" checked={categoriaSelecionada === 'Velocidade de internet baixa'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                <span className={styles.spanRadio}>Velocidade de internet baixa</span>
            </label> <br />

            <label htmlFor="categoria-instavel" className={styles.labelRadio}>
                <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-instavel" value="Internet instável" checked={categoriaSelecionada === 'Internet instável'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                <span className={styles.spanRadio}>Internet instável</span>
            </label> <br />

            <label htmlFor="categoria-sem-conexao" className={styles.labelRadio}>
                <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-sem-conexao" value="Sem conexão de internet" checked={categoriaSelecionada === 'Sem conexão de internet'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                <span className={styles.spanRadio}>Sem conexão de internet</span>
            </label> <br />

            <label htmlFor="categoria-outro" className={styles.labelRadio}>
                <input className={styles.inputRadio} type="radio" name="categoria" id="categoria-outro" value="Outro" checked={categoriaSelecionada === 'Outro'} onChange={(e) => setCategoriaSelecionada(e.target.value)} />
                <span className={styles.spanRadio}>Outro</span>
            </label> <br />

            {categoriaSelecionada === 'Outro' && (
                <div>
                    <input className={styles.inputCategoriaPersonalizada} type="text" id="categoriaPersonalizada" value={categoriaPersonalizada} placeholder="Por favor, especifique" onChange={(e) => setCategoriaPersonalizada(e.target.value)} /> <br />
                </div>
            )}

            <h2 className={styles.imagemTitulo}>Caso seja possível, insira uma imagem demonstrando o problema</h2>
            <input className={styles.file} type="file" id="imagem" onChange={(e) => {
                handleFileChange(e);
                if (e.target.files && e.target.files.length > 0) {
                    setImagem(e.target.files[0]);
                }
            }} /> <br />
            <label className={styles.enviarImagem} htmlFor="imagem">
                <img src={image} alt="" />
                <span>{nomeArquivo ? nomeArquivo : 'Enviar imagem'}</span>
            </label>

            <div className={styles.botoes}>
                <button type="submit" className={styles.enviar}>Enviar</button>
                <button type="button" className={styles.descartar} onClick={handleDescartar}>Descartar</button>
            </div>
        </form>
    </div>
);
}

export default AbrirChamado;