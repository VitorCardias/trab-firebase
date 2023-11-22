import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Import the necessary Firebase auth functions
import {db, app} from './src/firebaseConnection';

import TextInput from "../../components/TextInput";
import {
    BackgroundText,
    BackgroundTextAlt,
    Container,
    FormArea,
    InputContainer,
    Label,
    ScrollViewContent,
    Button,
    ButtonText
} from './styles';

export default function App() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function cadastrar() {
        const auth = getAuth(app); // Get the Auth object from your Firebase connection
    
        try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert('Usuario criado: ' + user.email);
        } catch (error) {
        if (error.code === 'auth/weak-password') {
            alert('Sua senha deve ter pelo menos 6 caracteres');
        } else if (error.code === 'auth/invalid-email') {
            alert('Email inválido');
        } else {
            alert('Ops, algo deu errado: ' + error.message);
        }
        }
    
        setEmail('');
        setPassword('');
    }

    return (
        <>
            <BackgroundText>Criar Conta</BackgroundText>
            <BackgroundTextAlt>Insira os seus dados</BackgroundTextAlt>
            <Container>
                <ScrollViewContent>
                    <FormArea>
                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, email } }) => (
                                    <>
                                        <Label>E-mail</Label>
                                        <TextInput
                                            name="email"
                                            placeholder="E-mail"
                                            onChange={onChange}
                                            value={email}
                                        />
                                    </>
                                )}
                                name="email"
                            />
                        </InputContainer>

                        <InputContainer>
                            <Controller
                                control={control}
                                render={({ field: { onChange, password } }) => (
                                    <>
                                        <Label>Senha</Label>
                                        <TextInput
                                            name="password"
                                            placeholder="Senha"
                                            onChange={onChange}
                                            value={password}
                                            secureTextEntry={true}
                                        />
                                    </>
                                )}
                                name="password"
                            />
                        </InputContainer>

                    </FormArea>
                    <InputContainer>
                        <Button onPress={cadastrar}>
                            <ButtonText>Enviar</ButtonText>
                        </Button>
                        <Button onPress={() => navigation.goBack()}>
                            <ButtonText>Voltar</ButtonText>
                        </Button>
                    </InputContainer>
                </ScrollViewContent>
            </Container>
        </>
    );
}