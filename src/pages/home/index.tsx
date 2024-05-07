import { useEffect, useState } from 'react'
import { Social } from "../../components/Social"

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { db } from "../../services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore"

interface LinkProps {
   id: string,
   name: string,
   url: string,
   bg: string,
   color: string
}

interface SocialLinkProps {
   facebook: string,
   instagram: string,
   youtube: string
}

export function Home() {
   const [links, setLinks] = useState<LinkProps[]>([])
   const [socialLinks, setSocialLinks] = useState<SocialLinkProps>()


   useEffect(() => {
      function loadLinks() {
         const linksRef = collection(db, "links")
         const queryRef = query(linksRef, orderBy("created", "asc"))

         getDocs(queryRef)
         .then((snapshot) => {
            let lista = [] as LinkProps[]

            snapshot.forEach((link) => {
               lista.push({
                  id: link.data().id,
                  name: link.data().name,
                  url: link.data().url,
                  bg: link.data().bg,
                  color: link.data().color
               })
            })

            setLinks(lista)
         })
      }

      loadLinks()
   }, [])


   useEffect(() => {
      function loadSocialLinks() {
         const docRef = doc(db, "social", "link")
         getDoc(docRef)
         .then((snapshot) => {
            if(snapshot.data() !== undefined) {
               setSocialLinks({
                  facebook: snapshot.data()?.facebook,
                  youtube: snapshot.data()?.youtube,
                  instagram: snapshot.data()?.instagram
               })
            }
         })
      }

      loadSocialLinks()
   }, [])

   return(
      <div className="flex flex-col w-full py-4 items-center justify-center">
         <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">Marcelo Yuzo</h1>
         <span className="text-gray-50 mb-5 mt-5">Veja meus links ✌️</span>

         <main className="flex flex-col w-11/12 max-w-xl text-center">
            {links.map((link) => (
               <section key={link.id}
                  style={{backgroundColor: link.bg}}
                  className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105"
               >
                  <a href={link.url} target="_blank">
                     <p 
                        className="md:text-lg text-base"
                        style={{color: link.color}}
                     >
                        {link.name}
                     </p>
                  </a>
               </section>
            ))}

            { socialLinks && Object.keys(socialLinks).length > 0 && (
               <footer className="flex justify-center gap-3 my-4">
                  <Social url={socialLinks?.facebook}>
                     <FaFacebook size={35} color="#fff" />
                  </Social>
                  <Social url={socialLinks?.youtube}>
                     <FaYoutube size={35} color="#fff" />
                  </Social>
                  <Social url={socialLinks?.instagram}>
                     <FaInstagram size={35} color="#fff" />
                  </Social>
               </footer>
            )}
         </main>
      </div>
   )
}