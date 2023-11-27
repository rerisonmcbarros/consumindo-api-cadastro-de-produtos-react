import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import Slider from '../components/Slider';
import LoadingPage from '../components/LoadingPage';

const ProductDetails = () => {
  const {token} = useAuthContext();
  const {get, create, remove, loading} = useFetch();
  const {id} = useParams();
  const [sliderMessage, setSliderMessage] = useState(null);

  const [images, setImages] = useState([]);
  const getProduct = async () => {
    let response = await get(`/produtos/${id}?relationships=category-images`, token);
    response = await response.json();
    setImages(response.data.images);
  }

  useEffect(() => {
      if (token) {
        getProduct();
      }
  }, [token]);

  const addImage = async (e, images) => {
    let response = await create(`/produtos/${id}/adicionar-foto`, {image: images[0]}, token);

    if (!response.ok) {
      setSliderMessage((await response.json()).errors.image)
      return;
    }
    setSliderMessage(null);
    getProduct();
  }

  const removeImage = async (idImage) => {
    remove(`/produtos/remover-foto`, {id: idImage}, token);
    getProduct();
  }

  return (
    <Container >
      <PageTitle>Detalhes do Produto</PageTitle>

      {loading
        ? ( <LoadingPage />)
        : (
          <Slider 
            imagesData={images} 
            addImage={addImage} 
            removeImage={removeImage} 
            width="w-full lg:w-3/4 mx-auto" 
            height="h-[40vh] lg:h-[60vh]"
            sliderMessage={sliderMessage}
          />
        )
      }
    </Container>
  )
}

export default ProductDetails
