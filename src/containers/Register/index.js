import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import RegisterImg from "../../assets/register-image.svg";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import {
	Container,
	ContainerItens,
	Input,
	Label,
	RegisterImage,
	SingInLink,
} from "./styles";

function Register() {
	const schema = Yup.object().shape({
		name: Yup.string()
			.required("Nome obrigatório!"),
		email: Yup.string()
			.email("Digite um e-mail válido")
			.required("O e-mail e obrigatório!"),
		password: Yup.string()
			.required("A senha e obrigatória!")
			.min(6, "A senha deve ter no mínimo seis dígitos!"),
		confirmPassword: Yup.string()
			.required("A senha é obrigatória!")
			.oneOf([Yup.ref("password")], "As senhas devem ser iguais")
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (clientData) => {
		try {
			const { status } = await api.post("users", {
				name: clientData.name,
				email: clientData.email,
				password: clientData.password,
			},
				{ validateStatus: () => true }
			);
			if (status === 201 || status === 200) {
				toast.success('Cadastro Criado com sucesso!')
			}
			else if (status === 409) {
				toast.error("E-mail já cadastrado! Faça login para continuar")
			} else {
				throw new Error()
			}

		} catch (err) {
			toast.error("Falha no sistema! Tente novamente!")
		}

	};

	return (
		<Container>
			<RegisterImage src={RegisterImg} alt="register-image" />
			<ContainerItens>
				<img src={Logo} alt="logocode-burger" />

				<h1>Cadastre-se</h1>

				<form noValidate onSubmit={handleSubmit(onSubmit)}>

					<Label error={errors.name?.message}>Nome</Label>
					<Input
						type="text"
						{...register("name")}
						error={errors.name?.message}
					/>
					<ErrorMessage>{errors.name?.message}</ErrorMessage>

					<Label error={errors.email?.message}>Email</Label>
					<Input
						type="email"
						{...register("email")}
						error={errors.email?.message}
					/>
					<ErrorMessage>{errors.email?.message}</ErrorMessage>

					<Label error={errors.password?.message}>Senha</Label>
					<Input
						type="password"
						{...register("password")}
						error={errors.password?.message}
					/>
					<ErrorMessage>{errors.password?.message}</ErrorMessage>

					<Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
					<Input
						type="password"
						{...register("confirmPassword")}
						error={errors.confirmPassword?.message}
					/>
					<ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

					<Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>Sing Up</Button>
				</form>

				<SingInLink>
					Já Possui Conta? <a>Sing In</a>
				</SingInLink>
			</ContainerItens>
		</Container>
	);
}

export default Register;
