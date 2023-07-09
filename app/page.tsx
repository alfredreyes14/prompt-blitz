import Feed from "@components/Feed"

const Home = () => {
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <br className="max-md:hidden"/>
        <p className="desc text-center">
          Promptopia clone is a promptopia project inspired from a youtube video aiming to showcase my skills using Next.js
        </p>

        <Feed />
      </section>
    </>
  )
}

export default Home
