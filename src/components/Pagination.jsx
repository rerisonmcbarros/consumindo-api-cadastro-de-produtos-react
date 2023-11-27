import Button from "./Button";

const Pagination = ({path, pagination, setURL}) => {
  const meta = pagination.meta;
  const links = pagination.links;

  const handleNext = (nextURL) => {
    if (!nextURL) {
      return;
    }
    nextURL = links.next.slice(meta.path.length);
   
    if (path.indexOf("?") != -1) {
      nextURL = nextURL.replace("?", "&");
    }
    setURL(path + nextURL);
  }

  const handlePrevious = (previousURL) => {
    if (!previousURL) {
        return;
    }
    previousURL = links.prev.slice(meta.path.length);
    
    if (path.indexOf("?") != -1) {
        previousURL = previousURL.replace("?", "&");
    }
    setURL(path + previousURL);
  }

  return (
    <div className="flex justify-center w-full mx-auto my-4">
      {!links.prev ?
        (    
          <Button 
            className={"bg-blue-400 py-[0.3em] px-2 text-slate-50"} 
            disabled 
            onClick={() => handlePrevious(links.prev)}>Anterior
          </Button>
        )
        :
        (
          <Button 
            className={"bg-blue-600 py-[0.3em] px-2 text-slate-50"} 
            onClick={() => handlePrevious(links.prev)}>Anterior
          </Button>
        )
      }
        
      <span className="mx-4 text-gray-700"> 
        {
          meta.last_page > 0 ? 
            (meta.current_page) :
            (meta.last_page)
        } de {meta.last_page} páginas 
      </span>
    
      {!links.next ?
        (   
          <Button 
            className={"bg-blue-400 py-[0.3em] px-2 text-slate-50"} 
            disabled 
            onClick={() => handleNext(links.next)}>Próximo
          </Button>
        )
        :
        (
          <Button 
            className={"bg-blue-600 py-[0.3em] px-2 text-slate-50"} 
            onClick={() => handleNext(links.next)}>Próximo
          </Button>
        )
      }     
    </div>
  )
}

export default Pagination
