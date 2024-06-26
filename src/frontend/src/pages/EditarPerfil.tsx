import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/EditarPerfil.module.css";
import perfil from "../img/FotoUsuarioPerfil.png";
import { toast, ToastContainer } from "react-toastify";
import InputMask from 'react-input-mask';

interface UserInfo {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    cpf: string;
}

interface UserAddress {
    cep: string;
    estado: string;
    cidade: string;
    rua: string;
    numero: string;
    complemento: string;
}

const EditarPerfil: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
    const [editUserInfo, setEditUserInfo] = useState<UserInfo>({
        nome: "",
        email: "",
        senha: "",
        telefone: "",
        cpf: "",
    });
    const [editUserAddress, setEditUserAddress] = useState<UserAddress>({
        cep: "",
        estado: "",
        cidade: "",
        rua: "",
        numero: "",
        complemento: "",
    });
    const [activeTab, setActiveTab] = useState("dadosPessoais");
    const navigate = useNavigate();

    const handleEditPhoto = () => {
        console.log("Botão Editar Foto clicado");
    };

    const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUserInfo({ ...editUserInfo, [name]: value });
    };

    const handleChangeUserAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditUserAddress({ ...editUserAddress, [name]: value });
    };

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value;
        setEditUserAddress({ ...editUserAddress, cep });

        if (cep.replace(/[^\d]/g, "").length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep.replace('-', '')}/json/`);
                const data = await response.json();
                if (data.erro) {
                    toast.error("Erro ao buscar o CEP");
                    return;
                }
                setEditUserAddress({
                    ...editUserAddress,
                    estado: data.uf,
                    cidade: data.localidade,
                    rua: data.logradouro,
                    complemento: data.complemento,
                    cep,
                });
            } catch (error) {
                toast.error("Erro ao buscar o CEP");
            }
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Token de autenticação não encontrado.");
            navigate("/login");
            return;
        }

        const updatedData = {
            nome: editUserInfo.nome,
            email: editUserInfo.email,
            senha: editUserInfo.senha,
            telefone: editUserInfo.telefone ? editUserInfo.telefone.replace(/[^\d]/g, "") : "",
            cpf: editUserInfo.cpf,
            cep: editUserAddress.cep ? editUserAddress.cep.replace(/[^\d]/g, "") : "",
            estado: editUserAddress.estado,
            cidade: editUserAddress.cidade,
            rua: editUserAddress.rua,
            numero: editUserAddress.numero,
            complemento: editUserAddress.complemento,
        };

        try {
            const response = await fetch("http://localhost:5000/editarperfil", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                console.log("Informações atualizadas com sucesso");
                toast.success("Dados cadastrais alterados com sucesso");
                navigate("/perfil");
            } else {
                console.error("Erro ao atualizar informações do usuário:", response.statusText);
                toast.error("Erro ao atualizar informações do usuário");
            }
        } catch (error) {
            console.error("Erro ao atualizar informações do usuário:", error);
            toast.error("Erro ao atualizar informações do usuário");
        }
    };

    const handleUndo = () => {
        navigate('/perfil');
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                console.error("Token de autenticação não encontrado.");
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/user-info", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserInfo({
                        nome: data.nome,
                        email: data.email,
                        cpf: data.cpf,
                        senha: data.senha,
                        telefone: data.telefone,
                    });
                    setUserAddress({
                        estado: data.estado,
                        cidade: data.cidade,
                        rua: data.rua,
                        complemento: data.complemento,
                        cep: data.cep,
                        numero: data.numero,
                    });
                    setEditUserInfo({
                        nome: data.nome,
                        email: data.email,
                        cpf: data.cpf,
                        senha: data.senha,
                        telefone: data.telefone,
                    });
                    setEditUserAddress({
                        estado: data.estado,
                        cidade: data.cidade,
                        rua: data.rua,
                        complemento: data.complemento,
                        cep: data.cep,
                        numero: data.numero,
                    });
                } else if (response.status === 401) {
                    console.error("Não autorizado - Token inválido ou expirado.");
                } else {
                    console.error("Erro ao buscar informações do usuário:", response.statusText);
                }
            } catch (error) {
                console.error("Erro ao buscar informações do usuário:", error);
            }
        };

        fetchUserInfo();
    }, [navigate]);

    const renderPersonalData = () => (
        <>
            <label className={styles.labell}>Nome</label>
            <input className={styles.inputt} type="text" name="nome" value={editUserInfo.nome} onChange={handleChangeUserInfo} style={{ color: 'black' }} />

            <label className={styles.labell}>Email</label>
            <input className={styles.inputt} type="text" name="email" value={editUserInfo.email} onChange={handleChangeUserInfo} style={{ color: 'black' }} />

            <label className={styles.labell}>Senha</label>
            <input className={styles.inputt} type="password" name="senha" value={editUserInfo.senha} onChange={handleChangeUserInfo} style={{ color: 'black' }} />

            <label className={styles.labell}>CPF</label>
            <input className={styles.inputt} type="text" name="cpf" value={editUserInfo.cpf} onChange={handleChangeUserInfo} style={{ color: 'black' }} />

            <label className={styles.labell}>Telefone</label>
            <InputMask
                className={styles.inputt}
                mask="(99) 99999-9999"
                name="telefone"
                value={editUserInfo.telefone}
                onChange={handleChangeUserInfo}
                style={{ color: 'black' }}
            />
        </>
    );

    const renderAddressData = () => (
        <>
            <label className={styles.labell}>CEP</label>
            <InputMask
                className={styles.inputt}
                mask="99999-999"
                name="cep"
                value={editUserAddress.cep}
                onChange={handleCepChange}
                style={{ color: 'black' }}
            />

            <label className={styles.labell}>Estado</label>
            <input className={styles.inputt} type="text" name="estado" value={editUserAddress.estado} readOnly style={{ color: 'black' }} />

            <label className={styles.labell}>Cidade</label>
            <input className={styles.inputt} type="text" name="cidade" value={editUserAddress.cidade} readOnly style={{ color: 'black' }} />

            <label className={styles.labell}>Rua</label>
            <input className={styles.inputt} type="text" name="rua" value={editUserAddress.rua} readOnly style={{ color: 'black' }} />

            <label className={styles.labell}>Número</label>
            <input className={styles.inputt} type="text" name="numero" value={editUserAddress.numero} onChange={handleChangeUserAddress} style={{ color: 'black' }} />

            <label className={styles.labell}>Complemento</label>
            <input className={styles.inputt} type="text" name="complemento" value={editUserAddress.complemento} onChange={handleChangeUserAddress} style={{ color: 'black' }} />
        </>
    );

    return (
        <div className={styles.perfil}>
            <div className={styles.fotoperfil}>
                <img className={styles.foto} src={perfil} alt="Foto de perfil" />
                <button className={styles.editButton} onClick={handleEditPhoto}>Editar foto</button>
            </div>
            <div className={styles.formulario}>
                <div className={styles.tabContainer}>
                    <button className={`${styles.tabButton} ${activeTab === "dadosPessoais" ? styles.active : ""}`} onClick={() => setActiveTab("dadosPessoais")}>Dados pessoais</button>
                    <button className={`${styles.tabButton} ${activeTab === "endereco" ? styles.active : ""}`} onClick={() => setActiveTab("endereco")}>Endereço</button>
                </div>
                <form className={styles.formi} onSubmit={handleSubmit}>
                    {activeTab === "dadosPessoais" ? renderPersonalData() : renderAddressData()}
                    <div className={styles.buttoncontainer}>
                        <button className={styles.alterButton} type="submit">Alterar</button>
                        <button className={styles.cancelButton} onClick={handleUndo}>Desfazer</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditarPerfil;
