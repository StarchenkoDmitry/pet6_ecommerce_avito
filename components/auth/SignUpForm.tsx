'use client'

interface Props {

}

function SignUpForm(props: Props) {


    return (
        <div className="m-2 p-4 w-80 flex flex-col rounded-lg bg-white shadow-md">
            <h2 className="m-1 text-xl">Вход</h2>
            <input 
                className="my-1 p-1 text-sm flex-1 rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                type="text" 
                name="login"
                placeholder="Phone or email"/>
            <input 
                className="my-1 p-1 text-sm rounded-lg placeholder-gray-500 bg-gray-100 hover:bg-gray-200 focus:bg-white focus:outline-green-400"
                type="password"
                name="password" 
                placeholder="password" />
            <button className="p-1 block text-sm rounded-lg bg-green-400" type="submit">
                SignUp
            </button>

            <div className="bg-orange-200">
                <h3>SignIn from vender</h3>

            </div>
        </div>
    )
}

export default SignUpForm
