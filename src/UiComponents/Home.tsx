import CreateNewUser from "../features/users/CreateNewUser";

function Home() {
  return (
    <div className="my-10 mt-8 text-center sm:my-16 ">
      <h1 className="mb-8  text-stone-700 text-xl font-semibold" >
        The best pizza.
        <br />
        <span className="text-yellow-500">
          
        Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateNewUser></CreateNewUser>

      
    </div>
  );
}

export default Home;
