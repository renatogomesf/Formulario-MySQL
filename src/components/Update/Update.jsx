import axios from "axios"
import { Label, Input, Form, Wrapper, Div, Title, Button, Section, Botoes } from "./StyleUpdate"
import { useEffect, useRef } from "react"

import { TelaUpdate } from "../../pages/consulta/StyleConsulta"

export default function Update(props) {

    const idRef = useRef()
    const nomeRef = useRef()
    const sobrenomeRef = useRef()
    const data_nascimentoRef = useRef()
    const telefoneRef = useRef()
    const emailRef = useRef()


    const handleClose = () => {
        <TelaUpdate className="update"/>

        const update = document.querySelector(".update")
        update.style.display = 'none'

        console.log(props.dadosUpdate)
        // console.log(idRef.value)
        console.log(nomeRef.current.value)
        console.log(sobrenomeRef.current.value)
        console.log(data_nascimentoRef.current.value)
        console.log(telefoneRef.current.value)
        console.log(emailRef.current.value)
    }  

    useEffect(()=>{
        // idRef.value = props.dadosUpdate.id
        nomeRef.current.value = props.dadosUpdate.nome
        sobrenomeRef.current.value = props.dadosUpdate.sobrenome
        data_nascimentoRef.current.value = props.dadosUpdate.data_nascimento
        telefoneRef.current.value = props.dadosUpdate.telefone
        emailRef.current.value = props.dadosUpdate.email
    })


    const handleSubmit = async () => {

        const id = props.dadosUpdate.id
        
        const data = {
            nome: (nomeRef.current.value),
            sobrenome: (sobrenomeRef.current.value),
            data_nascimento: (data_nascimentoRef.current.value),
            telefone: (telefoneRef.current.value),
            email: (emailRef.current.value),
        }

        await axios.put('http://localhost:3000/cadastros/' + id, data)
        .then((response)=>{
            console.log(response)
            if(response.status == 200){
                alert('Cadastro atualizado com sucesso!')
                handleClose()
                props.todosCadastros()
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    return (
        <>
            <Section>
                <Form>
                    <Title>Atualizar</Title>

                    <Wrapper>
                        <Div>
                            <Label>Nome</Label>
                            <Input ref={nomeRef}  type="text" name="name" required/>
                        </Div>
                        <Div>
                            <Label>Sobrenome</Label>
                            <Input ref={sobrenomeRef} type="text" name="lastname" required/>
                        </Div>
                    </Wrapper>

                    <Wrapper>
                        <Div>
                            <Label>Data de nascimento</Label>
                            <Input ref={data_nascimentoRef} type="date" name="date" required/>
                        </Div>
                        <Div>
                            <Label>Telefone</Label>
                            <Input ref={telefoneRef} type="text" name="phone" required/>
                        </Div>
                    </Wrapper>

                    <Wrapper>
                        <Div>
                            <Label>E-mail</Label>
                            <Input ref={emailRef} type="email" name="email" required/>
                        </Div>
                    </Wrapper>

                    <Botoes>
                        <Button onClick={handleSubmit}>Atualizar</Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </Botoes>
                </Form>
            </Section>
        </>
    )
}

