import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'
import useFetch from '../hooks/useFetch'
import useAuthContext from '../hooks/useAuthContext'
import Container from '../components/Container'
import PageTitle from '../components/PageTitle'
import Form from '../components/Form'
import { useState, useEffect } from 'react'
import Select from '../components/Select'
import Option from '../components/Option'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import FlashMessage from '../components/FlashMessage'
import FormErrorMessage from '../components/FormErrorMessage'

const ProductForm = () => {
  const [category, setCategory] = useState ("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [storage, setStorage] = useState("");
  const [images, setImages] = useState([]);
  const [categoryError, setCategoryError] = useState ([]);
  const [codeError, setCodeError] = useState([]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [purchasePriceError, setPurchasePriceError] = useState([]);
  const [salePriceError, setSalePriceError] = useState([]);
  const [storageError, setStorageError] = useState([]);
  const [imagesError, setImagesError] = useState([]);

  const {token} = useAuthContext();
  const {get, create, edit, loading, baseURL} = useFetch();
  const [formMessage, setFormMessage] = useState(null);

  const {id} = useParams ();

  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    let response = await get("/categorias?pagination=0", token);
    if (!response.ok) {
      console.log(await response.json());
      return;
    }
    response = await response.json();
    setCategories(response.data);
  }

  const getProduct = async (id) => {
    let response = await get(`/produtos/${id}`, token);

    if (!response.ok) {
      console.log(await response.json());
      return;
    }

    response = await response.json();

    handleCategory(response.data.category_id);
    handleCode(response.data.code);
    handleDescription(response.data.description);
    handlePurchasePrice(response.data.purchase_price);
    handleSalePrice(response.data.sale_price);
    handleStorage(response.data.storage);
  }

  useEffect(() => {
    if (token){
      getCategories();
      if (id) {
        getProduct(id);
      }
    }
  }, [token]);

  const handleCategory = (value) => {
    setCategoryError([]);
    setFormMessage(null);
    setCategory(value);
  }

  const handleCode = (value) => {
    setCodeError([]);
    setFormMessage(null);
    setCode(value);
  }

  const handleDescription = (value) => {
    setDescriptionError([]);
    setFormMessage(null);
    setDescription(value);
  }
  
  const handlePurchasePrice = (value) => {
    setPurchasePriceError([]);
    setFormMessage(null);
    setPurchasePrice(value);
  } 
  
  const handleSalePrice = (value) => {
    setSalePriceError([]);
    setFormMessage(null);
    setSalePrice(value);
  } 
  
  const handleStorage = (value) => {
    setStorageError([]);
    setFormMessage(null);
    setStorage(value);
  }

  const handleImages = (value) => {
    setImagesError([]);
    setFormMessage(null);
    setImages([...value]);
  }

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    let response = null;
    let message = null;

    let data ={
      category_id: category,
      code,
      description,
      purchase_price: purchasePrice,
      sale_price: salePrice,
      storage,
      images
    }

    if (id) {
      response = await edit(`/produtos/${id}`, data, token);
      message = "Produto Atualizado com sucesso";
    } else {
      response = await create("/produtos", data, token);
      message = "Produto Cadastrado com sucesso";
    }

    if (!response.ok) {
      response = await response.json();
      setCategoryError(response.errors.category_id ?? []);
      setCodeError(response.errors.code ?? []);
      setDescriptionError(response.errors.description ?? []);
      setPurchasePriceError(response.errors.purchase_price ?? []);
      setSalePriceError(response.errors.sale_price ?? []);
      setStorageError(response.errors.storage ?? []);
      setImagesError(
        Object.keys(response.errors).includes("images") ?  
        ["O campo imagens deve ser do tipo: jpeg, jpg, png"]
        : []
      );
      return;
    }

    if (!id) {
      handleCategory('');
      handleCode('');
      handleDescription('');
      handlePurchasePrice('');
      handleSalePrice('');
      handleStorage('');
    }
    setFormMessage(message);
  }

  return (
    <Container>      
      <PageTitle>{id ? "Atualizar Produto" : "Cadastrar Produto"}</PageTitle>
      {formMessage &&
        <FlashMessage time={4000} action={setFormMessage} className="text-blue-500 border-blue-500 shadow-blue-100">
          {formMessage}
        </FlashMessage>
      }
      {loading 
        ? (<LoadingPage />)
        : (
          <Form onSubmit={(e) => handleSubmit(e, id)}>
            <Label className="mb-4 lg:w-2/3 lg:pe-4 lg:float-left"  name="Categoria">
              <Select className="border rounded-md p-[0.4em]" value={category && category} onChange={(e) => handleCategory(e.target.value)}>
                <Option defaultValue></Option>
                {categories &&
                  
                  categories.map((category) => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                  ))
                }
              </Select>
              {
                categoryError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            <Label className="mb-4 lg:w-1/3 lg:float-left" name="Código">
              <Input  className="border rounded-md p-1" value={code} onChange={(e) => handleCode(e.target.value)}/>
              {
                codeError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            <Label className="mb-4 clear-both" name="Descrição">
              <Input  className="border rounded-md p-1" value={description} onChange={(e) => handleDescription(e.target.value)}/>
              {
                descriptionError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            <Label className="mb-4 lg:w-1/3 lg:pe-4 lg:float-left" name="Preço de Compra">
              <Input  className="border rounded-md p-1" value={purchasePrice} onChange={(e) => handlePurchasePrice(e.target.value)}/>
              {
                purchasePriceError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            <Label className="mb-4 lg:w-1/3 lg:pe-4 lg:float-left" name="Preço de Venda">
              <Input  className="border rounded-md p-1" value={salePrice} onChange={(e) => handleSalePrice(e.target.value)}/>
              {
                salePriceError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            <Label className="mb-4 lg:w-1/3" name="Estoque">
              <Input  className="border rounded-md p-1" type="number" value={storage} onChange={(e) => handleStorage(e.target.value)}/>
              {
                storageError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
              }
            </Label>
            {!id &&
              <Label className="mb-4 lg:w-1/3" name="Imagens">
                <Input  className="border rounded-md p-1" type="file" multiple  onChange={(e) => handleImages(e.target.files)}/>
                {
                  imagesError.map((error) => <FormErrorMessage key={error}>{error}</FormErrorMessage> )
                }
              </Label>
            }
            <Button className="bg-blue-600 text-slate-50 px-2">
              {id ? "Atualizar" : "Cadastrar"}
            </Button>
          </Form>
        )
      }
    </Container>
  )
}

export default ProductForm
