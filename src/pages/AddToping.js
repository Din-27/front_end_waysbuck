import React from 'react'
import './addProduct.css'
import NavbarAdmin from '../navbar/NavbarAdmin'
import { useState } from 'react'
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'





export default function AddToping() {
  let history = useNavigate()
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  }); 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("price", form.price);
      formData.set("image", form.image[0]);

      console.log(form);
      const response = await API.post("/toping", formData, config);
      console.log(response);
      history("/page-admin");
  };

  const submit =()=>{
    swal("Good job!", "You clicked the button!", "success");
  }

  return (
    <div>
        <NavbarAdmin/>
    <div className="container-input-add">
    <h2 style={{marginLeft: "60px"}}>Toping</h2>
        <div className="input-main">
            <form className="left-input" method="post" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name Toping"
                    name="name"
                    onChange={handleChange} />
                <input type="text" placeholder="Price"
                    name="price"
                    onChange={handleChange} />
                    <div className="inputFile">
                        <input type="file" id="inputImage" 
                    name="image"
                    onChange={handleChange} />
                    </div>
                    <br/><br/>
                    <button className='buttonAdd' type='submit' onClick={submit}>Add Toping</button>
            </form>
            <div className="right-product">
                <img src={preview} alt="" style={{width: "300px"}}/>
            </div>
        </div>
    </div>
    </div>
  )
}
