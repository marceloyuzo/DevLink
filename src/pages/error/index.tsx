import { Link } from "react-router-dom"

export function ErrorPage() {
   return(
      <div className="flex items-center justify-center w-full text-white flex-col min-h-screen">
         <h1 className="font-bold text-8xl mb-2">404</h1>
         <h1 className="font-bold text-4xl mb-4">Página não encontrada!</h1>
         <p className="italic text-1xl mb-5">Você caiu em uma página que não existe.</p>

         <Link to ="/" className="bg-gray-50/20 py-1 px-4 rounded-md">
            Voltar Para a Home
         </Link>
      </div>
   )
}