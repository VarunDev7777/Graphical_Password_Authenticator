import axios from 'axios'
import React from 'react'
import '../assets/css/login.scss'
import { validateEmail } from '../utils/validation'
import Swal from 'sweetalert2'

const Login = () => {
    const [forministate, setformstate] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [category, setCategory] = React.useState("fruits")
    const [imagearray, setImageArray] = React.useState([])
    const [imageOrder, setImageOrder] = React.useState([])

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

    const getImages = async () => {
        let response = await axios.get("http://localhost:8000/api/images/" + category + "/20/");
        if (response.status == 200) {
            setImageArray(randomize(response.data.images))
        }
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


    const handlePick = (imgUrl, index) => {
        let PickedArray = [...imageOrder]
        let splitUrl = imgUrl.split("/")
        let category = splitUrl[splitUrl.length - 2]
        const image = document.getElementsByClassName("imgMain");
        if (!image[index].classList.contains("selected")) {
            image[index].insertAdjacentHTML('afterend', `<div class="selectedImg"><img src="${require("../assets/svgs/check.svg").default}"/></div>`);
            image[index].classList.add("selected");
            PickedArray.push({
                category: category,
            });
        } else {
            image[index].parentElement.removeChild(image[index].nextSibling);
            image[index].classList.remove("selected");
            PickedArray.splice(PickedArray.indexOf(index), 1);
        }
        setImageOrder(PickedArray);
    }

    React.useEffect(() => {
        console.log(imageOrder)
    }, [imageOrder])

    const handleSubmit = () => {
        let password = ""
        imageOrder.forEach((ele) => {
            password += ele.category
        })
        axios.post("http://localhost:8000/api/token/", {
            username: email,
            password: password
        }).then((res) => {
            Swal.fire({
                title: 'Authentication Successful',
                text: 'You will be redirected to the home page',
                icon: 'success'
            })
        }).catch(e => {
            try {
                if (e.response.data.detail == "No active account found with the given credentials") {
                    axios.post("http://localhost:8000/api/register/", {
                        username: email,
                        email: email,
                        password: password,
                        password2: password
                    }).then((res) => {
                        Swal.fire({
                            title: 'Registration Successful',
                            text: 'You will be redirected to the home page',
                            icon: 'success'
                        })
                    }).catch(e => {
                        console.log(e)
                        Swal.fire({
                            title: 'Registration Failed',
                            text: 'Please try again',
                            icon: 'error'
                        })
                    })
                }
            } catch (error) {
                Swal.fire({
                    title: 'Some Unexpected Error Occured!',
                    text: 'Please try again later',
                    icon: 'error',
                })
            }
        })
    }

    const changeFormState = () => {
        if (!forministate) {
            handleSubmit()
            return
        }
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
                                <div className='imagecatcontainer' key={ind} onClick={() => handlePick(ele, ind)}>
                                    <div className='imgMain' style={{ backgroundImage: `url(${ele})` }}></div>
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