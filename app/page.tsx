import Feed from "@components/Feed"

const Home = (): React.ReactNode => {
  return (
    <>
      <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
          Discover & Share <span className="orange_gradient text-center">AI-Powered Prompts</span>
        </h1>
        <br className="max-md:hidden"/>
        <p className="desc text-center">
          PromptBlitz is your go-to app when it comes to prompt management. Manage and share your prompts to everyone!
        </p>

        <Feed />
      </section>
    </>
  )
}

export default Home
