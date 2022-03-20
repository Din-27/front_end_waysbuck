import React, { useEffect } from 'react'
import './addProduct.css'
import NavbarAdmin from '../navbar/NavbarAdmin'
import { useState } from 'react'
import { API } from '../config/api'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'






export default function AddToping() {
  let history = useNavigate()
    const { id } = useParams()

  const [preview, setPreview] = useState(null);
  const [toping, setToping] = useState({});
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  }); 


  const getToping = async (id) =>{
    try {
      const response = await API.get(`/toping/${id}`)
      console.log(response);
      setForm({
        ...form,
        name: response.data.data.name,
        price: response.data.data.price,
      })
      setToping(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getToping(id)
  }, [])

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
    try {
      e.preventDefault();
  
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
  
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("price", form.price);
  
      const response = await API.patch(
        "/toping/" + toping.id,
        formData,
        config
      );
      console.log(response.data);
  
      history('/PageAdmin/' + id);
    } catch (error) {
      console.log(error);
    }
  };

  const submit =()=>{
    swal("Good job!", "You clicked the button!", "success");
  }

  return (
    <div>
        <NavbarAdmin/>
    <div className="container-input-add">
        <h2>Toping</h2>
        <div className="input-main">
            <form className="left-input" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name Toping"
                    name="name"
                    onChange={handleChange}
                    value={form.name} />
                <input type="text" placeholder="Price"
                    name="price"
                    onChange={handleChange}
                    value={form.price} />
                    <div className="inputFile">
                        <input type="file" id="inputImage" 
                    name="image"
                    onChange={handleChange} />
                    </div>
                    <br/><br/>
                    <button className='buttonAdd' type='submit' onClick={submit}>Add Toping</button>
            </form>
            <div className="right-product">
              {preview && (
                <img src={preview} alt=""/>)}
            </div>
        </div>
    </div>
    </div>
  )
}
