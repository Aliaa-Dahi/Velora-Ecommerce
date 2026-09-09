
const Signup = () => {
  return (
   

<form className="w-8/12 mx-auto">
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input type="text" id="name" name="name" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

   <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
    <input type="email" id="email" name="email" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input type="password" id="password" name="password" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

<div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input type="password" id="rePassword" name="rePassword" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

<div className="mb-5">
    <label htmlFor="phone" className="block mb-2.5 text-sm font-medium text-heading">Your name</label>
    <input type="tel" id="phone" name="phone" className=" bg-neutral-secondary-medium border border-default-medium text-sm rounded-base focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" />
  </div>

  <button type="submit" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
</form>



  )
}

export default Signup
