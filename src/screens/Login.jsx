import React from 'react'
import '../assets/css/login.scss'
import { validateEmail } from '../utils/validation'
import dataarray from '../utils/dummydata'

const Login = () => {
    const [forministate, setformstate] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [category, setCategory] = React.useState("fruits")
    const [imagearray, setImageArray] = React.useState([])

    const randomize = (data) => {
        let array = Object.values(data)
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const changeFormState = () => {
        const isValid = validateEmail(email);
        if (isValid.code !== 400) {
            setformstate(false)
        } else {
            const emailField = document.getElementById("usermail")
            const emailErr = document.getElementById("emailErr")
            emailField.style.cssText = "border-color: red;"
            emailErr.textContent = isValid.message
        }
    }

    const getImages = () => {
        const categoryData = dataarray[`${category}`]
        const randomizedData = randomize(categoryData)
        setImageArray(randomizedData)
    }

    React.useEffect(() => {
        if (!forministate) {
            getImages()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [forministate])

    React.useEffect(() => {
        const emailField = document.getElementById("usermail")
        const emailErr = document.getElementById("emailErr")
        emailErr.textContent = ""
        emailField.removeAttribute("style")
    }, [email])

    const handleImagePick = (dataElement) => {

    }

    return (
        <div className='loginContainer'>
            <div className='logo'>
                <div className='centerCircle'></div>
                <div className='glassBox'></div>
            </div>
            <span id='appname'>Graphical Authentication</span>
            {
                forministate ? <div className='userInput'>
                    <div className='formSubContainer'>
                        <label htmlFor="usermail">Email</label>
                        <span className='errContainer' id='emailErr'></span>
                        <input className='formInput' id='usermail' name='mail' type="text" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='formSubContainer'>
                        <label htmlFor='catselect'>Genre</label>
                        <select className='formInput' value={category} onChange={(e) => setCategory(e.target.value)} name="category" id="catselect">
                            <option value="fruits">Fruits</option>
                            <option value="logos">Logos</option>
                            <option value="chocolates">Choclates</option>
                        </select>
                    </div>
                </div> : <div className='imgBox'>
                    {
                        // eslint-disable-next-line array-callback-return
                        imagearray.map((ele, ind) => {
                            return (
                                <div className='imagecatcontainer' key={ind}>
                                    {
                                        ele.map((elem, inde) => {
                                            if (category === "chocolates") {
                                                return <div className='imgMain' onClick={() => handleImagePick({ element: elem, index: inde })}>
                                                    <img src={require(`../assets/images/${category}/${elem.category}/${elem.name}.${elem.type}`).default} alt='' key={inde} />
                                                </div>
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            }
            <button onClick={changeFormState} className='submitbutton'>{forministate ? 'Next' : 'Submit'}</button>
        </div>
    )
}

export default Login