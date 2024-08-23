import React, { useEffect, useState } from "react";
import apiCodeBurger from "../../../services/api";
import { Label, Input, Container, ButtonStyles, LabelUpload } from "./style";
import ReactSelect from "react-select";
import { useForm, Controller } from "react-hook-form";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../components/ErrorMessage";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function NewProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
    const { push } = useHistory()

    const schema = Yup.object().shape({
        name: Yup.string().required("Digite o nome do produto"),
        price: Yup.string().required("Digite o preço do produto"),
        category: Yup.object().required("Digite uma categoria"),
        file: Yup.mixed().test("required", "Carregue um arquivo", value => {
            return value?.length > 0

        })
            .test("fileSize", "Carregue arquivos de ate 5mb", value => {
                return value[0]?.size <= 500000
            })
            .test("type", "Carregue apenas arquivos JPEG", value => {
                return value[0]?.type === "image/jpeg" || value[0]?.type === "image/png"
            })
    })
    const { register, handleSubmit, control, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async data => {
        const productDataFormData = new FormData()
        productDataFormData.append("name", data.name)
        productDataFormData.append("price", data.price)
        productDataFormData.append("category_id", data.category.id)
        productDataFormData.append("file", data.file[0])

        await toast.promise(apiCodeBurger.post("products", productDataFormData), {
            pending: "Criando novo produto...",
            success: "Produto criado com sucesso",
            error: "Falha ao criar o produto"
        })
        setTimeout(() => {
            push("/listar-produtos")
        }, 2000)
    }

    useEffect(() => {
        async function loadCategories() {
            const { data } = await apiCodeBurger.get("categories")
            setCategories(data)
        }
        loadCategories()
    }, [])



    return (
        <Container>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Label>Nome</Label>
                    <Input type="text"{...register("name")} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>
                </div>

                <div>
                    <Label>Preço</Label>
                    <Input type="number"{...register("price")} />
                    <ErrorMessage>{errors.price?.message}</ErrorMessage>
                </div>

                <div>
                    <LabelUpload>
                        {fileName || (<> <UploadFileIcon /> Carregue a imagem do Produto</>)}
                        <input type="file" accept="image/png, image/jpeg"{...register("file")} onChange={value => { setFileName(value.target.files[0]?.name) }} />
                    </LabelUpload>

                    <ErrorMessage>{errors.file?.message}</ErrorMessage>
                </div>

                <div>
                    <Controller name="category" control={control} render={({ field }) => {
                        return (
                            <ReactSelect
                                {...field} options={categories} getOptionLabel={cat => cat.name} getOptionValue={cat => cat.id} placeholder="...Escolha a categoria" />
                        )
                    }}>
                    </Controller>

                    <ErrorMessage>{errors.category?.message}</ErrorMessage>
                </div>

                <ButtonStyles>Adicionar Produto</ButtonStyles>
            </form>
        </Container>
    )
}
export default NewProduct;