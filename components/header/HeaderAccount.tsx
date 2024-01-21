'use client'

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "../ui/Modal/Modal";
import AuthForm from "../auth/AuthForm";
import { useSession } from "next-auth/react";


function HeaderAccount() {
    console.log("Render HeaderAccount");

    const session = useSession();
    const [gfdg,sfgh] = useState(100);
    
    return (
        <div>
            USE SESSIOM: {JSON.stringify(session)}
        </div>
    )
}
export default HeaderAccount;
