
// IMPORTE DE BIBLIOTECAS
import axios from "axios"
import { useRef, useState } from "react"


// IMPORTE DAS TAGS ESTILIZADAS
import { Label, Input, Form, Wrapper, Div, Title, Button, Section, Popup } from "./StyleForm"


// IMPORTE DE ICONES DO REACT-ICONS
import { IoMdCheckbox } from "react-icons/io";
import { TbCircleLetterXFilled } from "react-icons/tb";
import { LuLoader2 } from "react-icons/lu";


export default function Formulario() {


    // CONTROLA SE É PRECISO OU NÃO MOSTRAR ANIMAÇÃO DE "CARREGADO"
    const [loading,setLoading] = useState(false)


    // RECEBE OS RETORNOS DEFINIDOS DE CADA REQUISIÇÃO QUE DER CERTO OU ERRADO PARA SER USADO NOS POPUPS
    const [retorno,setRetorno] = useState()

    
    // CANCELA A FUNÇÃO PADRÃO DE ENVIO DOS FORMULÁRIOS
    const handlePreventDefault = (event) => {
        event.preventDefault()
    }


    // FUNÇÃO QUE MANIPULA A APARIÇÃO DOS POPUPS EM TELA
    const handleFeedBack = (cor) => {
        const popup = document.querySelector('.popup')
        const barra = document.querySelector('.barra')
        popup.style.left = '10px'
        barra.style.animationName = 'barra'
        barra.style.backgroundColor = cor
        setTimeout(()=>{
            popup.style.left = '-400px'
        },5000)
        setTimeout(()=>{
            barra.style.animationName = 'none'
        },6000) 
    }


    // useRef QUE RECEBE OS VALORES DOS IMPUTS DO CADASTRO
    const nomeRef = useRef()
    const sobrenomeRef = useRef()
    const data_nascimentoRef = useRef()
    const telefoneRef = useRef()
    const emailRef = useRef()


    // FUNÇÃO QUE FAZ O ENVIO E REALIZA O CADASTRO
    const handleSubmit = async () => {


        // VERIFICA SE EXISTE ALGUM CAMPO VAZIO
        if(nomeRef.current.value=='' || sobrenomeRef.current.value=='' || data_nascimentoRef.current.value=='' || telefoneRef.current.value=='' || emailRef.current.value==''){
            setRetorno(
                <p>
                    Preencha todos os campos <br /> para realizar o cadastro.
                    <TbCircleLetterXFilled  className="erro"/>
                </p>
            )
            const cor = '#cc0000'
            handleFeedBack(cor)

        }else{
            setLoading(true)


            // RECEBE OS VALORES DOS IMPUTS PARA REALIZAR O POST
            const data = {
                nome: (nomeRef.current.value),
                sobrenome: (sobrenomeRef.current.value),
                data_nascimento: (data_nascimentoRef.current.value),
                telefone: (telefoneRef.current.value),
                email: (emailRef.current.value)
            }
       
            await axios.post('http://localhost:3000/cadastros', data)
            .then((response)=>{
                if(response.status == 201){
                    setRetorno(
                        <p>
                            Cadastro Realizado com sucesso!
                            <IoMdCheckbox className="check"/>
                        </p>
                    )
                    const cor = '#00df00'
                    handleFeedBack(cor)

                    setLoading(false)
    

                    // ZERA TODOS OS CAMPOS
                    nomeRef.current.value = ''
                    sobrenomeRef.current.value = ''
                    data_nascimentoRef.current.value = ''
                    telefoneRef.current.value = ''
                    emailRef.current.value = ''
    

                    // FOCA NO CAMPO "NOME"
                    nomeRef.current.focus()
                }
            })
            .catch(()=>{
                setLoading(false)
                setRetorno(
                    <p>
                        Não foi possível cadastrar. <br/> Tente novamente mais  tarde.
                        <TbCircleLetterXFilled  className="erro"/>
                    </p>
                )
                const cor = '#cc0000'
                handleFeedBack(cor)
            })
        }
    }


    return (
        <>
            <Section>
                <Form onSubmit={handlePreventDefault}>

                    {/* ÁREA DE CADASTRO */}
                    <Title>Cadastro</Title>
                    <Wrapper>
                        <Div>
                            <Label>Nome</Label>
                            <Input ref={nomeRef} type="text" name="name" placeholder="Digite seu nome" required/>
                        </Div>
                        <Div>
                            <Label>Sobrenome</Label>
                            <Input ref={sobrenomeRef} type="text" name="lastname" placeholder="Digite seu sobrenome" required/>
                        </Div>
                    </Wrapper>
                    <Wrapper>
                        <Div>
                            <Label>Data de nascimento</Label>
                            <Input ref={data_nascimentoRef} type="date" name="date" required/>
                        </Div>
                        <Div>
                            <Label>Telefone</Label>
                            <Input ref={telefoneRef} type="text" name="phone" placeholder="(00) 0 0000-0000" required/>
                        </Div>
                    </Wrapper>
                    <Wrapper>
                        <Div>
                            <Label>E-mail</Label>
                            <Input ref={emailRef} type="email" name="email" placeholder="exemplo@hotmail.com" required/>
                        </Div>
                    </Wrapper>
                    <Wrapper>

                        {/* BOTÃO QUE RECEBE A ANIMAÇÃO DE "CARREGANDO" */}
                        <Button onClick={handleSubmit}>
                            {loading?<LuLoader2 className="loading"/>:<p>Cadastrar</p>}
                        </Button>
                    </Wrapper>
                </Form>
                
                {/* MOSTRA OS POPUPS DE SUCESSO OU ERRO */}
                <Popup className="popup">
                    {retorno}
                    <hr  className="barra"/>
                </Popup>
            </Section>
        </>
    )
}