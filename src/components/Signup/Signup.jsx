import {useFormik} from 'formik'
const Signup = () => {

  let initialValues = {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
  }

 let registerFormik =  useFormik({
    initialValues,
    onSubmit: function(user){
      console.log(user)
    }

  })

  return (
   

<form className="w-8/12 mx-auto" onSubmit={registerFormik.handleSubmit}>
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input onChange={registerFormik.handleChange} type="text" id="name" name="name" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

   <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input type="email" id="email" name="email" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your paswword</label>
    <input onChange={registerFormik.handleChange} type="password" id="password" name="password" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

<div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Password again</label>
    <input onChange={registerFormik.handleChange} type="password" id="rePassword" name="rePassword" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

<div className="mb-5">
    <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Your phone</label>
    <input onChange={registerFormik.handleChange} type="tel" id="phone" name="phone" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

  <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
</form>



  )
}

export default Signup
