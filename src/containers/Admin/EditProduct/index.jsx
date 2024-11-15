import React, { useEffect, useState } from "react";
import { Container, Label, LabelUpload, Input, ButtonStyles, ContainerInput } from "./styles";
import api from "../../../services/api";
import ReactSelect from "react-select";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function EditProduct() {
    const [fileName, setFileName] = useState(null);
    const [categories, setCategories] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();
    const product = state?.product;

    const schema = yup.object().shape({
        name: yup.string().required('Digite o nome do produto'),
        price: yup.string().required('Digite o valor'),
        category: yup.object().required('Escolha uma Categoria'),
       offer: yup.bool()
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: product?.name || '',
            price: product?.price || '',
            category: product?.category || null,
        },
    });

    useEffect(() => {
        async function loadCategories() {
            try {
                const { data } = await api.get('categories');
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        loadCategories();
    }, []);

    const onSubmit = async (data) => {
        const productFormData = new FormData();
        productFormData.append('name', data.name);
        productFormData.append('price', data.price);
        productFormData.append('category_id', data.category.id);
        productFormData.append('file', data.file[0]);
        productFormData.append('offer', data.offer);

     
            await toast.promise(api.put(`/products/${product.id}`, productFormData), {
                pending: 'Editando produto',
                success: 'Produto salvo com sucesso!',
                error: 'Erro ao salvar o produto!',
            });
           setTimeout(() => {
            navigate('/listar-produtos');
           }, 2000); 
        }

    return (
        <Container>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Nome</Label>
                <Input type="text" {...register('name')} />
                <p className="messageError">{errors?.name?.message}</p>

                <Label>Preço</Label>
                <Input type="number" {...register('price')} />
                <p className="messageError">{errors?.price?.message}</p>

                <LabelUpload>
                    {fileName || (
                        <>
                            <CloudUploadIcon />
                            Upload da Imagem
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        {...register('file')}
                        onChange={(e) => setFileName(e.target.files[0]?.name)}
                    />
                </LabelUpload>
                <p className="messageError">{errors?.file?.message}</p>

                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <ReactSelect
                            {...field}
                            options={categories}
                            getOptionLabel={(category) => category.name}
                            getOptionValue={(category) => category.id}
                            placeholder="...Categorias"
                        />
                    )}
                />
                <p className="messageError">{errors?.category?.message}</p>

            <ContainerInput>
                <input type="checkbox" 
                {...register('offer')}
                defaultChecked={product.offer}
                />
                <Label>
                   Produto em Oferta
                </Label>
            </ContainerInput>
                <ButtonStyles type="submit">Editar Produto</ButtonStyles>
            </form>
        </Container>
    );
}

export default EditProduct;
