import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../config/api'
import NavbarAdmin from '../navbar/NavbarAdmin'
import './addProduct.css'
import swal from 'sweetalert'
import { useEffect } from 'react'


function AddProduct() {

    let history = useNavigate()
    const { id } = useParams()

  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  }); 


  const getProduct = async (id) =>{
    try {
      const response = await API.get(`/product/${id}`)
      // return console.log(response);
      setForm({
        ...form,
        name: response.data.data.name,
        price: response.data.data.price,
      })
      setProduct(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProduct(id)
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
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);
  
      history("/PageAdmin");
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
            <h2>Product</h2>
            <form className="input-main" onSubmit={handleSubmit} >
                <div className="left-input">
                    <input type="text" placeholder="Name Product" name="name"
                    name="name"
                    onChange={handleChange}
                    value={form.name}
                     />
                    <input type="text" placeholder="Price" name="price"
                    name="price"
                    onChange={handleChange}
                    value={form.price}
                     />
                        <div className="inputFile">
                        <input type="file" id="inputImage" 
                         name="image" onChange={handleChange}
                         />
                    </div>
                        <br/><br/>
                        <button className='buttonAdd' type='submit' onClick={submit} >Add Product</button>
                </div>
            <div className="right-product">
           <img src={preview} alt=""/>
        </div>
    </form>
</div>
    </div>
  )
}

export default AddProduct