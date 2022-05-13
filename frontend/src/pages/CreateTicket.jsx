import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
function CreateTicket() {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iMac");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="heading">
        <h1>Create new ticket</h1>
        <p>Please fill out form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer name</label>
          <input type="text" disabled value={name} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer email</label>
          <input type="email" disabled value={email} className="form-control" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.valueS)}
            >
              <option value="iphone">iphone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            ></textarea>
          </div>
          <div className="form-group btn-block">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateTicket;
