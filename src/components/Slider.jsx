import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import FormMessageError from './FormErrorMessage';

const Slider = ({imagesData, addImage, removeImage, sliderMessage, width, height}) => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [messages, setMessages] = useState([]);
  const imageInput = useRef();

  useEffect(() => {
    if (sliderMessage) {
      setMessages(sliderMessage);
    }
  }, [sliderMessage])

  useEffect(() => {
    if (imagesData) {
      setImages(imagesData);
      setCurrent(0)

      if (imageInput.current) {
        imageInput.current.value = '';
      }
    }
  }, [imagesData]);

  const handleNext = () => {
    if (current == images.length-1) {
      return;
    }
    setCurrent(current+1);
  }

  const handlePrev = () => {
    if (current == 0) {
      return;
    }
    setCurrent(current-1);
  }
 
  return (
    <>
      {images.length > 0 ?
      ( <div className={`${width}`}>
          <div onClick={() => removeImage(images[current].id)} className='cursor-pointer flex justify-end text-gray-700 p-2' title="Remover Imagem" alt="Remover Imagem">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </div>
          <div className={`${height} overflow-hidden border rounded-md shadow-md`}>
              {images.map((image, index) => (
                index == current 
                ? (<img key={image.id} className={`w-full h-full object-scale-down`} src={image.link} alt={`Imagem ${index+1} do Produto`} />)
                : (<img key={image.id} className="hidden" src={image.link} alt={`Imagem ${index+1} do Produto`} />)
              ))}
          </div>
          <div  className={`text-gray-700 flex w-full justify-between mt-5`}>
            <div onClick={() => handlePrev()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className={`flex justify-center items-center`}>
            {images.map((image, index) => (
                index == current
                ? ( <div 
                    key={image.id} 
                    className='bg-gray-700 border border-gray-700 w-3 h-3 rounded-full me-1 cursor-pointer' 
                    onClick={() => setCurrent(index)}>
                    </div> 
                  )
                : (<div key={image.id} className="border border-gray-700 w-3 h-3 rounded-full me-1 cursor-pointer" onClick={() => setCurrent(index)}></div>)
              ))}
            </div>
            <div onClick={() => handleNext()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <form onSubmit={(e) => addImage(e, e.target.elements[0].files)} className='my-4 flex flex-col'>
            <input type="file" ref={imageInput} className='text-gray-700' onChange={() => setMessages([])}/>
            {messages && 
              messages.map((message, index) =>  <FormMessageError key={index} >{message}</FormMessageError>)
            }
            <Button className="bg-blue-500 text-slate-50 mt-2 px-2 max-w-max">Adicionar Imagem</Button>
          </form>
        </div>
      )
      :
      (
        <div className={`${width} ${height}`}>
          <div className="flex justify-center items-center overflow-hidden border rounded-md shadow-md w-full h-full">
            <span className='text-gray-700'>Imagens não encontradas</span>
          </div>   
        </div>
      )
      }
    </>
  )
}

export default Slider
