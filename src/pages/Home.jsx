import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';
import useFetch from '../hooks/useFetch';
import Pagination from '../components/Pagination';
import Table from '../components/Table';
import Container from '../components/Container';
import PageTitle from '../components/PageTitle';
import ButtonLink from '../components/ButtonLink';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../components/LoadingPage';
import FlashMessage from '../components/FlashMessage';

const Home = () => {
  const {token} = useAuthContext();
  const [products, setProducts] = useState();
  const [url, setURL] = useState("/produtos?relationships=category");
  const {get, remove, loading} = useFetch();
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  
  const tableHeaders = {
    category: "Categoria", 
    code: "Código",
    description: "Descrição", 
    purchase_price: "Preço de Compra", 
    sale_price: "Preço de Venda", 
    storage: "Estoque"
  };

  const getProducts = async () => {

    let response = await get(url, token);

    if (!response.ok) {
      console.log(await response.json());
      return;
    }

    response = await response.json();

    let products = response.data.map((item) => {
      return {
        id: item.id,
        category: item.category.name,
        code: item.code,
        description: item.description,
        purchase_price: item.purchase_price,
        sale_price: item.sale_price,
        storage: item.storage
      }
    })
    setProducts(products);
    setPagination({links: response.links, meta: response.meta});
  }

  useEffect(() => {
    if (token) {
      getProducts();
    }
  },[token, url]);

  const handleDelete = async (id) => {
    let response = await remove("/produtos", {id}, token);

    if (!response.ok) {
      console.log(await response.json());
      return;
    }

    setMessage('Produto removido com sucesso');
    getProducts();
  };

  return (
    <Container>
      <PageTitle>
        Lista de Produtos
      </PageTitle>
      {message &&
        <FlashMessage time={4000} action={setMessage} className="text-blue-500 border-blue-500 shadow-blue-100">
          {message}
        </FlashMessage>
      }
      {loading 
        ? (<LoadingPage />)
        : (
          <div>
            <Table data={products && products}
            tableHeaders={tableHeaders} 
            remove={handleDelete}
            view={(id) => navigate("/produtos/"+id)}
            update= {(id) => navigate("/editar-produto/"+id)}
            />
          
            {pagination &&
              <Pagination
                path="/produtos?relationships=category"
                pagination={pagination}
                setURL={setURL}
              />
            }
            <ButtonLink className="bg-green-600" path="/cadastrar-produto">Cadastrar Produto</ButtonLink>
          </div>
        )
      }
    </Container>
  )
}

export default Home
