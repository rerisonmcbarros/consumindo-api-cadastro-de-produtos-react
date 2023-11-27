import { useState, useEffect } from "react"
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import useAuthContext from "../hooks/useAuthContext";
import FormErrorMessage from "../components/FormErrorMessage";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, error, setError, loading} = useAuthContext();

  const handleEmail = (value) =>{
    setError(null);
    setEmail(value);
  }

  const handlePassword = (value) =>{
    setError(null);
    setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email,password);
  }

  useEffect(() => {
    if (!error) {
      setErrorMessage(error);
      return;
    }       
    setErrorMessage(error.message);

  }, [error]);

  return (
    <div className="w-screen mt-[10vh] flex justify-center">
      <div className="w-full md:w-2/4 lg:w-5/12 xl:w-3/12 h-full md:h-3/4 p-5 sm:my-auto">
        <div className="text-blue-500 text-2xl mb-14 text-center">
          <Logo className="hidden sm:inline-block"/>
          <h1 className="inline-block font-extrabold">Login</h1>
        </div>
        {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        <form className="mb-10" onSubmit={(e) => handleSubmit(e)}>
          <Label className="mb-8" name="Email">
            <Input 
              className="border-b p-2"
              type="email" name="email" placeholder="Digite seu Email"  
              value={email}
              onChange={(e) => handleEmail(e.target.value)} 
            />
          </Label>
          <Label className="mb-8" name="Senha">
            <Input
              className="border-b p-2" 
              type="password" name="password" placeholder="Digite sua senha"
              value={password}
              onChange={(e) => handlePassword(e.target.value)}
            />
          </Label>
          {!loading && <Button type="submit" className="bg-blue-600 w-full text-slate-50">Sign in</Button>}
          {loading && <Button disabled type="submit" className="bg-blue-400 w-full text-slate-50">Sign in</Button>}
        </form>
      </div>
    </div>
  )
}

export default Login
